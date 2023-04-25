import { Link } from 'react-router-dom'
function WebLink({ children, text, to }) {
    return (
        <Link to={to} className="link">
            {children}
            <span className="text">{text}</span>
        </Link>
    );

}

export default WebLink