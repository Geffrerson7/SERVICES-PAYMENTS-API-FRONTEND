import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authTokens');
    navigate('/login');
  };
  return (

    <button className="boton boton--gris" onClick={handleLogout}>Logout</button>

  )
};

export default Logout