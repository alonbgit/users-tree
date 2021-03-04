import React from 'react';
import LoginForm from './login-form/login-form';

import './login-page.scss';

const LoginPage = () => {
    return (
        <div className='login-page'>
            Please Login
            <LoginForm />
        </div>
    )
}

export default LoginPage;