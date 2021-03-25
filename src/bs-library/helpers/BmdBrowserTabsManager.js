import BmdAuth from "../core/BmdAuth";
import Bs from "./Bs";
import BsAppLocalStorage from "./BsAppLocalStorage";
import BsCore2 from "./BsCore2";
import BsJLS from "./BsJLS";

export default class BmdBrowserTabsManager {

    // In seconds.
    static TAB_PSEUDO_SESSION_UPDATE_INTERVAL_TIME = 60;
    static TIME_INTERVAL_OF_TOKEN_SALVAGE_IN_SEC = 25;

    static MAX_NUM_OF_TOKEN_SALVAGE_ATTEMPTS = 5;

    static PSEUDO_SESSION_STATUS_IDLE = 9000;
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

        const latestSalvageTimeInSec = BsJLS.get('BmdBrowserTabsManager.latestTokenSalvageAttemptInSec');
        const nowInSec = parseInt(Date.now() / 1000);

        if (!parseInt(latestSalvageTimeInSec)
            || latestSalvageTimeInSec < 1
            || latestSalvageTimeInSec > nowInSec) {
            // Either it was a while since the last salvage or
            // the curious user changed it.
            BmdBrowserTabsManager.setLatestTokenSalvageAttemptInSec();
            return nowInSec;
        }

        return latestSalvageTimeInSec;
    }



    static isNowValidTimeToSalvage() {
        const latestSalvageAttemptInSec = BmdBrowserTabsManager.getLatestTokenSalvageAttemptInSec();
        const nowInSec = parseInt(Date.now() / 1000);
        const elapsedTimeSinceLastAttempt = nowInSec - latestSalvageAttemptInSec;

        if (elapsedTimeSinceLastAttempt > BmdBrowserTabsManager.TIME_INTERVAL_OF_TOKEN_SALVAGE_IN_SEC) {
            return true;
        }
        return false;
    }



    static initNewTab() {
        window.addEventListener("beforeunload", (e) => {
            BmdBrowserTabsManager.onTabClose();           
        });
        
        BmdBrowserTabsManager.respondToPseudoSessionStatus();
        setInterval(BmdBrowserTabsManager.respondToPseudoSessionStatus, BmdBrowserTabsManager.TAB_PSEUDO_SESSION_UPDATE_INTERVAL_TIME * 1000);
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



    static onTabClose() {

        switch (BsJLS.get('BmdBrowserTabsManager-pseudoSessionStatusOnCache')) {
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE:
                BmdBrowserTabsManager.flagCacheBmdAuthExpiring();
                break;
        }
    }



    static respondToPseudoSessionStatus() {
        const currentStatus = BsJLS.get('BmdBrowserTabsManager-pseudoSessionStatusOnCache');

        switch (currentStatus) {
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING:
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN:
                BmdBrowserTabsManager.trySalvageToken();
                break;
            case BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE:
                break;
            default:
                BsJLS.set('BmdBrowserTabsManager-pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE);
                break;

        }

    }



    static doPreTrySalvageTokenProcess() {
        let shouldProceed = false;
        const numOfSalvageAttempts = BmdBrowserTabsManager.getNumOfTokenSalvageAttemps();


        if (
            BmdAuth.isLoggedIn()
            && BmdAuth.isTransientUser()
            && BmdBrowserTabsManager.isNowValidTimeToSalvage()
        ) {

            if (numOfSalvageAttempts >= BmdBrowserTabsManager.MAX_NUM_OF_TOKEN_SALVAGE_ATTEMPTS) {
                BmdBrowserTabsManager.onTrySalvageTokenReturn(false);
            } else {
                shouldProceed = true;
            }
        }


        return {
            shouldProceed: shouldProceed,
            numOfSalvageAttempts: numOfSalvageAttempts,
        };
    }



    /** NOTE: FOR-DEBUG */
    static doSalvageTokenProcessDebugStats(updatedNumOfSalvageAttempts) {

        BsJLS.set('BmdBrowserTabsManager-numOfSalvageAttempts', '#: ' + updatedNumOfSalvageAttempts);
        const elapsedTimeSinceLastSalvageAttempt = BmdBrowserTabsManager.getNowInSec() - BmdBrowserTabsManager.getLatestTokenSalvageAttemptInSec();
        BsJLS.set('BmdBrowserTabsManager-elapsedTimeSinceLastSalvageAttempt', elapsedTimeSinceLastSalvageAttempt + 's');


        BsJLS.set('BmdBrowserTabsManager-salvageAttemptTime', 0);
        let intervalHandler = setInterval(() => {
            const salvageAttemptTime = BsJLS.get('BmdBrowserTabsManager-salvageAttemptTime');
            BsJLS.set('BmdBrowserTabsManager-salvageAttemptTime', salvageAttemptTime + 1);
            const status = BsJLS.get('BmdBrowserTabsManager-pseudoSessionStatusOnCache');
            if (status == BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE) {
                clearInterval(intervalHandler);
            }
        }, 1000);
    }



    static trySalvageToken() {

        const preProcessData = BmdBrowserTabsManager.doPreTrySalvageTokenProcess();
        if (!preProcessData.shouldProceed) { return; }
        const numOfSalvageAttempts = preProcessData.numOfSalvageAttempts;

        const updatedNumOfSalvageAttempts = parseInt(numOfSalvageAttempts) + 1;

        // TODO: ON-DEPLOYMENT: Comment out.
        BmdBrowserTabsManager.doSalvageTokenProcessDebugStats(updatedNumOfSalvageAttempts);

        BmdBrowserTabsManager.setLatestTokenSalvageAttemptInSec();
        BmdBrowserTabsManager.setNumOfTokenSalvageAttemps(updatedNumOfSalvageAttempts);
        BsJLS.set('BmdBrowserTabsManager-pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_TRYING_SALVAGE_TOKEN);


        const auth = BmdAuth.getInstance();
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
            BmdAuth.clearAuth();
        }

        BmdBrowserTabsManager.setNumOfTokenSalvageAttemps(0);
        BsJLS.set('BmdBrowserTabsManager-pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_IDLE);
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


        BsJLS.set('BmdBrowserTabsManager-pseudoSessionStatusOnCache', BmdBrowserTabsManager.PSEUDO_SESSION_STATUS_FLAGGED_EXPIRING);
    };

}