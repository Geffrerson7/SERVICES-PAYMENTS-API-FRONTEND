import { useState, useEffect } from "react";
import Payment from "../payment";

function List() {
  const [payments, setPayments] = useState([]);
  const [cachedData, setCachedData] = useState({});

  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  useEffect(() => {
    const fetchPayments = async () => {
      // Check if data exists in cache
      if (cachedData.payments) {
        setPayments(cachedData.payments);
      } else {
        const response = await fetch("http://127.0.0.1:8000/payment/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + authTokens?.access,
          },
        });
        const data = await response.json();
        setCachedData({ payments: data.results });
        setPayments(data.results);
      }
    };

    fetchPayments();
  }, [authTokens, cachedData]);
    
  return (
    <div>
      {payments.map((payment) => (
        <Payment key={payment.id} payment={payment} />
      ))}
      
    </div>
  );
}

export default List;
