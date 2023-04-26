import ExpiratedPayment from "../ExpiratedPayment";
import { useState, useEffect } from "react";

function ExpiratedList() {
    const [expiratedPayments, setExpiratedPayments] = useState([]);
    const [cachedData, setCachedData] = useState({});
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    let BASE_URL = "http://127.0.0.1:8000/expired-payment/"

    if (userData.is_superuser) {
        BASE_URL = "http://127.0.0.1:8000/expired-payment/crud/"
    }

    useEffect(() => {
        const fetchExpiratedPayments = async () => {
            if (cachedData.expiratedPayments) {
                setExpiratedPayments(cachedData.expiratedPayments)
            } else {
                const response = await fetch(BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + authTokens?.access,
                    },
                });
                const data = await response.json();

                setCachedData({ expiratedPayments: data.results });
                setExpiratedPayments(data.results);
            }
        }
        fetchExpiratedPayments();
    }, [authTokens, cachedData]);

    return (
        <div>
            {expiratedPayments.map((expiratedPayment) => (
                <ExpiratedPayment key={expiratedPayment.id} expiratedPayment={expiratedPayment} />
            ))}
        </div>
    );
}

export default ExpiratedList;