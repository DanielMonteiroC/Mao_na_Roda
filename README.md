#### Dependências

- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- axios
- cors
- react
- react-dom
- react-router-dom
- react-scripts
- web-vitals

#### Scripts

- `npm start`: Inicia a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm test`: Executa os testes.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js
- MongoDB

### Backend

1. Navegue até a pasta `backend`:
    ```sh
    cd backend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Crie um arquivo `.env` na pasta [backend](http://_vscodecontentref_/20) com as seguintes variáveis:
    ```
    MONGO_URI=<sua_uri_mongodb>
    JWT_SECRET=<seu_segredo_jwt>
    ```

4. Inicie o servidor:
    ```sh
    npm run dev
    ```

### Frontend

1. Navegue até a pasta [frontend](http://_vscodecontentref_/21):
    ```sh
    cd frontend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie a aplicação:
    ```sh
    npm start
    ```

## Funcionalidades

- Registro de usuários
- Login de usuários
- Busca de prestadores de serviços por profissão
- Edição de perfil de prestadores

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença ISC.