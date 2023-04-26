import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:8000/user/api/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
                
            }),
            }).then((response) => {
                if (response.ok) {
                    Swal.fire(
                        '¡Creado!',
                        'The user was created successfully.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: 'Oops...',
                        text: "An error occurred!"
                    })
                }
            })
        
        
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
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label className="label">
                        Email:
                        <input
                            type="string"
                            className="input"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="label">
                        Contraseña:
                        <input
                            type="password"
                            className="input"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    
                    <div className="flex flex-col items-center">
                        <button className="boton bg-primaryDark text-dark mb-2" type="submit">Register</button>
                        <button className="boton bg-primary text-light" onClick={() => navigate('/login')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>

  )
}

export default Register