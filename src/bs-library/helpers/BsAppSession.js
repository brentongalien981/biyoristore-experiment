class BsAppSession {

    static clear() {
        localStorage.clear();
    }

    static set(key, val = '') {
        localStorage.setItem(key, val);
    }



    static get(key) {
        return localStorage.getItem(key);
    }

    static isLoggedIn() {
        return BsAppSession.get("isLoggedIn") == 1;
    }
}



export default BsAppSession;