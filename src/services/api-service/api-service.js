import appConfig from '../../config/app-config';

class ApiService {
    getFullApiUrl (url) {
        const { api: { baseUrl } } = appConfig;
        return `${baseUrl}/${url}`;
    }
}

export default new ApiService();