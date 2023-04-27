import { useState, useEffect } from "react";
import Payment from "../Payment";
import refreshToken from "../../services/refreshToken";

function List() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [payments, setPayments] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const [accessToken, setAccessToken] = useState(authTokens.access);
  let BASE_URL = "http://127.0.0.1:8000/payment/"

  if (userData.is_superuser) {
    BASE_URL = "http://127.0.0.1:8000/payment/crud/"
  }

  useEffect(() => {
    const today = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const fetchPayments = async () => {
      
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh)
        setAccessToken(newAccessToken);
      }

      if (cachedData.payments) {
        setPayments(cachedData.payments);
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
        setCachedData({ payments: data.results });
        setPayments(data.results);
      }
    };

    fetchPayments();
  }, [authTokens, cachedData, userData]);

  return (
    <div>
      <h1 className="text-md font-semibold text-gray-900 uppercase mt-4">Payments</h1>
      {payments.map((payment) => (
        <Payment key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

export default List;
