function ExpiratedPayment({ expiratedPayment }) {
    return (
        <div className="card payment" key={expiratedPayment.id}>
            <div className="flex items-center">
                <div className="icon-service">
                    <img src={expiratedPayment.service_logo}></img>
                </div>
                <p className="name-service">{expiratedPayment.service}</p>
            </div>
            <div className="flex items-center">
                <div className="mr-60">
                    <p className="text-center">{expiratedPayment.paymentDate}</p>
                </div>
                <div className="mr-40">
                    <button className="boton boton--gris">S/. {expiratedPayment.amount}</button>
                </div>
                <div className="relative m-2 mx-5">
                    <button className="boton boton--gris">S/. {expiratedPayment.penalty_fee_amount}</button>
                </div>
            </div>
        </div>
    );
}

export default ExpiratedPayment;