import axios from 'axios';

class HttpClient {
    get (url) {
        return axios.get(url);
    }
}

export default new HttpClient();