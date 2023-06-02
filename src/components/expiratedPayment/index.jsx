function ExpiratedPayment({ expiratedPayment }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      {userData.is_superuser ? (
        <div className="card payment" key={expiratedPayment.id}>
          <div className="flex items-center">
            <div className="icon-service">
              <img src={expiratedPayment.service_logo}></img>
            </div>
            <button className="boton boton--yellow">
              {expiratedPayment.service}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="mr-4 ml-40">
              <button className="boton boton--sky">
                {expiratedPayment.paymentDate}
              </button>
            </div>
            <div className="mr-4 ml-60">
              <button className="boton boton--green">
                S/. {expiratedPayment.amount}
              </button>
            </div>
            <div className="relative m-2 mx-5 ml-60">
              <button className="boton boton--red">
                S/. {expiratedPayment.penalty_fee_amount}
              </button>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <button className="boton boton--red">
              {expiratedPayment.user_email}
            </button>
          </div>
        </div>
      ) : (
        <div className="card payment" key={expiratedPayment.id}>
          <div className="flex items-center">
            <div className="icon-service">
              <img src={expiratedPayment.service_logo}></img>
            </div>
            <button className="boton boton--yellow">
              {expiratedPayment.service}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="mr-80">
              <button className="boton boton--sky">
                {expiratedPayment.paymentDate}
              </button>
            </div>
            <div className="mr-40">
              <button className="boton boton--green">
                S/. {expiratedPayment.amount}
              </button>
            </div>
            <div className="relative m-2 mx-5 ml-20">
              <button className="boton boton--red">
                S/. {expiratedPayment.penalty_fee_amount}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpiratedPayment;
