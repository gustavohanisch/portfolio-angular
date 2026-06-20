<?php
// api/projetos.php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

// Se recebeu um id, retorna apenas um projeto
if (isset($_GET['id'])) {

    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE id = :id
            AND status = 'publicado'";

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', (int)$_GET['id'], PDO::PARAM_INT);
    $stmt->execute();

    $projeto = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($projeto) {
        echo json_encode($projeto);
    } else {
        http_response_code(404);
        echo json_encode([
            'erro' => 'Projeto não encontrado'
        ]);
    }

} else {

    // Lista todos os projetos publicados
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE status = 'publicado'
            ORDER BY ano DESC, id";

    $projetos = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($projetos);
}