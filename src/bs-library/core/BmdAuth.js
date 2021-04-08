import BmdWebPagesInfo from "../helpers/BmdWebPagesInfo";
import Bs from "../helpers/Bs";
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



    static resetTemporaryGuestUserId() {
        const temporaryGuestUserId = Bs.getRandomId(32);
        BsJLS.set('auth.temporaryGuestUserId', temporaryGuestUserId);

        return temporaryGuestUserId;
    }



    static getTemporaryGuestUserId() {

        let temporaryGuestUserId = BsJLS.get('auth.temporaryGuestUserId');
        let shouldCreateNewTemporaryGuestUserId = false;

        if (BsJLSOLM.shouldObjWithPathRefresh('auth.temporaryGuestUserId')) {
            shouldCreateNewTemporaryGuestUserId = true;
            Bs.log('oh yeah create one');
        }
        else {
            if (!temporaryGuestUserId
                || typeof (temporaryGuestUserId) != 'string'
                || temporaryGuestUserId.length != 32
            ) {
                Bs.log('oh yeah create one for sure');
                shouldCreateNewTemporaryGuestUserId = true;
            }
        }


        if (shouldCreateNewTemporaryGuestUserId) {
            temporaryGuestUserId = Bs.getRandomId(32);
            if (BsJLS.set('auth.temporaryGuestUserId', temporaryGuestUserId)) {
                BsJLSOLM.updateRefreshDate('auth.temporaryGuestUserId');
            }
        }

        return temporaryGuestUserId;
    }



    /** MAIN FUNCS */
    static isAuthorizedForWebPage(relativePathOrPageName) {

        const pageName = BmdWebPagesInfo.getParsedWebPageName(relativePathOrPageName);
        const page = BmdWebPagesInfo.getPageInfo(pageName);

        if (!BmdAuth.isLoggedIn()) {
            if (page.doesNeedAuthentication) { return false; }
        }

        return true;
    }



    static isAuthorizedForRequest(route) {
        // TODO
    }



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