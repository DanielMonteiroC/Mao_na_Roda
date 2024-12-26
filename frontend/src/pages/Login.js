import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginStyle.css'

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); 
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, senha });
            console.log("Login bem-sucedido:", response.data);
    
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log("Token armazenado:", response.data.token);
            }
    
            navigate('/home'); 
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert("E-mail ou senha incorretos.");
                } else if (error.response.status === 500) {
                    alert("Erro interno do servidor. Tente novamente mais tarde.");
                }
            } else {
                console.error("Erro ao fazer login:", error);
            }
        }
    }
    
    

    return (
        <div className='main'>
            <div className='login'>
                <h1 className='facalogin'>Faça seu login</h1>
                <form onSubmit={handleSubmit}>
                    <br/>
                    <h3>Digite seu email</h3>
                    <br/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    /> 
                    <br/><br/>
                    <h3>Digite sua senha</h3>
                    <br/>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        required
                    />
                    <br></br>
                    <br></br>
                    <p className='conta'>
                    Não tem uma conta? <Link to="/register" className='link'>Registre-se aqui</Link>
                </p>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <div className='Image'>
                    <h1 className='textonaroda'>MÃO NA</h1> 
                    <h1 className='textonaroda2'>RODA</h1> 
            </div>
        </div>
        );
}

export default Login;
