import { useEffect, useState } from 'react';
import API from './api.js';

// Catalogo: busca e exibe as tecnologias cadastradas na API.
function Catalogo() {
    const [tecnologias, setTecnologias] = useState([]);

    // Busca as tecnologias e guarda a resposta no estado.
    async function buscarTecnologias() {
        const resposta = await fetch(API + '/api/tecnologias');
        const dados = await resposta.json();
        setTecnologias(dados);
    }

    // Executa a busca apenas uma vez, quando o componente é carregado.
    useEffect(() => {
        buscarTecnologias();
    }, []);

    return (
        <section className="catalogo">
            <h2>Catálogo de tecnologias</h2>

            <ul>
                {tecnologias.map((t) => (
                    <li key={t.id}>
                        {t.nome} · {t.categoria}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Catalogo;
