import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './RegisterStyle.css'

function Register() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [senha, setSenha] = useState('');
    const [idade, setIdade] = useState(''); 
    const [tipo, setTipo] = useState(''); 
    const [profissao, setProfissao] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                nome,
                sobrenome,
                email,
                telefone,
                cep,
                senha,
                idade,
                tipo,
                profissao,
            });
            console.log(response.data); 

            
            navigate('/'); 
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.msg); 
            } else {
                setErrorMessage('Erro ao registrar usuário.'); 
            }
            console.error('Erro ao registrar usuário:', error);
        }
    };

    return (
        <div className='main-register'>
            <div className='registro'>
                <h2 className='txt-registro'>Registro</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <h3 className='h3-reg'>Nome</h3>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                        required
                    />
                    <br/>
                    <h3 className='h3-reg'>Sobrenome</h3>
                    <input
                        type="text"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                        placeholder="Sobrenome"
                        required
                    />
                    <br/>
                    <h3 className='h3-reg'>Email</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <br/>
                    <h3 className='h3-reg'>Telefone</h3>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Telefone"
                        required
                    />
                    <br/>
                    <h3 className='h3-reg'>CEP</h3>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="CEP"
                        required
                    />
                    <br/>
                    <h3 className='h3-reg'>Senha</h3>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        required
                    />
                    <br/>
                    <h3 className='h3-reg'>Idade</h3>
                    <input
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        placeholder="Idade"
                        required
                    />
                    <br/><br/>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecione o tipo</option>
                        <option value="cliente">Cliente</option>
                        <option value="prestador">Prestador</option>
                    </select>
                    <br/>
                    {tipo === 'prestador' && (
                        <select
                            value={profissao}
                            onChange={(e) => setProfissao(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione a sua profissão</option>
                            {['Eletricista', 'Encanador', 'Pintor', 'Jardineiro', 'Carpinteiro', 'Pedreiro', 'Marido de Aluguel'].map((profissaoOption) => (
                                <option key={profissaoOption} value={profissaoOption}>{profissaoOption}</option>
                            ))}
                        </select>
                    )}
                    <br/>
                    <button type="submit">Registrar</button>
                </form>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </div>
            <div className='image-register'>
            <h1 className='txt-mao-roda'>MÃO NA </h1>
            <h1 className='txt-mao-roda2'> RODA</h1>
            </div>
        </div>
    );
}

export default Register;
