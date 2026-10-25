// api-node/server.js - a API do Portfolio em Node (Aula 21)
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const app = express();
const PORTA = 3000;
// A chave que assina os tokens. Fica aqui so ate a aula 29, qunaod vai para o .env.
const SEGREDO = 'judas-mata-pelas-costas-ingratidao-e-foda';
// Deixa outra origem (o Angular na porta 4200) chamar esta API.
app.use(cors()); 
// Le o corpo JSON de POST e PUT e o entrega em req.body. Sem isto, req.body e undefined.
app.use(express.json());

// Middleware: confere o token antes de a rota rodar. Entra só nas rotas que o pedem.
function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization ?? '';
  const token = cabecalho.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ erro: 'Token ausente' });
  }

  try {
    req.usuario = jwt.verify(token, SEGREDO);
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token invalido ou expirado' });
  }
}

app.get('/', (req, res) => {
  res.send('API do Portfolio em Node: no ar');
});

// POST /api/login: confere email e senha e devolve o token. A única rota que ve a senha.
app.post('/api/login', async (req, res) => {
  try {
    const dados = req.body;

    if (!dados || !dados.email || !dados.senha) {
      return res.status(400).json({ erro: 'Informe email e senha' });
    }

    const [linhas] = await pool.execute('SELECT id, email, senha_hash FROM usuarios WHERE email = ?', [dados.email]);
    const usuario = linhas[0];

    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha invalidos' });
    }

    const confere = await bcrypt.compare(dados.senha, usuario.senha_hash);

    if (!confere) {
      return res.status(401).json({ erro: 'Email ou senha invalidos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SEGREDO, { expiresIn: '1h' });
    res.json({ token });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});


 // Lista pública: somente projetos publicados.
app.get('/api/projetos', async (req, res) => {
  try {
    const sql = `
      SELECT id, nome, descricao, tecnologias, link_github, ano, status
      FROM projetos
      WHERE status = 'publicado'
      ORDER BY id DESC
    `;

    const [projetos] = await pool.execute(sql);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});

// Lista protegida: inclui publicados e rascunhos.
app.get('/api/projetos/todos', autenticar, async (req, res) => {
  try {
    const sql = `
      SELECT id, nome, descricao, tecnologias, link_github, ano, status
      FROM projetos
      ORDER BY id DESC
    `;

    const [projetos] = await pool.execute(sql);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});


app.get('/api/projetos/:id', async (req, res) => {
  try {
    const sql = `
      SELECT id, nome, descricao, tecnologias, link_github, ano, status
      FROM projetos
      WHERE id = ? AND status = 'publicado'
    `;

    const [projetos] = await pool.execute(sql, [req.params.id]);

    if (projetos.length === 0) {
      return res.status(404).json({ erro: 'Projeto não encontrado' });
    }

    res.json(projetos[0]);
  } catch (erro) {
    res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});


// POST cria: os dados vêm no corpo, em JSON, e o id nasce no banco.
app.post('/api/projetos', autenticar, async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);

        if (!dados || !dados.nome) {
            return res.status(400).json({
                erro: 'Informe pelo menos o nome do projeto'
            });
        }

        const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?, ?, ?, ?, ?, ?)';

const [resultado] = await pool.execute(sql, [
            dados.nome,
            dados.descricao ?? '',
            dados.tecnologias ?? '',
            dados.link_github ?? '',
            dados.ano ?? new Date().getFullYear(),
            'publicado'
        ]);

        res.status(201).json({ id: resultado.insertId });
    } catch (erro) {
        res.status(500).json({
            erro: 'Falha no servidor: ' + erro.message
        });
    }
});

// PUT altera: o id vem no caminho (qual projeto) e os dados no corpo (o que gravar).
app.put('/api/projetos/:id', autenticar, async (req, res) => {
    try {
        const dados = req.body;

        if (!dados || !dados.nome) {
            return res.status(400).json({
                erro: 'Informe pelo menos o nome do projeto'
            });
        }

        const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id = ?';

        const [resultado] = await pool.execute(sql, [
            dados.nome,
            dados.descricao ?? '',
            dados.tecnologias ?? '',
            dados.link_github ?? '',
            dados.ano ?? new Date().getFullYear(),
            req.params.id
        ]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Projeto não encontrado'
            });
        }

        res.json({ mensagem: 'Projeto atualizado' });
    } catch (erro) {
        res.status(500).json({
            erro: 'Falha no servidor: ' + erro.message
        });
    }
});

