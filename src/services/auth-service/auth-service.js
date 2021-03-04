import httpClient from '../http-client/http-client';
import appConfig from '../../config/app-config';
import apiService from '../api-service/api-service';
import localStorageService from '../local-storage-service/local-storage-service';
import UnauthorizedError from './unauthorized-error';

const STORAGE_KEYS = {
    SECRET: 'user-secret',
    USER_ID: 'user-id',
}

class AuthService {
    async verifyIsLoggedIn () {
        // retreives the secret from the local storage
        const secret = localStorageService.get(STORAGE_KEYS.SECRET);
        if (!secret) {
            throw new UnauthorizedError();
        }
        // checks that the secret is still valid
        const userId = await this.fetchUserId(secret);
        if (!userId) {
            throw new UnauthorizedError();
        }
    }

    async isLoggedIn () {
        try {
            await this.verifyIsLoggedIn();
        } catch (ex) {
            if (ex instanceof UnauthorizedError) {
                return false;
            }
        }
        return true;
    }

    async login (email, password) {
        const secret = this.encode(email, password);
        const userId = await this.fetchUserId(secret);
        if (!userId) {
            return false;
        }
        localStorageService.set(STORAGE_KEYS.SECRET, secret);
        localStorageService.set(STORAGE_KEYS.USER_ID, userId);
        return true;
    }

    getUserId () {
        return localStorageService.get(STORAGE_KEYS.USER_ID);
    }

    async fetchUserId (secret) {
        const getSecretUrl = apiService.getFullApiUrl(`/secrets/${secret}.json`);
        const response = await httpClient.get(getSecretUrl);
        const userId = response.data;
        return userId;
    }

    logout () {
        localStorageService.remove(STORAGE_KEYS.SECRET);
        localStorageService.remove(STORAGE_KEYS.USER_ID);
    }

    encode (email, password) {
        const { security } = appConfig;
        const { poision } = security;

        let e = this.make32(email);
        let p = this.make32(password);
        let code = '';
        for (let i = 0; i < 32; ++i) {
            code += ('0' + poision[(e[i] ^ p[i]) & 0xff].toString(16)).slice(-2).toUpperCase();
        }
        return code;
    }

    make32 (s) {
        let r = s;
        while (r.length < 32) {
            r += s;
        }
        r = r.substring(0, 32);
        let ret = [];
        for (let i = 0; i < r.length; ++i) {
            ret.push(r.charCodeAt(i));
        }
        return ret;
    }
}

export default new AuthService();