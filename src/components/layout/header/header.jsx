import { useCallback } from 'react';
import PropTypes from 'prop-types';
import  { useHistory } from 'react-router-dom';
import Button from '../../common/button/button';
import authService from '../../../services/auth-service/auth-service';

import './header.scss';

const Header = ({ username }) => {
    const history = useHistory();

    const onLogout = useCallback(() => {
        authService.logout();
        history.push('/');
    }, [history]);

    return (
        <header className='header'>
            <span className='header__username'>{username}</span>
            <Button onClick={onLogout}>
                Logout
            </Button>
        </header>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
}

export default Header;