// DELETE apaga: só precisa do id. Não há corpo no pedido, e a resposta também não tem.
app.delete('/api/projetos/:id', autenticar, async (req, res) => {
    try {
        const [resultado] = await pool.execute(
            'DELETE FROM projetos WHERE id = ?',
            [req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Projeto não encontrado'
            });
        }

        res.status(204).end();
    } catch (erro) {
        res.status(500).json({
            erro: 'Falha no servidor: ' + erro.message
        });
    }
});

// Um projeto pelo id.  O ? e o mesmo do prepare do PHP: o valor nunca entra na string.
// O catalogo, com o SELECT do api/tecnologias.php.
app.get('/api/tecnologias', async (req, res) => {
  try {
    const sql = "SELECT id, nome, categoria, descricao, ano_criacao FROM tecnologias WHERE status = 'ativo' ORDER BY categoria, nome";
    const [tecnologias] = await pool.query(sql);
    res.json(tecnologias);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});


/* POST /api/tecnologias
   Cria uma tecnologia. Exige token JWT. */
app.post('/api/tecnologias', autenticar, async (req, res) => {
  try {
    const dados = req.body;

    if (!dados || !dados.nome || !dados.categoria) {
      return res.status(400).json({
        erro: 'Informe o nome e a categoria da tecnologia'
      });
    }

    const sql = `
      INSERT INTO tecnologias
        (nome, categoria, descricao, ano_criacao, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [resultado] = await pool.execute(sql, [
      dados.nome,
      dados.categoria,
      dados.descricao ?? '',
      dados.ano_criacao ?? null,
      dados.status === 'inativo' ? 'inativo' : 'ativo'
    ]);

    return res.status(201).json({
      id: resultado.insertId,
      mensagem: 'Tecnologia cadastrada'
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});


/* PUT /api/tecnologias/:id
   Atualiza uma tecnologia. Exige token JWT. */
app.put('/api/tecnologias/:id', autenticar, async (req, res) => {
  try {
    const dados = req.body;

    if (!dados || !dados.nome || !dados.categoria) {
      return res.status(400).json({
        erro: 'Informe o nome e a categoria da tecnologia'
      });
    }

    const sql = `
      UPDATE tecnologias
      SET nome = ?, categoria = ?, descricao = ?,
          ano_criacao = ?, status = ?
      WHERE id = ?
    `;

    const [resultado] = await pool.execute(sql, [
      dados.nome,
      dados.categoria,
      dados.descricao ?? '',
      dados.ano_criacao ?? null,
      dados.status === 'inativo' ? 'inativo' : 'ativo',
      req.params.id
    ]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Tecnologia não encontrada'
      });
    }

    return res.status(200).json({
      mensagem: 'Tecnologia atualizada'
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});


/* DELETE /api/tecnologias/:id
   Exclui uma tecnologia. Exige token JWT. */
app.delete('/api/tecnologias/:id', autenticar, async (req, res) => {
  try {
    const [resultado] = await pool.execute(
      'DELETE FROM tecnologias WHERE id = ?',
      [req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Tecnologia não encontrada'
      });
    }

    return res.status(204).end();
  } catch (erro) {
    return res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});



app.listen(PORTA, () => {
console.log('API no ar em http://localhost:' + PORTA);
    });
