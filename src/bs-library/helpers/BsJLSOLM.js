import BsJLS from "./BsJLS";

/**
 * JLSOLM stands for JsonifiedLocalStorage-Object-LifespanManager
 * var dateRefreshed: milliseconds after 1970
 * var lifespan: lifespan in min
 * 
 * NOTE: Everytime you update a valuo of BsJLSOLM, call BsJLS.set("BsJLSOLM-objs") or BsJLS.set("BsJLSOLM-searchQueries")
 */
export default class BsJLSOLM {

    static SEARCH_QUERY_LIFESPAN = 120;

    static objs = BsJLS.get("BsJLSOLM-objs") ?? BsJLSOLM.defaultObjs;
    static searchQueryObjs = BsJLS.get("BsJLSOLM-searchQueryObjs") ?? BsJLSOLM.defaultSearchQueryObjs;



    static defaultObjs = {
        auth: {
            currentAccount: { dateRefreshed: null, lifespan: 1440, shouldForceReadDb: false },
            accounts: { dateRefreshed: null, lifespan: 1440, shouldForceReadDb: false },
        },
        products: {
            brands: { dateRefreshed: null, lifespan: 10080, shouldForceReadDb: false },
            categories: { dateRefreshed: null, lifespan: 10080, shouldForceReadDb: false },
            teams: { dateRefreshed: null, lifespan: 10080, shouldForceReadDb: false }
        },
        checkout: {},
        cart: {},
        profile: {
            personalData: { dateRefreshed: null, lifespan: 1440, shouldForceReadDb: false },
            stripePaymentInfos: { dateRefreshed: null, lifespan: 1440, shouldForceReadDb: false },
            addresses: { dateRefreshed: null, lifespan: 1440, shouldForceReadDb: false },
        },
        temporaryAlerts: {
            alerts: { dateRefreshed: null, lifespan: 10, shouldForceReadDb: false },
        },
    };

    static defaultSearchQueryObjs = {
        'query=exampleSearchQuery&isCool=true': { dateRefreshed: null, lifespan: 120, shouldForceReadDb: false },
        'teamId=8&categoryId=2': { dateRefreshed: null, lifespan: 120, shouldForceReadDb: false },
    };



    static init() {

        if (!BsJLS.isSet('BsJLSOLM-objs')) {
            BsJLS.set("BsJLSOLM-objs", BsJLSOLM.defaultObjs);
            BsJLSOLM.objs = BsJLSOLM.defaultObjs;
        }

        if (!BsJLS.isSet('BsJLSOLM-searchQueryObjs')) {
            BsJLS.set("BsJLSOLM-searchQueryObjs", BsJLSOLM.defaultSearchQueryObjs);
            BsJLSOLM.searchQueryObjs = BsJLSOLM.defaultSearchQueryObjs;
        }
        
    }


     
    /**
     * @deprecated
     * TODO:DELETE
     */
    static getDefaultObjs() {

        const reducerNames = {
            products: ["brands", "categories"],
            checkout: ["addresses", "paymentInfos", "efficientShipmentRates"],
            cart: ["cart"],
            profile: ["paymentInfos", "orders"]
        };

        let defaultObjs = {};

        for (const reducerName in reducerNames) {
            const reducerPropNames = reducerNames[reducerName];

            let actualNewReducer = {};

            reducerPropNames.forEach(reducerPropName => {

                actualNewReducer[reducerPropName] = {dateRefreshed: null, lifespan: 3600};

            });

            defaultObjs[reducerName] = actualNewReducer;
        }
    }



    static updateRefreshDateForSearchQuery(q, lifespanInMin = BsJLSOLM.SEARCH_QUERY_LIFESPAN) {
        if (!q) { return; }

        const updatedSearchQueryObjs = BsJLSOLM.searchQueryObjs;
        const updatedSearchQueryObj = {};

        const dateTimeNow = Date.now();
        const dateTimeNowObj = new Date();

        updatedSearchQueryObj.dateRefreshed = dateTimeNow;
        // updatedSearchQueryObj.readableDateRefreshed = dateTimeNowObj.getHours() + ":" + dateTimeNowObj.getMinutes() + ":" + dateTimeNowObj.getSeconds();
        updatedSearchQueryObj.readableDateRefreshed = (dateTimeNowObj.getMonth()+1) + "/" + (dateTimeNowObj.getDate()) + "/" + (dateTimeNowObj.getFullYear()) + " " + dateTimeNowObj.getHours() + ":" + dateTimeNowObj.getMinutes() + ":" + dateTimeNowObj.getSeconds();
        updatedSearchQueryObj.shouldForceReadDb = false;
        updatedSearchQueryObj.lifespan = lifespanInMin;

        updatedSearchQueryObjs[q] = updatedSearchQueryObj;

        
        BsJLS.set("BsJLSOLM-searchQueryObjs", updatedSearchQueryObjs);
    }


    static updateRefreshDate(objPath) {
        if (!objPath || objPath.length === 0) { return; }

        const objPathArr = objPath.split(".");

        let currentTraversedObj = BsJLSOLM.objs;
        objPathArr.forEach(key => {
            if (!currentTraversedObj[key]) {
                currentTraversedObj[key] = {};
            }
            currentTraversedObj = currentTraversedObj[key];
        });

        const dateTimeNow = Date.now();
        const dateTimeNowObj = new Date();
        currentTraversedObj.dateRefreshed = dateTimeNow;
        currentTraversedObj.readableDateRefreshed = (dateTimeNowObj.getMonth()+1) + "/" + (dateTimeNowObj.getDate()) + "/" + (dateTimeNowObj.getFullYear()) + " " + dateTimeNowObj.getHours() + ":" + dateTimeNowObj.getMinutes() + ":" + dateTimeNowObj.getSeconds();
        currentTraversedObj.shouldForceReadDb = false;

        BsJLS.set("BsJLSOLM-objs", BsJLSOLM.objs);
    }



    static shouldObjWithPathRefresh(path) {
        if (!path || path.length === 0) { return false; }
        if (!BsJLS.isSet(path)) { return true; }
        //

        const objPathArr = path.split(".");

        let currentTraversedObj = BsJLSOLM.objs;
        objPathArr.forEach(key => {
            if (!currentTraversedObj[key]) {
                currentTraversedObj[key] = {};
            }
            currentTraversedObj = currentTraversedObj[key];
        });

        if (currentTraversedObj.shouldForceReadDb) { return true; }
        if (!currentTraversedObj.dateRefreshed) { return true; }

        const nowInMilliSec = Date.now();
        const lifespanInMilliSec = currentTraversedObj.lifespan * 60 * 1000;
        const elapsedTime = nowInMilliSec - currentTraversedObj.dateRefreshed;

        if (elapsedTime > lifespanInMilliSec) { return true; }
    }



    static shouldObjRefresh(obj) {
        if (!obj) { return true; }
        if (!obj.dateRefreshed) { return true; }
        if (obj.shouldForceReadDb) { return true; }
        
        const msNow = Date.now();
        const objLifespan = obj.lifespan * 60 * 1000;
        const elapsedTime = msNow - obj.dateRefreshed;

        if (elapsedTime > objLifespan) { return true; }

        return false;
    }
}