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


## Por que o mesmo endereço api/projetos.php consegue fazer quatro coisas diferentes?

O mesmo endereço da API consegue fazer operações diferentes porque cada requisição informa qual método HTTP deve ser executado.
Assim, usando GET, POST, PUT ou DELETE, o servidor sabe se deve consultar, criar, alterar ou excluir um projeto.

## 🎯 Autoavaliação — Nível A (Excelente)

**Conceito pretendido: Nível A — Excelente**

Escolhi o Nível A porque implementei, além das validações e dos estados de envio, recursos para melhorar o tratamento de erros e a experiência do usuário.

### Validação do formulário

No arquivo `src/app/contato/contato.ts`, utilizei Reactive Forms com validações para os três campos do formulário.

* O campo **nome** é obrigatório e precisa ter pelo menos 3 caracteres.
* O campo **e-mail** é obrigatório e precisa possuir um formato válido.
* O campo **mensagem** é obrigatório e deve possuir pelo menos 10 caracteres.

No arquivo `src/app/contato/contato.html`, as mensagens de validação são mostradas somente quando o campo está inválido e já foi acessado pelo usuário.

### Estados durante o envio

O arquivo `src/app/contato/contato.ts` controla o estado da requisição por meio da variável `enviando`.

Enquanto a mensagem está sendo enviada, o botão fica bloqueado e seu texto muda para **"Enviando..."**. Quando a operação termina, o botão volta ao estado normal.

Quando o envio é realizado com sucesso, uma mensagem é apresentada ao usuário e o formulário é limpo utilizando `form.reset()`.

### Tratamento dos erros da API

Também implementei o tratamento das respostas de erro do back-end.

O callback `error` do `subscribe`, localizado em `src/app/contato/contato.ts`, recebe um `HttpErrorResponse` e verifica se a API retornou uma lista de erros em `err.error?.erros`.

Dessa maneira, as informações fornecidas pelo back-end são aproveitadas para informar o usuário sobre o problema. Caso a API não forneça esses detalhes, é apresentada uma mensagem alternativa informando que não foi possível realizar o envio.

### Acessibilidade e experiência do usuário

No arquivo `src/app/contato/contato.html`, os campos possuem `<label>` associados aos respectivos elementos por meio de `for` e `id`.

Também foram adicionadas mensagens de erro em texto, evitando que a identificação de um problema dependa somente da cor.

Quando o formulário é enviado com dados inválidos, os campos são marcados como tocados e o foco é direcionado para o primeiro campo que precisa ser corrigido, facilitando a navegação pelo formulário.

### Organização dos arquivos

A lógica do formulário e da comunicação com a API permanece no arquivo TypeScript, enquanto a estrutura visual fica no HTML e a aparência no arquivo CSS. Essa separação facilita a manutenção e deixa cada arquivo responsável por uma parte específica da aplicação.

### Conclusão

Considero que o projeto atende ao **Nível A — Excelente**, pois o formulário possui validações, controle completo dos estados de envio, tratamento das mensagens retornadas pelo back-end e melhorias de acessibilidade e usabilidade. Além disso, as principais decisões da implementação estão documentadas nesta autoavaliação.


## 🧪 Testes de erros da API

Os testes foram realizados utilizando curl diretamente na API.

400 — POST sem nome

400 Bad Request
{"erro":"Informe pelo menos o nome do projeto"}

400 — PUT sem ID

400 Bad Request
{"erro":"PUT exige o id na URL: ?id=NN"}

404 — DELETE com ID inexistente

404 Not Found
{"erro":"Projeto nao encontrado"}

405 — método não permitido

405 Method Not Allowed
{"erro":"Metodo nao permitido"}

Todos os testes retornaram os códigos HTTP e as mensagens JSON esperadas.

## 💭 Antecipação — dois cliques rápidos em Adicionar projeto

Se o botão de adicionar fosse clicado duas vezes rapidamente, poderiam ser enviadas duas requisições POST e, consequentemente, dois registros poderiam ser criados no banco. Para evitar isso pela interface, a variável salvando fica true durante a requisição e o botão é desabilitado enquanto o salvamento está em andamento.

## 🔄 Comparação — atualizar a lista depois das operações

Depois de salvar um projeto, a tela chama novamente o método carregar(), fazendo uma nova requisição à API e atualizando a lista com os dados atuais do banco. Já na exclusão, depois que a API confirma a operação, o projeto é removido diretamente do array local usando filter(), evitando uma nova requisição e a necessidade de recarregar a página.

## 🎯 Autoavaliação — Nível A

### ⭐⭐⭐ Nível A — Plena: nada de tela branca

**Conceito pretendido: Nível A — Plena**

Além dos requisitos atendidos no Nível B, implementei melhorias para deixar a aplicação mais clara, resistente a falhas e adequada para uso por outras pessoas.

### 1. Erros tratados e visíveis na tela

As operações da aplicação possuem tratamento de erros e apresentam uma mensagem diretamente na interface, evitando que uma falha da API resulte apenas em uma tela vazia ou em uma mensagem disponível somente no console.

Na tela de gestão (`gestao.ts`), o carregamento dos projetos possui tratamento de erro:

```ts
error: () => {
  this.erro = 'Não foi possível carregar os projetos.';
  this.carregando = false;
  this.cdr.detectChanges();
}
```

A mensagem é exibida no arquivo `gestao.html`:

```html
@if (erro) {
  <p class="erro-campo">⚠️ {{ erro }}</p>
}
```

