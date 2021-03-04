import { useEffect, useState } from 'react';
import  { useHistory } from 'react-router-dom';
import LoginForm from './login-form/login-form';
import authService from '../../services/auth-service/auth-service';

import './login-page.scss';

const LoginPage = () => {
    const history = useHistory();
    const [loaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const verifyIsLoggedIn = async () => {
            const loggedIn = await authService.isLoggedIn();
            if (loggedIn) {
                history.push('/users');
                return;
            }
            setIsLoaded(true)
        }
        verifyIsLoggedIn();
    }, [history])

    if (!loaded) {
        return null;
    }

    return (
        <div className='login-page'>
            Please Login
            <LoginForm />
        </div>
    )
}

export default LoginPage;