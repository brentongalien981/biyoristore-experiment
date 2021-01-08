import Bs from "./Bs";

/**
 * JLS stands for JsonifiedLocalStorage.
 */
class BsJLS {

    static clear() {
        localStorage.clear();
    }

    static set(key, val) {
        key = Bs.appName + "::" + key;
        val = JSON.stringify(val);
        localStorage.setItem(key, val);
    }



    static get(key) {
        key = Bs.appName + "::" + key;
        const val = JSON.parse(localStorage.getItem(key));
        return val;
    }
}



export default BsJLS;