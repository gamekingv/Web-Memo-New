const storage = {
    get(key) {
        return browser.storage.local.get(key);
    },
    set(key, data) {
        return browser.storage.local.set({ [key]: JSON.parse(JSON.stringify(data)) });
    },
    clear() {
        return browser.storage.local.clear();
    }
};

export default storage;