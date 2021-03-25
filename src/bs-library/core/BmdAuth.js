import BsAppLocalStorage from "../helpers/BsAppLocalStorage";
import BsJLS from "../helpers/BsJLS";
import BsJLSOLM from "../helpers/BsJLSOLM";



class BmdAuth {

    /** CONSTS */

    /** PROPERTIES */



    /** HELPER FUNCS */
    static isTransientUser() {
        return BsAppLocalStorage.isLoggedIn() && BmdAuth.getInstance().stayLoggedIn == 0;
    }



    static isPersistentUser() {
        return BsAppLocalStorage.isLoggedIn() && BmdAuth.getInstance().stayLoggedIn == 1;
    }



    static clearAuth() {
        BsJLS.set('auth.currentAccount', null);
        BsAppLocalStorage.set("isLoggedIn", 0);
    }



    static isLoggedIn() {
        if (!BsAppLocalStorage.isLoggedIn()) { return false; }

        const storedAuth = BsJLS.get('auth.currentAccount');
        if (storedAuth?.bmdToken?.length > 0 && parseInt(storedAuth?.authProviderId)) {
            return true;
        }

        return false;

    }



    /** MAIN FUNCS */
    static set(authData) {
        BsJLS.set('auth.currentAccount', authData);
        BsAppLocalStorage.set('isLoggedIn', 1);
        BsAppLocalStorage.set('email', authData.email);

        BsJLSOLM.updateRefreshDate('auth.currentAccount');
    }


    static getInstance() {
        return BsJLS.get('auth.currentAccount');
    }



    /** EVENT FUNCS */
}



export default BmdAuth;