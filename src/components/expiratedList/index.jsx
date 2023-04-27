import ExpiratedPayment from "../ExpiratedPayment";
import { useState, useEffect } from "react";
import refreshToken from "../../services/refreshToken";

function ExpiratedList() {
    const [expiratedPayments, setExpiratedPayments] = useState([]);
    const [cachedData, setCachedData] = useState({});
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [accessToken, setAccessToken] = useState(authTokens.access);
    let BASE_URL = "http://127.0.0.1:8000/expired-payment/"

    if (userData.is_superuser) {
        BASE_URL = "http://127.0.0.1:8000/expired-payment/crud/"
    }

    useEffect(() => {
        const today = new Date().toISOString().replace('T', ' ').slice(0, 19);
        const fetchExpiratedPayments = async () => {

            if (userData.expirated_date === today) {
                const newAccessToken = await refreshToken(authTokens.refresh)
                setAccessToken(newAccessToken);
              }
            
            if (cachedData.expiratedPayments) {
                setExpiratedPayments(cachedData.expiratedPayments)
            } else {
                const response = await fetch(BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + accessToken,
                    },
                });
                const data = await response.json();

                setCachedData({ expiratedPayments: data.results });
                setExpiratedPayments(data.results);
            }
        }
        fetchExpiratedPayments();
    }, [authTokens, cachedData, userData]);

    return (
        <div>
            <h1 className="text-md font-semibold text-gray-900 uppercase mt-4">Expirated Payments</h1>
            {expiratedPayments.map((expiratedPayment) => (
                <ExpiratedPayment key={expiratedPayment.id} expiratedPayment={expiratedPayment} />
            ))}
        </div>
    );
}

export default ExpiratedList;