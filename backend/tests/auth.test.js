const request = require('supertest');
const app = require('../src/index'); // Importa o app Express
const mongoose = require('mongoose');
const User = require('../src/models/User'); // Importa o modelo de usuário

describe('Testes de Autenticação', () => {
  let server;

  beforeAll(async () => {
    // Inicie o servidor em uma porta aleatória para testes
    server = app.listen(0);
    // Conecte-se ao banco de dados
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    // Feche o servidor e a conexão com o MongoDB
    await server.close();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpe o banco de dados antes de cada teste
    await User.deleteMany({});
  });

  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        birthDate: '1990-01-01',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuário criado com sucesso');
  });

  it('Não deve registrar um usuário com e-mail duplicado', async () => {
    // Primeiro registro
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123',
        birthDate: '1990-01-01',
      });

    // Tentativa de registro com o mesmo e-mail
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User 2',
        email: 'duplicate@example.com',
        password: 'password456',
        birthDate: '2000-01-01',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Email já cadastrado');
  });

  it('Deve fazer login com credenciais válidas', async () => {
    // Primeiro, registra um usuário
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        birthDate: '1990-01-01',
      });

    // Tenta fazer login
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Não deve fazer login com credenciais inválidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Email ou senha inválidos');
  });

  it('Deve retornar os dados do usuário autenticado', async () => {
    // Registra e faz login
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Me Test User',
        email: 'me@example.com',
        password: 'password123',
        birthDate: '1990-01-01',
      });

    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'me@example.com',
        password: 'password123',
      });

    const token = loginRes.body.token;

    // Acessa a rota protegida
    const meRes = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body).toHaveProperty('email', 'me@example.com');
  });

  it('Não deve acessar rota protegida sem token', async () => {
    const res = await request(app)
      .get('/auth/me');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Token não fornecido');
  });

  it('Não deve registrar usuário com dados inválidos', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Inv', // Nome muito curto
        email: 'invalid-email', // E-mail inválido
        password: '123', // Senha muito curta
        birthDate: 'data-invalida', // Data inválida
      });
  
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});