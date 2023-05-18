import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import user from '../../services/user';

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
            const userData = await user(data.user_id)
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate("/");
            window.location.reload();
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
                <form className="p-8" onSubmit={handleSubmit}>
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
                    <div className="flex flex-col items-center mt-12">
                        <button className="boton-login bg-primaryDark text-dark mb-4" type="submit">Login</button>
                        <button className="boton-register bg-primary text-light" onClick={() => navigate('/register')}>Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;
