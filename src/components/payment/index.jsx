function Payment({ payment }) {
    return (
        <div className="card payment" key={payment.id}>
            <div className="flex items-center">
                <div className="icon-service">
                    <img src={payment.service_logo}></img>
                </div>
                <p className="name-service">{payment.service}</p>
            </div>
            
            <div className="flex items-center">
                <div className="mr-80">
                    <p className="text-center">{payment.paymentDate}</p>
                </div>
                <div className="relative m-2 mx-5">
                    <button className="boton boton--gris">S/. {payment.amount}</button>
                </div>
            </div>
        </div>
    );
}

export default Payment;