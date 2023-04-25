import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:8000/" + "user/token/", {
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
            localStorage.setItem('username', JSON.stringify(username));
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
        <>
            <div className="card">
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
                    <div className="botones">
                        <button className="boton boton--negro" type="submit">Login</button>
                        <button className="boton boton--gris">Cancel</button>
                    </div>
                </form>
                
            </div>
        </>


    );
}

export default Login;
