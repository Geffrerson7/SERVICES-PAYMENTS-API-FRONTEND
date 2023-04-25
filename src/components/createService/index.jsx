import { useEffect, useState, useContext } from "react";

function CreateService() {
    const [name, setName] = useState("");
    const [prefixe, setPrefixe] = useState("");
    const [logo, setLogo] = useState("");

    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://payments-api-2fqe.onrender.com/api/v2/payments", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + authTokens?.access
                },
                body: JSON.stringify({
                    name: name,
                    prefixe: prefixe,
                    logo: logo,
                }),
            }).then((response) => {
                if (response.ok) {
                    Swal.fire(
                        '¡Creado!',
                        'Los datos se guardaron correctamente',
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
                        text: "¡Ocurrió un error!"
                    })
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const ServiceOptions = ["Netflix", "Amazon Prime video", "HBO Max"]
    return (
        <>
            <div className="card">
                <h1>Create Service</h1>
                <form className="p-4" onSubmit={handleSubmit}>
                    <label className="label">
                        Name
                        <input
                            type="string"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="label">
                        Prefixe
                        <input
                            type="string"
                            className="input"
                            value={prefixe}
                            onChange={(e) => setPrefixe(e.target.value)}
                        />
                    </label>
                    <label className="label">
                        Logo
                        <input
                            type="string"
                            className="input"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                        />
                    </label>
                </form>
                <div className="botones">
                    <button className="boton boton--negro" type="submit">Create</button>
                    <button className="boton boton--gris">Cancel</button>
                </div>
            </div>
            <div className="card">
                <h1>Update Service</h1>
                <form className="p-4">
                    <label className="label">
                        Service Name
                        <div>
                            <select className="input" value={name} onChange={e => onChange(e, 'service')}>
                                {ServiceOptions.map(option => <option value={option}>{option}</option>)}
                            </select>
                        </div>
                    </label>
                    <label className="label">
                        Name
                        <input
                            type="string"
                            className="input"
                            value={name}
                            onChange={e => onChange(e, 'name')}
                        />
                    </label>
                    <label className="label">
                        Prefixe
                        <input
                            type="string"
                            className="input"
                            value={prefixe}
                            onChange={e => onChange(e, 'prefixe')}
                        />
                    </label>
                    <label className="label">
                        Logo
                        <input
                            type="string"
                            className="input"
                            value={logo}
                            onChange={e => onChange(e, 'logo')}
                        />
                    </label>
                </form>
                <div className="botones">
                    <button className="boton boton--negro" type="submit">Update</button>
                    <button className="boton boton--gris">Cancel</button>
                </div>
            </div>
        </>
    );
}

export default CreateService;