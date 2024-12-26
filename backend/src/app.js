// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); 
const dotenv = require('dotenv'); 
const db = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB conectado!');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});


app.use(express.json());


app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
