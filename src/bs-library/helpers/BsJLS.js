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


    static isSet(key) {
        key = Bs.appName + "::" + key;
        let val = localStorage.getItem(key);

        if (!val || val === "") { return false; }

        return true;
    }



    static get(key) {
        
        if (!BsJLS.isSet(key)) { return null; }

        key = Bs.appName + "::" + key;
        let val = localStorage.getItem(key);
        val = JSON.parse(val);
        return val;
    }
}



export default BsJLS;