import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../services/memory";

function CreatePayment() {
    const [service, setService] = useState("");
    const [amount, setAmount] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cachedData, setCachedData] = useState({});
    const [serviceOptions, setServiceOptions] = useState([])
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    useEffect(() => {
        const fetchServices = async () => {
            if (cachedData.serviceOptions) {
                setServiceOptions(cachedData.serviceOptions)
            } else {
                const response = await fetch("http://127.0.0.1:8000/service/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + authTokens?.access,
                    },
                });
                const data = await response.json();
                setCachedData({ serviceOptions: data.results });
                setServiceOptions(data.results);
            }
        }
        fetchServices();
    }, [authTokens, cachedData])

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://127.0.0.1:8000/payment/", {
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
                            {serviceOptions.map(option => <option key={option.id} value={option.name}>{option.name}</option>)}
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
                <div className="botones">
                    <button className="boton boton--negro" type="submit">Create</button>
                    <button className="boton boton--gris">Cancel</button>
                </div>
            </form>

        </div>


    );
}

export default CreatePayment;