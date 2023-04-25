import { ReactComponent as PaymentListSVG } from '../../assets/img/lista.svg'
import { ReactComponent as CreatePaymentSVG } from '../../assets/img/payment.svg'
import { ReactComponent as ServicesSVG } from '../../assets/img/services.svg'
import { ReactComponent as LogoutSVG } from '../../assets/img/logout.svg'
import { ReactComponent as ExpiratedPaymentListSVG } from '../../assets/img/expirated-payment.svg'
import WebLink from "../link";
import Logout from '../logout'

function Principal({children}){
    return (
        <div className="principal">
            <aside className="aside">
                <WebLink to="/lists-payment" text="Payments">
                    <PaymentListSVG className="icon"/>
                </WebLink>
                <WebLink to="/lists-expirated-payment" text="Expirated Payments">
                    <ExpiratedPaymentListSVG className="icon"/>
                </WebLink>
                <WebLink to="/create-payment" text="Create Payment">
                    <CreatePaymentSVG className="icon"/>
                </WebLink>
                <WebLink to="/services" text="Services">
                    <ServicesSVG className="icon"/>
                </WebLink>
                <Logout />
            </aside>
            <main className="main">
                {children}
            </main>
        </div>
    );
}

export default Principal;