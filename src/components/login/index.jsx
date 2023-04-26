import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import userRole from '../../services/userRole';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:8000/user/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();
        if (response.status === 200) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            const userData = await userRole(username)
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Correo o contraseña no válidos!",
            });
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="card shadow-lg w-[30%] m-auto">
                <form className="p-4" onSubmit={handleSubmit}>
                    <label className="label">
                        Username:
                        <input
                            type="string"
                            className="input"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label className="label">
                        Contraseña:
                        <input
                            type="password"
                            className="input"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className="flex flex-col items-center">
                        <button className="boton bg-primaryDark text-dark mb-2" type="submit">Login</button>
                        <button className="boton bg-primary text-light" onClick={() => navigate('/register')}>Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;
