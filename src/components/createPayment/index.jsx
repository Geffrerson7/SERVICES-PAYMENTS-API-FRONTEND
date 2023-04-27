import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import refreshToken from "../../services/refreshToken";

function CreatePayment() {
    const [service, setService] = useState("");
    const [amount, setAmount] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cachedData, setCachedData] = useState({});
    const [serviceOptions, setServiceOptions] = useState([])
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [accessToken, setAccessToken] = useState(authTokens.access);
    const today = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const navigate = useNavigate();
    let PAYMENT_BASE_URL = "http://127.0.0.1:8000/payment/"
    let SERVICE_BASE_URL = "http://127.0.0.1:8000/service/"

    if (userData.is_superuser) {
        PAYMENT_BASE_URL = "http://127.0.0.1:8000/payment/crud/"
        SERVICE_BASE_URL = "http://127.0.0.1:8000/service/crud"
    }

    useEffect(() => {
        
        const fetchServices = async () => {

            if (userData.expirated_date === today) {
                const newAccessToken = await refreshToken(authTokens.refresh)
                setAccessToken(newAccessToken);
            }

            if (cachedData.serviceOptions) {
                setServiceOptions(cachedData.serviceOptions)
            } else {
                const response = await fetch(SERVICE_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + accessToken,
                    },
                });
                const data = await response.json();
                setCachedData({ serviceOptions: data.results });
                setServiceOptions(data.results);
            }
        }
        fetchServices();
    }, [authTokens, cachedData, userData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.expirated_date === today) {
            const newAccessToken = await refreshToken(authTokens.refresh)
            setAccessToken(newAccessToken);
        }

        let response = await fetch(PAYMENT_BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
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