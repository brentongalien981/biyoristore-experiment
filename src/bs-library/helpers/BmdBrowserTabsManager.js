import Bs from "./Bs";
import BsJLS from "./BsJLS";

export default class BmdBrowserTabsManager {


    // 3min in milliseconds
    // static BMD_TAB_VALIDITY_LIFESPAN = 3 * 60 * 1000;
    static MAX_ACCEPTABLE_NUM_OF_OPEN_TABS = 100;
    // static BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL = BmdBrowserTabsManager.BMD_TAB_VALIDITY_LIFESPAN - (15 * 1000);
    static TAB_ID = null;


    // 
    static PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING = 9001;
    static PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN = 9002;


    /** TODO: FOR-DEBUG */
    static BMD_TAB_VALIDITY_LIFESPAN = 10 * 1000;
    static BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL = 5 * 1000;



    static initNewTab() {

        const tabId = Bs.getRandomId(32);
        BmdBrowserTabsManager.addOrUpdateTab(tabId);
        BmdBrowserTabsManager.TAB_ID = tabId;


        // TODO: Close all expired tabs.


        setInterval(BmdBrowserTabsManager.doIntervalUpdates, BmdBrowserTabsManager.BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL);

        // setInterval(BmdBrowserTabsManager.doIntervalUpdates, 5000);

        return tabId;
    }



    static doIntervalUpdates = () => {

        BmdBrowserTabsManager.addOrUpdateTab(BmdBrowserTabsManager.TAB_ID);

        let allBmdTabs = BmdBrowserTabsManager.getOrCreateAllBmdTabs();

        let updatedValidTabs = [];


        // Remove the expired and hacked tabs.
        for (const t of allBmdTabs) {

            if (!BmdBrowserTabsManager.isTabInCorrectFormat(t)) { continue; }
            if (BmdBrowserTabsManager.isTabExpired(t)) { continue; }

            updatedValidTabs.push(t);

            if (updatedValidTabs.length >= BmdBrowserTabsManager.MAX_ACCEPTABLE_NUM_OF_OPEN_TABS) { break; }
        }


        BsJLS.set('bmdBrowserTabs', updatedValidTabs);



        // If it's been flagged "expiring", salvage it cause the user is using a session within
        // the grace-period of BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL.
        // TODO: Also, if the process of PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN has taken 3 mins, try another salvaging process.
        if (BsJLS.get('pseudoSessionStatusOnCache') == BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING) {
            // TODO: Dispatch method for PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN.

            //ish
            BsJLS.set('pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN);
        }
    };



    static removeTabObj(tabId) {

        switch (BsJLS.get('pseudoSessionStatusOnCache')) {
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING:
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN:
                return;
        }

        // TODO: Dispatch method for PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING.
        BsJLS.set('pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING);
        //ish
    }



    static getRefreshedTab(t) {

        let updatedT = t;

        const expirationDateInMs = Date.now() + BmdBrowserTabsManager.BMD_TAB_VALIDITY_LIFESPAN;
        const expirationDateObj = new Date(expirationDateInMs);
        const readableExpirationDate = (expirationDateObj.getMonth() + 1) + "/" + (expirationDateObj.getDate()) + "/" + (expirationDateObj.getFullYear()) + " " + expirationDateObj.getHours() + ":" + expirationDateObj.getMinutes() + ":" + expirationDateObj.getSeconds();

        updatedT.expirationDateInMs = expirationDateInMs;
        updatedT.readableExpirationDate = readableExpirationDate;

        return updatedT;
    }



    static isTabExpired(t) {
        if (Date.now() > t.expirationDateInMs) { return true; }
        return false;
    }



    static addOrUpdateTab(tabId) {
        let allBmdTabs = BmdBrowserTabsManager.getOrCreateAllBmdTabs();

        if (allBmdTabs.length >= BmdBrowserTabsManager.MAX_ACCEPTABLE_NUM_OF_OPEN_TABS) { return null; }


        let updatedTabs = [];
        let doesTabExist = false;
        for (const t of allBmdTabs) {
            let theTab = t;
            if (t.id == tabId) {
                theTab = BmdBrowserTabsManager.getRefreshedTab(t);
                doesTabExist = true;
            }

            updatedTabs.push(theTab);
        }


        if (!doesTabExist) {
            let newTab = { id: tabId };
            newTab = BmdBrowserTabsManager.getRefreshedTab(newTab);
            updatedTabs.push(newTab);
        }


        BsJLS.set('bmdBrowserTabs', updatedTabs);

    }



    static getOrCreateAllBmdTabs() {
        let tabs = BsJLS.get('bmdBrowserTabs');
        if (!tabs) { return []; }

        for (const t of tabs) {
            if (!BmdBrowserTabsManager.isTabInCorrectFormat(t)) { return []; }
        }

        return tabs;
    }



    /** If the tab objs are not properly formatted (tampered by a curious user). */
    static isTabInCorrectFormat(t) {
        let returnVal = false;

        if (typeof (t) == 'object' && t.id && t.expirationDateInMs) {
            if (typeof (t.id) == 'string' && typeof (t.expirationDateInMs) == 'number') {
                returnVal = true;
            }
        }

        return returnVal;
    }
}