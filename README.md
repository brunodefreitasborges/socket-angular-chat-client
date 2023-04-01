# Dev Chat

Este é um projeto de um chat em tempo real desenvolvido com Angular 15, Angular Material, Socket.io e TailwindCSS. Para garantir a segurança, o usuário só poderá entrar no chat após fazer login com seu email e senha no backend em NodeJS.

## Requisitos
- Node.js (versão 10 ou superior)
- Angular CLI (versão 15 ou superior)
- Backend em NodeJS com autenticação

## Instalação
Clone este repositório para sua máquina:
```
git clone https://github.com/<seu-nome-de-usuario>/socket-angular-chat-client.git
```

## Instale as dependências do projeto:
```
cd socket-angular-chat-client
npm install
```

## Inicie o servidor:
```
ng serve
```

- Abra o navegador e acesse http://localhost:4200 para abrir o chat.

## Uso
Para entrar no chat, o usuário deverá fazer login com seu email e senha no backend em NodeJS. O formulário de login é acessível pela página inicial do chat.

Após fazer login, o usuário será redirecionado para a página de chat, onde poderá enviar e receber mensagens em tempo real com todos os usuários conectados.

Para enviar uma mensagem, basta digitar o texto no campo de entrada e pressionar "Enter" ou clicar no botão "Enviar".
