Portfolio Angular

Projeto de portfólio pessoal desenvolvido com Angular, apresentando informações profissionais, habilidades, projetos e contato em uma interface moderna e responsiva.

📌 Objetivo

Este projeto foi criado com o objetivo de praticar o desenvolvimento frontend utilizando Angular, além de servir como portfólio para apresentação de projetos e competências em desenvolvimento web.

🚀 Tecnologias Utilizadas
Angular
TypeScript
HTML5
CSS3
Node.js
npm
📂 Estrutura do Projeto
portfolio-angular/
├──.angular/
├──.vscode/
├──node_modules/
├── src/
├── public/
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── README.md
⚙️ Ambiente Reproduzível

Para garantir que o projeto funcione corretamente em qualquer máquina, utilize as seguintes versões:

Versões Utilizadas
Node.js: v22.18.0
npm: 10.9.3
Angular CLI: 20.2.1
Angular: 20.2.0

Recomenda-se utilizar exatamente essas versões para evitar incompatibilidades.

▶️ Como Executar o Projeto
1. Clone o repositório
git clone https://github.com/gustavohanisch/portfolio-angular.git
2. Acesse a pasta do projeto
cd portfolio-angular/portfolio-angular
3. Instale as dependências
npm install
4. Execute o servidor de desenvolvimento
ng serve

Depois disso, acesse:

http://localhost:4200/
🛠️ Comandos Úteis
Gerar build de produção
ng build
Executar testes
ng test
📱 Responsividade

O projeto foi desenvolvido com foco em responsividade, permitindo boa experiência em:

Desktop
Tablets
Smartphones

👨‍💻 Autor
Gustavo Hanisch

GitHub:
https://github.com/gustavohanisch

Atividade Aula 16:
Nesta etapa do projeto foi implementado o sistema de navegação utilizando o Angular Router, transformando a aplicação em uma Single Page Application (SPA). Foram criados os componentes Início, Sobre, Projetos e Contato, cada um representando uma seção do portfólio. Também foi adicionada uma barra de navegação responsiva com Angular Material, permitindo a troca entre as páginas sem recarregar o navegador. Além disso, a página inicial recebeu um cartão de apresentação utilizando o componente MatCard, proporcionando uma interface mais moderna e organizada. Essa atividade consolidou conceitos fundamentais do Angular, como componentes standalone, roteamento, navegação com routerLink e integração com a biblioteca Angular Material.

Aula 17: Como rodar a API:

## Instalar o MariaDB, PHP CLI e driver PDO MySQL:

sudo apt-get update sudo apt-get install -y mariadb-server php-cli php-mysql

## Iniciar banco de dados:

sudo service mariadb start

## Criar BD:
sudo mariadb < sql/setup.sql

## Executar API:

/usr/bin/php -S 0.0.0.0:8000 (raiz do projeto)
