import Header from "../header";
import Principal from "../principal";
import List from "../list";
import CreatePayment from "../createPayment";
import Footer from "../footer";
import { Outlet } from "react-router-dom";
function Layout() {
    return (
        <>
            <Header></Header>
            <Principal>
                
                <Outlet></Outlet>
            </Principal>
            <Footer></Footer>
        </>
    );
}

export default Layout;