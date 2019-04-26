const storage = {
    get(key) {
        if (key && !Array.isArray(key)) {
            return { [key]: JSON.parse(localStorage.getItem(key)) };
        }
        else {
            let item = {};
            for (key in localStorage) {
                if (key.match(/(anime|song|film|game|last|day|sync)/))
                    item[key] = JSON.parse(localStorage.getItem(key));
            }
            return item;
        }
    },
    set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }
};

export default storage;