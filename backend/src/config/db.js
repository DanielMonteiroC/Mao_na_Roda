const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const db = async () => {
    try {
        console.log('Conectando ao MongoDB com a URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MONGO_URI:', process.env.MONGO_URI);
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); 
    }
};

module.exports = db;
