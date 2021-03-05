import { useState, useCallback } from 'react';
import  { useHistory } from 'react-router-dom';
import Label from '../../common/label/label';
import TextInput from '../../common/text-input/text-input';
import Button from '../../common/button/button';
import authService from '../../../services/auth-service/auth-service';

import './login-form.scss';

const LoginForm = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginError, setShowLoginError] = useState(false);

    const onLoginClick = useCallback(async () => {
        const success = await authService.login(email, password);
        if (success) {
            history.push('/users');
        } else {
            setShowLoginError(true);
        }
    }, [history, email, password]);

    const onEmailChange = (value) => {
        setEmail(value);
    }

    const onPasswordChange = (value) => {
        setPassword(value);
    }

    const isLoginBtnEnabled = () => {
        return email.length > 0 && password.length > 0;
    };

    return (
        <div className='login-form'>
            <Label title='Email Adress:'>
                <TextInput
                    value={email}
                    onChange={onEmailChange}
                />
            </Label>
            <Label title='Password:'>
                <TextInput
                    value={password}
                    onChange={onPasswordChange}
                />
            </Label>
            {showLoginError && (
                <span className='login-form__error'>
                    Invalid username or password :(
                    <br />
                    Please try again
                </span>
            )}
            <Button
                className='login-form__login-btn'
                onClick={onLoginClick}
                isDisabled={!isLoginBtnEnabled()}
            >
                Login
            </Button>
        </div>
    )
}

export default LoginForm;