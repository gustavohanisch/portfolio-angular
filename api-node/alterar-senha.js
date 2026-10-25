
const bcrypt = require('bcryptjs');
const pool = require('./db');

async function alterarSenha() {
  const email = process.argv[2];
  const novaSenha = process.argv[3];

  if (!email || !novaSenha) {
    console.log('Uso: node alterar-senha.js email novaSenha');
    await pool.end();
    return;
  }

  try {
    const hash = await bcrypt.hash(novaSenha, 10);

    const [resultado] = await pool.execute(
      'UPDATE usuarios SET senha_hash = ? WHERE email = ?',
      [hash, email]
    );

    if (resultado.affectedRows === 0) {
      console.log('Usuário não encontrado.');
    } else {
      console.log('Senha alterada com sucesso!');
    }
  } catch (erro) {
    console.error('Erro ao alterar senha:', erro.message);
  } finally {
    await pool.end();
  }
}

alterarSenha();
