// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    sobrenome: {  
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    telefone: {  
        type: String,
        required: true
    },
    cep: {  
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['cliente', 'prestador'],
        required: true
    },
    profissao: {
        type: String,
        required: function() { return this.tipo === 'Prestador'; } 
    }
});

module.exports = mongoose.model('User', UserSchema);
