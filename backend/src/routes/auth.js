const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Rota de Registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, birthDate } = req.body;

        // Verifica se o usuário já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Cria o usuário
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            birthDate
        });

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou senha inválidos' });
        }

        // Verifica a senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Email ou senha inválidos' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                birthDate: user.birthDate
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
});

// Dados do Usuário
router.get('/me', async (req, res) => {
    try {
      // Verifica o token do header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }
  
      // Decodifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Busca o usuário no banco de dados
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(401).json({ message: 'Token inválido', error: error.message });
    }
  });

module.exports = router;