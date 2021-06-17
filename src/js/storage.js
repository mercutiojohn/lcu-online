// import storage from 'store';

// 缓存数据的key
const WEB_NAME = 'WEB_NAME';

export const storage = {
    set setLocalStorageName(val) {
        if (!val) {
            storage.remove(WEB_NAME);
        } else {
            storage.set(WEB_NAME, val);
        }
    },
    get getLocalStorageName() {
        return storage.get(WEB_NAME);
    }
}