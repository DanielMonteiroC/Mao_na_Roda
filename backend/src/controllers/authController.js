
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const profissõesPermitidas = [
    'Eletricista', 'Encanador', 'Pintor', 'Jardineiro', 'Carpinteiro', 'Pedreiro', 'Marido de Aluguel'
];

exports.register = async (req, res) => {
    const { email, senha, nome, sobrenome, idade, telefone, cep, tipo, profissao } = req.body;

    try {
        
        if (!email || !senha || !nome || !sobrenome || !idade || !telefone || !cep || !tipo) {
            return res.status(400).json({ msg: "Por favor, preencha todos os campos obrigatórios." });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "E-mail já cadastrado." });
        }

        if (idade < 18) {
            return res.status(400).json({ msg: "Você deve ter pelo menos 18 anos." });
        }

        if (telefone.length !== 11) {
            return res.status(400).json({ msg: "O telefone deve ter 11 caracteres." });
        }

        
        if (tipo === 'Prestador' && !profissõesPermitidas.includes(profissao)) {
            return res.status(400).json({ msg: "Profissão inválida. Por favor, escolha uma profissão válida." });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        
        const user = new User({
            email,
            senha: hashedPassword,
            nome,
            sobrenome,
            idade,
            telefone,
            cep,
            tipo,
            profissao 
        });

        await user.save();
        res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado.' });
        }

      
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Senha incorreta.' });
        }

        
        const token = jwt.sign({ id: user._id }, 'seu_segredo', { expiresIn: '1h' }); 
        res.json({ token }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro interno do servidor.' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};
