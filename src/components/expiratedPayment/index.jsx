function ExpiratedPayment({ expiratedPayment }) {
    return (
        <div className="card payment" key={expiratedPayment.id}>
            <div className="flex items-center">
                <div className="icon-service">
                    <img src={expiratedPayment.service_logo}></img>
                </div>
                <p className="name-service">{expiratedPayment.service}</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="mr-80">
                    <p className="text-center">{expiratedPayment.paymentDate}</p>
                </div>
                <div className="mr-40">
                    <button className="boton boton--green">S/. {expiratedPayment.amount}</button>
                </div>
                <div className="relative m-2 mx-5 ml-20">
                    <button className="boton boton--red">S/. {expiratedPayment.penalty_fee_amount}</button>
                </div>
            </div>
        </div>
    );
}

export default ExpiratedPayment;