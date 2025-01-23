# **Sistema de Autenticação**

Este projeto é um sistema de autenticação completo, com funcionalidades de **cadastro**, **login** e **proteção de rotas**. Ele foi desenvolvido para demonstrar boas práticas de desenvolvimento fullstack, utilizando tecnologias modernas tanto no frontend quanto no backend.

---

## **Funcionalidades**

### **Frontend**
- **Cadastro de Usuário**:
  - Validação de campos (nome, e-mail, senha, data de nascimento).
  - Integração com API para registro.
  - Redirecionamento automático para a página de login após o cadastro.

- **Login de Usuário**:
  - Autenticação com e-mail e senha.
  - Armazenamento do token JWT em cookies.
  - Redirecionamento para a página Home após o login.

- **Página Home**:
  - Mensagem de boas-vindas personalizada.
  - Botão de logout para encerrar a sessão.

- **Proteção de Rotas**:
  - Rotas protegidas que só podem ser acessadas por usuários autenticados.

### **Backend**
- **Cadastro**:
  - Validação de dados.
  - Criptografia de senha.
  - Armazenamento de usuários no banco de dados.

- **Login**:
  - Geração de token JWT.
  - Verificação de credenciais.

- **Rota Protegida**:
  - Endpoint `/auth/me` para recuperar dados do usuário autenticado.

---

## **Tecnologias Utilizadas**

### **Frontend**
- **React**: Biblioteca para construção da interface do usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento moderno.
- **TypeScript**: Adiciona tipagem estática ao JavaScript.
- **Styled Components**: Estilização de componentes.
- **Axios**: Cliente HTTP para comunicação com a API.
- **React Router DOM**: Gerenciamento de rotas no frontend.
- **Zod**: Validação de formulários.

### **Backend**
- **Node.js**: Ambiente de execução do JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **MongoDB**: Banco de dados NoSQL para armazenamento de usuários.
- **Mongoose**: Biblioteca para modelagem de dados no MongoDB.
- **JWT (JSON Web Tokens)**: Autenticação baseada em tokens.
- **Bcrypt**: Criptografia de senhas.
- **CORS**: Configuração para permitir requisições do frontend.

---

## **Como Executar o Projeto**

### **Pré-requisitos**
- Node.js (v18 ou superior)
- MongoDB (local ou Atlas)

### **Passo a Passo**

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as Dependências**:
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

3. **Configure as Variáveis de Ambiente**:
   - Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:
     ```env
     MONGODB_URI=sua-string-de-conexao-do-mongodb
     JWT_SECRET=sua-chave-secreta-para-jwt
     PORT=5000
     ```

4. **Inicie o Backend**:
   ```bash
   cd backend
   npm start
   ```

5. **Inicie o Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Acesse o Projeto**:
   - Abra o navegador e acesse `http://localhost:5173`.


---

## **Contribuição**
Se você deseja contribuir com o projeto, siga estas etapas:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um pull request.

---

## **Licença**
Este projeto está licenciado sob a [MIT License](LICENSE).

---

## **Dúvidas?**
Se você tiver dúvidas sobre o projeto ou encontrar algum problema, sinta-se à vontade para abrir uma [issue](https://github.com/seu-usuario/seu-repositorio/issues).

---

### **Dúvidas Comuns**
1. **Como configurar o MongoDB?**
   - Use o [MongoDB Atlas](https://www.mongodb.com/atlas) para um banco de dados em nuvem ou instale o MongoDB localmente.

2. **Como testar a API?**
   - Use ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/).

3. **Como fazer deploy?**
   - Para o frontend, você pode usar [Vercel](https://vercel.com/).
   - Para o backend, use [Render](https://render.com/) ou [Heroku](https://www.heroku.com/).