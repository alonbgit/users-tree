import httpClient from '../http-client/http-client';
import apiService from '../api-service/api-service';
import authService from '../../services/auth-service/auth-service';

class UserService {
    async getUsersTree () {
        await authService.verifyIsLoggedIn();
        const getUsersUrl = apiService.getFullApiUrl('/users/.json');
        const response = await httpClient.get(getUsersUrl);
        const users = response.data;
        return users;
    }
}

export default new UserService();