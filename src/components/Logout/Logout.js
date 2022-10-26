import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';


const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useAuthContext();
    useEffect(() => {
        authService.logout(user.token)
            .then(() => {
                userLogout();
                navigate('/');
            }).catch((err) => {
                navigate('*');
            })
    })
}

export default Logout;