A criação e a edição também utilizam tratamento de erro na chamada HTTP:

```ts
error: () => {
  this.salvando = false;
  this.erro = 'Não foi possível salvar o projeto.';
  this.cdr.detectChanges();
}
```

Esse mesmo formulário utiliza `POST` para criar e `PUT` para editar, conforme o valor de `editandoId`.

A exclusão também possui tratamento de erro:

```ts
error: () => {
  this.erro = 'Não foi possível excluir. Tente novamente.';
  this.cdr.detectChanges();
}
```

Assim, as quatro operações principais — **carregar, criar, editar e excluir** — possuem feedback visual quando a API apresenta uma falha.

---

### 2. Polimento: estado próprio para lista vazia

Como polimento da interface, implementei um estado específico para quando não existem projetos publicados.

No arquivo `projetos.html`:

```html
@if (!carregando && projetos.length === 0) {
  <p>Nenhum projeto publicado ainda.</p>
}
```

Também foi criado um estado específico na área de gestão:

```html
@if (!carregando && projetos.length === 0 && !erro) {
  <p>Nenhum projeto cadastrado ainda.</p>
}
```

Dessa forma, quando a lista está vazia, o usuário recebe uma explicação clara em vez de encontrar apenas um espaço em branco.

A implementação utiliza o bloco de controle de fluxo `@if` do Angular. A documentação oficial explica que o `@if` permite exibir condicionalmente o conteúdo de um template conforme o resultado de uma expressão.

**Fonte consultada:** [Angular — Control flow](https://angular.dev/guide/templates/control-flow?utm_source=chatgpt.com)

---

### 3. Pré-voo CORS conferido

O endpoint `api/projetos.php` possui tratamento para requisições `OPTIONS`:

```php
header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
```

O pré-voo foi testado diretamente no endpoint utilizando:

```bash
curl -i -X OPTIONS https://legendary-waffle-x564v4grx9vwhp47x-8000.app.github.dev/api/projetos.php
```

O servidor respondeu:

```text
HTTP/2 204
```

e apresentou o cabeçalho:

```text
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
```

Também foram retornados:

```text
access-control-allow-origin: *
access-control-allow-headers: Content-Type
```

O navegador precisa realizar esse pré-voo antes de determinadas requisições, como `DELETE`, para verificar se o servidor permite a origem, o método e os cabeçalhos utilizados. Depois de receber uma resposta autorizando a operação, o navegador pode enviar a requisição principal.

---

### 4. Comparação das duas estratégias de atualização dos dados

Utilizei duas estratégias diferentes na aplicação.

Na edição, o projeto já está presente na lista carregada pela API. Por isso, ao clicar em **Editar**, não é necessário realizar uma nova requisição para buscar o mesmo projeto:

```ts
editar(p: Projeto) {
  this.editandoId = p.id ?? null;
  this.form.patchValue(p);
}
```

Nesse caso, os dados já disponíveis no navegador são utilizados diretamente no formulário.

Na exclusão, depois que o `DELETE` é concluído com sucesso, o projeto é removido diretamente do array local:

```ts
next: () => {
  this.projetos = this.projetos.filter(x => x.id !== p.id);
}
```

Essa estratégia evita uma nova chamada `GET` depois do `DELETE`.

Portanto, a atualização local custa **uma viagem à rede a menos** do que realizar um `DELETE` seguido de um novo `GET` para recarregar toda a lista.

A vantagem é uma interface mais rápida e com menos requisições. Porém, existe um possível problema: os dados exibidos podem ficar desatualizados caso outro usuário, outra aba do sistema ou uma alteração direta no banco modifique os dados depois que a lista foi carregada.

Nesse caso, a atualização local é mais eficiente, mas uma nova consulta à API seria necessária para sincronizar novamente a tela com o banco.

---

### 5. 🗣️ Objeção: `(click)` ou `<a href>`?

Um colega afirmou:

> "Botão com `(click)` é complicação. Um link `<a href=".../projetos.php?id=5">Excluir</a>` faz a mesma coisa e é mais simples."

Minha resposta é que `<a href>` realiza uma navegação utilizando **GET**, enquanto a exclusão da aplicação deve utilizar o verbo HTTP **DELETE**. O `(click)` chama o método `excluir()` do Angular, que envia a requisição DELETE para a API.

A evidência é o pré-voo do endpoint, que confirmou os métodos permitidos:

```bash
curl -i -X OPTIONS https://legendary-waffle-x564v4grx9vwhp47x-8000.app.github.dev/api/projetos.php
```

Resultado:

```text
HTTP/2 204
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
```

---

### 6. Conclusão da autoavaliação

Considero que o projeto atende ao **Nível A — Plena**, pois, além dos requisitos dos níveis anteriores, a aplicação possui tratamento visual de erros nas operações, estados próprios para listas vazias, pré-voo CORS verificado por `curl`, comparação das estratégias de atualização dos dados e uma justificativa técnica para o uso de `(click)` com `DELETE` em vez de utilizar um link `<a href>` para realizar uma operação de exclusão.


## 🔁 Puxando o que já era seu

* **Método:** `POST`
* **Status:** `201 Created`
* **Content-Type:** `application/json; charset=utf-8`
* **Explicação:** A criação retorna `201` porque um novo recurso foi criado com sucesso, enquanto a exclusão retorna `204` porque a operação foi concluída e não há conteúdo para retornar na resposta.


