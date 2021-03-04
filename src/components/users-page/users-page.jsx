import { useEffect, useCallback, useState } from 'react';
import  { useHistory } from 'react-router-dom';
import Button from '../common/button/button';
import authService from '../../services/auth-service/auth-service';
import userService from '../../services/user-service/user-service';
import UnauthorizedError from '../../services/auth-service/unauthorized-error';

import './users-page.scss';

const UsersPage = () => {
    const history = useHistory();
    const [usersTree, setUsersTree] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            let users;
            try {
                users = await userService.getUsersTree();
            } catch (ex) {
                if (ex instanceof UnauthorizedError) {
                    history.push('/');
                    return;
                }
            }
            setUsersTree(users);
        };
        getUsers();
    }, [history]);

    const onLogout = useCallback(() => {
        authService.logout();
        history.push('/');
    }, [history]);

    if (!usersTree) {
        return null;
    }

    return (
        <div className='users-page'>
            Users Page
            <Button onClick={onLogout}>
                Logout
            </Button>
        </div>
    )
}

export default UsersPage;