import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../services/memory";

function CreatePayment() {
    const [service, setService] = useState("");
    const [amount, setAmount] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

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
                    service: service,
                    amount: amount,
                    expirationDate: expirationDate,
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

        <div className="card">
            <h1>Create Payment</h1>
            <form className="p-4" onSubmit={handleSubmit}>
                <label className="label">
                    Service Name
                    <div>
                        <select className="input" value={service} onChange={(e) => setService(e.target.value)}>
                            {ServiceOptions.map(option => <option value={option}>{option}</option>)}
                        </select>
                    </div>
                </label>
                <label className="label">
                    Amount
                    <input
                        type="number"
                        className="input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <label className="label">
                    Expiration Date
                    <input
                        type="date"
                        className="input"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                </label>
            </form>
            <div className="botones">
                <button className="boton boton--negro" type="submit">Create</button>
                <button className="boton boton--gris">Cancel</button>
            </div>
        </div>


    );
}

export default CreatePayment;