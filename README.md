# Somativa 2 - React + Firebase

Disciplina: Tecnologias Para Desenvolvimento Web  
Aluno: Matheus Balão

## Enunciado

App React com 3 paginas (Cadastro, Login e Principal), React Router Dom com arquivo de rotas separado, Firebase Auth (email/senha) + Firestore com o UID, e deploy na nuvem.

Entrega em zip sem a pasta node_modules.

## Como eu fiz

Criei o projeto com create-react-app.  
Rotas em `src/rotas.js` e paginas em `src/paginas/`.  
Firebase na versao 8.9.1 igual da aula.  
No cadastro crio o usuario no Auth e gravo nome/sobrenome/nascimento no Firestore usando o uid.  
No login valido no Auth e mando pra Principal.  
Na Principal leio os dados do Firestore.

## Rodar

Copia o `.env.example` pra `.env` e preenche as keys do Firebase.

```
npm install
npm start
```

## Deploy

Netlify: https://somativa2-matheus-balao.netlify.app
