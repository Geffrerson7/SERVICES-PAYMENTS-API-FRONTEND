function Payment({ payment }) {
    return (
        <div className="rounded-xl m-4 text-gray-700 text-xs mx-4 nm-flat-white overflow-hidden flex p-2 justify-between" key={payment.id}>
            <div className="flex items-center">
                <div className="icon-service">
                    <img src={payment.service_logo}></img>
                </div>
                <p className="name-service">{payment.service}</p>
            </div>
            
            <div className="flex items-center justify-center">
                <div className="mr-80">
                    <p className="text-center">{payment.paymentDate}</p>
                </div>
                <div className="relative m-2 mx-5 ml-40">
                    <button className="boton boton--green">S/. {payment.amount}</button>
                </div>
            </div>
        </div>
    );
}

export default Payment;