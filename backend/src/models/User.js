const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, use um email válido']
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [8, 'A senha deve ter no mínimo 8 caracteres']
  },
  birthDate: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Aqui podemos adicionar métodos ao schema se necessário
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password; // Remove a senha quando converter para JSON
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;