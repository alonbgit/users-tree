import httpClient from '../http-client/http-client';
import apiService from '../api-service/api-service';
import authService from '../../services/auth-service/auth-service';
import cacheService from '../../services/cache-service/cache-service';

const USERS_CACHE_KEY = 'users';

class UserService {
    async getUsers () {
        let users = cacheService.get(USERS_CACHE_KEY);
        if (users) {
            return users;
        }

        await authService.verifyIsLoggedIn();
        const getUsersUrl = apiService.getFullApiUrl('/users/.json');
        const response = await httpClient.get(getUsersUrl);
        users = response.data;
        cacheService.set(USERS_CACHE_KEY, users);
        return users;
    }

    async getUsersTree () {
        const users = await this.getUsers();
        return this.buildUsersTree(users);
    }

    buildUsersTree (users) {
        const usersMap = {};
        users.forEach((user) => {
            usersMap[user.id] = user;
        });

        const root = [];

        users.forEach((user) => {
            const { managerId } = user;
            if (managerId) {
                const manager = usersMap[managerId];
                if (!manager.children) {
                    manager.children = [];
                }
                manager.children.push(user);
            } else {
                root.push(user);
            }
        });

        return root;
    }

    async getUserById (userId) {
        const users = await this.getUsers();
        const user = users.find(c => c.id.toString() === userId);
        if (!user) {
            throw new Error(`User with id ${userId} wasn't found`);
        }
        return user;
    }

    async getUserFullNameById (userId) {
        const user = await this.getUserById(userId);
        const { firstName, lastName } = user;
        return `${firstName} ${lastName}`;
    }
}

export default new UserService();