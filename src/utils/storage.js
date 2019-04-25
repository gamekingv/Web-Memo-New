const storage = {
    get(key) {
        return localStorage.getItem(key);
    },
    set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }
};

export default storage;