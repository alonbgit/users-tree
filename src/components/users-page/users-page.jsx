import { useEffect, useState } from 'react';
import  { useHistory } from 'react-router-dom';
import userService from '../../services/user-service/user-service';
import authService from '../../services/auth-service/auth-service';
import UnauthorizedError from '../../services/auth-service/unauthorized-error';
import Layout from '../layout/layout';

import './users-page.scss';

const UsersPage = () => {
    const history = useHistory();
    const [usersTree, setUsersTree] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userId = authService.getUserId();
                const userFullName = await userService.getUserFullNameById(userId);
                const users = await userService.getUsersTree();

                setUsername(userFullName);
                setUsersTree(users);

                console.log('users tree', users);
            } catch (ex) {
                if (ex instanceof UnauthorizedError) {
                    history.push('/');
                    return;
                }
                throw ex;
            }
            
        };
        getUsers();
    }, [history]);

    if (!usersTree) {
        return null;
    }

    return (
        <Layout
            className='users-page'
            username={username}
        >
            Users Page
        </Layout>
    )
}

export default UsersPage;