import Bs from "./Bs";

class BsAppLocalStorage {

    static clear() {
        localStorage.clear();
    }

    static set(key, val = '') {
        key = Bs.appName + "::" + key;

        try {
            localStorage.setItem(key, val);
        } catch (e) {
            return false;
        }

        return true;
    }



    static get(key) {
        key = Bs.appName + "::" + key;
        let val = localStorage.getItem(key);
        return val;
    }

    static isLoggedIn() {
        return BsAppLocalStorage.get("isLoggedIn") == 1;
    }
}



export default BsAppLocalStorage;