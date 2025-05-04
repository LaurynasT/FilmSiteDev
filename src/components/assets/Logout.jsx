import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Api/Api';
import { AuthContext } from "../assets/AuthContext"; // Correct import

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // Get auth setter
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser();
        // Update auth state
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login instead of home
      } catch (error) {
        console.error('Error logging out:', error);
        // Even if the API call fails, update auth state
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    
    performLogout();
  }, [navigate, setIsAuthenticated]);
  
  return <div>Logging out...</div>;
};

export default Logout;
