import {ReactComponent as LogoSVG} from '../../assets/img/logo.svg'
import {ReactComponent as PerfilSVG} from '../../assets/img/perfil.svg'
function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <LogoSVG className="logo"/>
                <a className="title" href="/">Payments app</a>
            </div>
            <nav>
                <a href="/profile" className="link">
                    <PerfilSVG className="icon" />
                </a>
            </nav>
        </header>
    );
}

export default Header;