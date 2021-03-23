import Bs from "./Bs";
import BsJLS from "./BsJLS";

export default class BmdBrowserTabsManager {


    // 3min in milliseconds
    static BMD_TAB_VALIDITY_LIFESPAN = 3 * 60 * 1000;
    static MAX_ACCEPTABLE_NUM_OF_OPEN_TABS = 100;
    static BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL = BmdBrowserTabsManager.BMD_TAB_VALIDITY_LIFESPAN - (15 * 1000);
    static TAB_ID = null;



    static initNewTab() {

        const tabId = Bs.getRandomId(32);
        BmdBrowserTabsManager.addOrUpdateTab(tabId);
        BmdBrowserTabsManager.TAB_ID = tabId;


        setInterval(BmdBrowserTabsManager.doIntervalUpdates, BmdBrowserTabsManager.BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL);
        // TODO: FOR-DEBUG
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
    };



    static removeTabObj(tabId) {
        let allTabs = BmdBrowserTabsManager.getOrCreateAllBmdTabs();

        let updatedTabs = [];
        for (const t of allTabs) {
            if (t.id == tabId) {
                const key = 'REMOVED-TAB::' + tabId.substring(0, 4);
                const val = tabId;
                BsJLS.set(key, val);
                continue;
            }
            updatedTabs.push(t);
        }

        BsJLS.set('bmdBrowserTabs', updatedTabs);
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