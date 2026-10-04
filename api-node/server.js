// api-node/server.js - a API do Portfolio em Node (Aula 21)
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORTA = 3000;
// Deixa outra origem (o Angular na porta 4200) chamar esta API.
app.use(cors()); 


app.get('/', (req, res) => {
  res.send('API do Portfolio em Node: no ar');
});

app.get('/api/projetos/:id', async (req, res) => {
  try {
    const sql = "SELECT id, nome, categoria, descricao, ano_criacao FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id";
    const [projetos] = await pool.query(sql);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
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


app.listen(PORTA, () => {
console.log('API no ar em http://localhost:' + PORTA);
    });