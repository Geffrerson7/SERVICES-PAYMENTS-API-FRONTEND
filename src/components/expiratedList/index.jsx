import ExpiratedPayment from "../expiratedpayment";
import { useState, useEffect } from "react";

function ExpiratedList() {
    const [expiratedPayments, setExpiratedPayments] = useState([]);
    const [cachedData, setCachedData] = useState({});
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    useEffect(() => {
        const fetchExpiratedPayments = async () => {
            if (cachedData.expiratedPayments) {
                setExpiratedPayments(cachedData.expiratedPayments)
            } else {
                const response = await fetch("http://127.0.0.1:8000/expired-payment/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + authTokens?.access,
                    },
                });
                const data = await response.json();
                console.log(data.results)
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