# Carteira Digital

Simulação de uma carteira digital, utilizando React, NodeJS, Express e Postgres

## Iniciando

### Pré-requisitos
- NodeJs
- PostgreSql
- gitclone

```bash
git clone https://github.com/Thalesmau/wallet-digital.git
cd src
```

### Iniciando o backend
```bash
cd backend
npm install
nodemon server
```

### Iniciando Api no frontend, abra um novo terminal
```bash
cd frontend
npm run backend
```

### Iniciando frontend, abra um novo terminal
```bash
npm install
npm start
```

## Funções da Carteira
- Login/Cadastro
- Transações de Saque e Depósito 


##  Tecnologias Utilizadas

###  Backend

- bcryptjs
- cors
- Express
- jsonwebtoken
- PostgreSQL

###  Frontend

- ReactJS
- Bootstrap

## Fundamental

- [x]	Frontend utilizando VueJs ou ReactJs (à escolha) para gerenciar os componentes visuais.
-	[x] Alguma biblioteca rest (ex.: Axios) para realizar chamadas ao backend.
-	[x] Backend construído em NodeJs, utilizando ExpressJs separado em camadas que representem o controller da API, uma camada de negócio e uma camada de persistência
-	[x] Gravação dos dados em um PostgreSQL.
-	[x] A API deve seguir um padrão Rest
- [ ] Documente a API, indicando que endpoints e estruturas foram criadas.
-	[x] Instruções completas de execução, do download do repositório até o último passo necessário para conseguir acessar e usar a aplicação. Inclua qualquer questão de ambiente relevante e simplifique/automatize ao máximo esses passos.
-	[ ] Queries necessárias para criar tabelas, popular registros ou qualquer outra atividade de inicialização do banco devem estar documentadas no repositório e devem fazer parte das instruções de execução.
-	[x] O apontamento do banco postgres deve ser feito por meio de um arquivo de configuração, que permita indicar host, porta, schema, usuário e senha do banco.

#### Extra:
-	[ ] A subida da aplicação ocorrer utilizando docker.
-	[ ] A inicialização das tabelas do banco ser automatizada e não depender de uma pessoa acessar e executar CREATE TABLE e outros comandos similares para preparar o ambiente.
-	[x] A senha estar encriptada/com hash no banco usando SHA-256 ou algoritmo similar ou superior que impeça a leitura dela.
#### Super Extra:
-	[ ] Se além do repositório, o ambiente for entregue em algum lugar online já executando para avaliação.
-	[ ] Nesse caso devem ser fornecidas instruções e credenciais para acesso ao banco para examinação
-	[ ] Não é necessário utilizar um DNS nesse caso. Basta apresentar um IP:PORTA que permita acesso.

**Sobre o desenvolvimento deste projeto a principal dificuldade foi relacionado ao banco de dados, os dados da tabela USUÁRIO estão sendo salvos corretamentes, mas acabei não conseguindo registra dados nas tabelas restantes, com isso a página de transação da carteira digital não está funcional. Através de uma view eu relacionei as tabelas USUÁRIO e SALDO para associar cada usuário ao seu respectivo saldo, mas não obtive sucesso para definir um valor inicial e atualizar o saldo em cada transação.**


