import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

function CreatePayment() {
    const [service, setService] = useState("");
    const [amount, setAmount] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cachedData, setCachedData] = useState({});
    const [serviceOptions, setServiceOptions] = useState([])
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch("http://127.0.0.1:8000/payment/", {
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
                    'Created!',
                    'The payment was created successfully.',
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
        });

    };

    return (
        <>
            <h1 className="text-md font-semibold text-gray-900 uppercase mt-4">Create Payment</h1>
            <div className="card">
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
                    <div className="px-4 py-3 flex justify-between">
                        <button className="boton bg-primary text-light" type="submit">Create</button>
                        <button className="boton bg-primaryDark" onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreatePayment;