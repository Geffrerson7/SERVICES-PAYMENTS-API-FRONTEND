import Header from "../Header";
import Principal from "../Principal";
import Footer from "../Footer";
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