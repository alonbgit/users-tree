class CacheService {
    cache = {}

    set (key, value) {
        this.cache[key] = value;
    }

    get (key) {
        return this.cache[key];
    }

    clear (key) {
        delete this.cache[key];
    }

    clearAll () {
        this.cache = {};
    }
}

export default new CacheService();