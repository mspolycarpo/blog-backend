# blog-backend

Backend de teste para criação de um blog

## Rotas

No repositório existem exemplos de requisições utilizando o postman

### Usuários

POST /user cria um novo usuário na base

GET /user busca por todos os usuários

GET /user/:id busca o usuário com o 'id' solicitado

DELETE /user/me deleta usuário atual

### Login

POST /user realiza a autenticação baseado no usuário previamente cadastrado

### Posts

POST /post cria um novo post na base

GET /post busca por todos os posts

GET /post/:id busca o post com o 'id' solicitado

PUT /post/:id atualiza post específico

## Instalação

npm i

npm i -g typescript // como sugestão

npm i pm2 // como sugestão

## Inicialização

Se estiver utilizando o comando node

node dist/index.js

Se estiver utilizando pm2

pm2 start dist/index.js

## Testes

npm test

## Instalação MongoDB

Essa aplicação utiliza o MongoDB como banco de dados.

Portanto para validação, será necessário a instalação do MongoDB segundo a documentaçõ oficial

https://docs.mongodb.com/manual/installation/
