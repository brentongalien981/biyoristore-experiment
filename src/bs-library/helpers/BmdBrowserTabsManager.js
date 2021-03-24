import Bs from "./Bs";
import BsAppLocalStorage from "./BsAppLocalStorage";
import BsCore2 from "./BsCore2";
import BsJLS from "./BsJLS";

export default class BmdBrowserTabsManager {
    // 3min in milliseconds
    // static BMD_TAB_VALIDITY_LIFESPAN = 3 * 60 * 1000;
    // static BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL = BmdBrowserTabsManager.BMD_TAB_VALIDITY_LIFESPAN - (15 * 1000);
    // NOTE: FOR-DEBUG
    static BMD_TAB_VALIDITY_LIFESPAN = 10 * 1000;
    static BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL = 5 * 1000;

    static MAX_ACCEPTABLE_NUM_OF_OPEN_TABS = 100;
    static MAX_NUM_OF_TOKEN_SALVAGE_ATTEMPTS = 4;
    static TAB_ID = null;

    static PSEUDO_SESSION_STATUS_IDLE = 9000;
    static PSEUDO_SESSION_STATUS_A_TAB_CLOSED = 9001;
    static PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING = 9002;
    static PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN = 9003;



    static getNowInSec() {
        return parseInt(Date.now() / 1000);
    }



    static setLatestTokenSalvageAttemptInSec() {
        const nowInSec = parseInt(Date.now() / 1000);
        BsJLS.set('BmdBrowserTabsManager.latestTokenSalvageAttemptInSec', nowInSec);
    }



    static getLatestTokenSalvageAttemptInSec() {

        const timeInSec = BsJLS.get('BmdBrowserTabsManager.latestTokenSalvageAttemptInSec');
        const nowInSec = parseInt(Date.now() / 1000);
        const threeMinAgoInSec = nowInSec - (3 * 60);

        if (!parseInt(timeInSec)
            || timeInSec < threeMinAgoInSec
            || timeInSec > nowInSec) {
            // Either it was a while since the last salvage or
            // the curious user changed it.
            BmdBrowserTabsManager.setLatestTokenSalvageAttemptInSec();
            return nowInSec;
        }

        return timeInSec;
    }



    static isNowValidTimeToSalvage() {
        const latestSalvageAttemptInSec = BmdBrowserTabsManager.getLatestTokenSalvageAttemptInSec();
        const nowInSec = parseInt(Date.now() / 1000);
        const elapsedTimeSinceLastAttempt = nowInSec - latestSalvageAttemptInSec;
        const minIntervalOfAttemptsInSec = 30; // TODO: Change

        if (elapsedTimeSinceLastAttempt > minIntervalOfAttemptsInSec) {
            return true;
        }
        return false;
    }



    static initNewTab() {

        // TODO:MAYBE-DELETE
        const tabId = Bs.getRandomId(32);
        BmdBrowserTabsManager.TAB_ID = tabId;

        // TODO: Maybe do the same stuffs initially as what you do on intervals.

        BmdBrowserTabsManager.initPseudoSessionStatus();

        setInterval(BmdBrowserTabsManager.doIntervalUpdates, BmdBrowserTabsManager.BMD_TAB_EXPIRY_DATE_REFRESH_INTERVAL);
    }


