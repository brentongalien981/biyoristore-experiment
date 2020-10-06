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
}



export default BsAppSession;