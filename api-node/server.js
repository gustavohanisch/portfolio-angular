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

app.get('/api/projetos', async (req, res) => {
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id";
    const [projetos] = await pool.query(sql);
    res.json(projetos);
});


app.listen(PORTA, () => {
console.log('API no ar em http://localhost:' + PORTA);
    });