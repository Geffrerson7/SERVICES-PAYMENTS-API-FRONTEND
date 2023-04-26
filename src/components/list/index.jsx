import { useState, useEffect } from "react";
import Payment from "../payment";


function List() {
  const [payments, setPayments] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  let BASE_URL = "http://127.0.0.1:8000/payment/"

  if(userData.is_superuser){
    BASE_URL="http://127.0.0.1:8000/payment/crud/"
  }
  
  useEffect(() => {
    const fetchPayments = async () => {
      // Check if data exists in cache
      if (cachedData.payments) {
        setPayments(cachedData.payments);
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
