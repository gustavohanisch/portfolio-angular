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

## Entrar no MariaDB como administrador:
sudo mariadb

## Criar BD:
sudo mariadb < sql/setup.sql

## Executar API:

/usr/bin/php -S 0.0.0.0:8000 (raiz do projeto)

## 🎯 Autoavaliação
Conceito pretendido: [ A ]

Justificativa:
- Consumo da API (Projetos): projeto.service.ts (GET) + projetos.ts (subscribe)
- Catalogo + botao GitHub: tecnologia.service.ts + projetos.html (mat-card-actions)
- Boas praticas: a URL/HTTP fica no service; o componente so exibe
- A tela Catálogo também consumindo a API (tecnologias) -> catalogo.ts - linhas 17 a 25 e catalogo.html = linhas 9 a 17.
- O botão "Ver no GitHub" no card de projeto (property binding [href]) -> projetos.html - linhas 33 à 43.
- Tratamento de erro nas duas telas e a URL centralizada no service -> projetos.html, projetos.ts, catalogo.html e catalogo.ts.
- Usar o async pipe (| async) no lugar do subscribe em uma das telas -> projetos.ts e projetos.html
- Autoavaliacao: esta secao do README

## 🎯 Autoavaliação

**Conceito pretendido: ⭐⭐⭐ Nível A — Excelente (avançado)**

Escolhi o **Nível A — Excelente**, pois implementei os requisitos dos níveis anteriores e também desenvolvi uma melhoria por iniciativa própria: o tratamento do **estado vazio ("nenhum item ainda") nas duas telas**, evitando que a interface fique sem informação quando a API não retornar nenhum item.

### ⭐ Nível C — Básico

* A aplicação possui telas para exibição de **projetos** e **tecnologias**, utilizando componentes Angular.
* Os dados são obtidos por meio de services, utilizando `HttpClient` para realizar as requisições à API.
* O `ProjetoService`, no arquivo `projeto.service.ts`, possui o método `listar()`, responsável por buscar os projetos na API.
* O `TecnologiaService`, no arquivo `tecnologia.service.ts`, possui o método `listar()`, responsável por buscar as tecnologias na API.

### ⭐⭐ Nível B — Bom

Além dos requisitos do Nível C, implementei:

**1. Catálogo consumindo a API**

A tela Catálogo utiliza o `TecnologiaService`. No arquivo `catalogo.ts`, o service é injetado e o método `listar()` é chamado para obter as tecnologias:

```ts
private service = inject(TecnologiaService);

this.service.listar().subscribe({
  next: (lista) => {
    this.tecnologias = lista;
    this.carregando = false;
  }
});
```

O arquivo `tecnologia.service.ts` realiza a requisição HTTP para a API de tecnologias:

```ts
return this.http.get<Tecnologia[]>(this.url);
```

**2. Botão "Ver no GitHub"**

No arquivo `projetos.html`, cada projeto possui um botão "Ver no GitHub" utilizando property binding no atributo `href`:

```html
<a mat-button [href]="p.link_github" target="_blank" rel="noopener">
  Ver no GitHub
</a>
```

O `[href]="p.link_github"` utiliza o endereço do GitHub recebido junto aos dados do projeto.

**3. Tratamento de erro**

O `ProjetoService`, em `projeto.service.ts`, possui tratamento de erro com `catchError()`:

```ts
catchError(() => {
  console.error('Falha ao carregar os projetos.');
  return of([]);
})
```

Na tela Catálogo, o arquivo `catalogo.ts` também possui tratamento de erro no `subscribe()`:

```ts
error: () => {
  this.erro = 'Falha ao carregar o catalogo.';
  this.carregando = false;
}
```

A mensagem de erro é apresentada no `catalogo.html` por meio de:

```html
@if (erro) {
  <p>{{ erro }}</p>
}
```

**4. URL centralizada nos services**

As URLs das APIs ficam centralizadas nos respectivos services, em vez de serem colocadas diretamente nos componentes.

No `projeto.service.ts`:

```ts
private url = '.../api/projetos.php';
```

No `tecnologia.service.ts`:

```ts
private url = '.../api/tecnologias.php';
```

As requisições utilizam essas variáveis por meio de `this.url`.

### ⭐⭐⭐ Nível A — Excelente

Como iniciativa própria, escolhi implementar o tratamento do **estado vazio nas duas telas**.

Na tela de Projetos, o arquivo `projetos.html` verifica se o carregamento terminou e se não existem projetos:

```html
@if (!carregando && projetos.length === 0) {
  <p>Nenhum projeto publicado ainda.</p>
}
```

Na tela Catálogo, o arquivo `catalogo.html` possui uma verificação equivalente para as tecnologias:

```html
@if (!carregando && tecnologias.length === 0 && !erro) {
  <p>Nenhuma tecnologia cadastrada ainda.</p>
}
```

Dessa forma, a aplicação diferencia três situações importantes: **carregamento, erro e ausência de dados**. Isso melhora a experiência do usuário porque a tela não fica simplesmente vazia quando a API não retorna nenhum item.

### 🎯 Conclusão

**Conceito pretendido: ⭐⭐⭐ Nível A — Excelente.**

Considero que meu projeto atende aos requisitos do Nível A porque, além de consumir as APIs por meio de services, possuir tratamento de erros, property binding para os links do GitHub e URLs centralizadas, também implementei por iniciativa própria o tratamento do **estado vazio nas telas de Projetos e Catálogo**.