    // TODO: Work on other cases.
    static initPseudoSessionStatus() {
        const currentStatus = BsJLS.get('pseudoSessionStatusOnCache');

        switch (currentStatus) {
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE:
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_A_TAB_CLOSED:
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING:
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN:
                break;
            default:
                BsJLS.set('pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE);
                break;
        }
    }



    static setNumOfTokenSalvageAttemps(val = 0) {
        BsJLS.set('BmdBrowserTabsManager-numOfTokenSalvageAttemps', val);
    }



    static getNumOfTokenSalvageAttemps() {
        let num = BsJLS.get('BmdBrowserTabsManager-numOfTokenSalvageAttemps');
        if (!parseInt(num)
            || num < 0
            || num > BmdBrowserTabsManager.MAX_NUM_OF_TOKEN_SALVAGE_ATTEMPTS) {
            // Meaning the curious user changed the local-storage value.
            BmdBrowserTabsManager.setNumOfTokenSalvageAttemps(0);
            return 0;
        }

        return num;
    }



    static doIntervalUpdates = () => {
        BmdBrowserTabsManager.respondToPseudoSessionStatus();
    };



    static onTabClose(tabId) {

        switch (BsJLS.get('pseudoSessionStatusOnCache')) {
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE:
                BmdBrowserTabsManager.flagCacheBmdAuthExpiring();
                break;
        }
    }



    // TODO: Work on other cases
    static respondToPseudoSessionStatus() {
        const currentStatus = BsJLS.get('pseudoSessionStatusOnCache');

        switch (currentStatus) {
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING:
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN:
                BmdBrowserTabsManager.trySalvageToken();
                break;
            default:
                break;

        }

    }



    /**
     * Also, if the process of PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN has taken 30 sec, try another salvaging process until
     * you exceed the MAX_NUM_OF_TOKEN_SALVAGE_ATTEMPTS.
     */
    static trySalvageToken() {

        if (!BsAppLocalStorage.isLoggedIn()) { return; }

        if (!BmdBrowserTabsManager.isNowValidTimeToSalvage()) { return; }

        const numOfSalvageAttempts = BmdBrowserTabsManager.getNumOfTokenSalvageAttemps();
        if (numOfSalvageAttempts >= BmdBrowserTabsManager.MAX_NUM_OF_TOKEN_SALVAGE_ATTEMPTS) {

            BmdBrowserTabsManager.onTrySalvageTokenReturn(false);
            return;
        }

        // TODO: Allow this only if the logged-in user didn't want to stay logged-in.
        const auth = BsJLS.get('auth.currentAccount');


        const updatedNumOfSalvageAttempts = parseInt(numOfSalvageAttempts) + 1;

        // NOTE: FOR-DEBUG
        BsJLS.set('BmdBrowserTabsManager-numOfSalvageAttempts', '#: ' + updatedNumOfSalvageAttempts);
        const elapsedTimeSinceLastSalvageAttempt = BmdBrowserTabsManager.getNowInSec() - BmdBrowserTabsManager.getLatestTokenSalvageAttemptInSec();
        BsJLS.set('BmdBrowserTabsManager-elapsedTimeSinceLastSalvageAttempt', elapsedTimeSinceLastSalvageAttempt + 's');

        // NOTE: FOR-DEBUG
        BsJLS.set('BmdBrowserTabsManager-salvageAttemptTime', 0);
        let intervalHandler = setInterval(() => {
            const salvageAttemptTime = BsJLS.get('BmdBrowserTabsManager-salvageAttemptTime');
            BsJLS.set('BmdBrowserTabsManager-salvageAttemptTime', salvageAttemptTime + 1);
            const status = BsJLS.get('pseudoSessionStatusOnCache');
            if (status == BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE) {
                clearInterval(intervalHandler);
            }
        }, 1000);



        BmdBrowserTabsManager.setLatestTokenSalvageAttemptInSec();
        BmdBrowserTabsManager.setNumOfTokenSalvageAttemps(updatedNumOfSalvageAttempts);
        BsJLS.set('pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN);


        BsCore2.ajaxCrud({
            url: '/bmd-auth/trySalvageToken',
            method: 'post',
            params: {
                bmdToken: auth.bmdToken,
                authProviderId: auth.authProviderId,
            },
            callBackFunc: (requestData, json) => {
                BmdBrowserTabsManager.onTrySalvageTokenReturn(json.isResultOk);
            },
            errorCallBackFunc: (errors) => {
                BmdBrowserTabsManager.onTrySalvageTokenReturn(false);
            },
        });
    };



    static onTrySalvageTokenReturn(isResultOk = false) {

        if (!isResultOk) {
            BsJLS.set('auth.currentAccount', null);
            BsAppLocalStorage.set("isLoggedIn", 0);
        }

        BmdBrowserTabsManager.setNumOfTokenSalvageAttemps(0);
        BsJLS.set('pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE);
    }



    static flagCacheBmdAuthExpiring() {

        if (!BsAppLocalStorage.isLoggedIn()) { return; }
        const auth = BsJLS.get('auth.currentAccount');

        BsCore2.ajaxCrud({
            url: '/bmd-auth/flagAsExpiring',
            method: 'post',
            params: {
                bmdToken: auth.bmdToken,
                authProviderId: auth.authProviderId,
            },
        });


        BsJLS.set('pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING);
    };

}