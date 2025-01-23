require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // URL do frontend (ajuste conforme necessário)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true, // Permite cookies e headers de autenticação
  })
);

// Middleware para processar JSON
app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});