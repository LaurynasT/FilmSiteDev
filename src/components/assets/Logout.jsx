import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Api/Api';
import { AuthContext } from "../assets/AuthContext"; 
const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); 
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser();
        
        setIsAuthenticated(false);
        navigate('/login'); 
      } catch (error) {
        console.error('Error logging out:', error);
        
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    
    performLogout();
  }, [navigate, setIsAuthenticated]);
  
  return <div>Logging out...</div>;
};

export default Logout;
