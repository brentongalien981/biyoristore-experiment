import BsJLS from "./BsJLS";

/**
 * JLSOLM stands for JsonifiedLocalStorage-Object-LifespanManager
 * var dateRefreshed: milliseconds after 1970
 * var lifespan: lifespan in min
 * 
 * NOTE: Everytime you update a valuo of BsJLSOLM, call BsJLS.set("BsJLSOLM-objs") or BsJLS.set("BsJLSOLM-searchQueries")
 */
export default class BsJLSOLM {

    static defaultObjs = {
        products: {
            brands: { dateRefreshed: null, lifespan: 10080, shouldForceReadDb: false },
            categories: { dateRefreshed: null, lifespan: 10080, shouldForceReadDb: false },
            teams: { dateRefreshed: null, lifespan: 10080, shouldForceReadDb: false }
        },
        checkout: {},
        cart: {},
        profile: {}
    };

    static defaultSearchQueryObjs = {
        'query=exampleSearchQuery&isCool=true': { dateRefreshed: null, lifespan: 120, shouldForceReadDb: false },
        'teamId=8&categoryId=2': { dateRefreshed: null, lifespan: 120, shouldForceReadDb: false },
    };

    static SEARCH_QUERY_LIFESPAN = 120;


    static objs = BsJLS.get("BsJLSOLM-objs") ?? BsJLSOLM.defaultObjs;
    static searchQueryObjs = BsJLS.get("BsJLSOLM-searchQueryObjs") ?? BsJLSOLM.defaultSearchQueryObjs;

     

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



    static updateRefreshDateForSearchQuery(q) {
        if (!q) { return; }

        const updatedSearchQueryObjs = BsJLSOLM.searchQueryObjs;
        const updatedSearchQueryObj = {};

        const dateTimeNow = Date.now();
        const dateTimeNowObj = new Date();

        updatedSearchQueryObj.dateRefreshed = dateTimeNow;
        // updatedSearchQueryObj.readableDateRefreshed = dateTimeNowObj.getHours() + ":" + dateTimeNowObj.getMinutes() + ":" + dateTimeNowObj.getSeconds();
        updatedSearchQueryObj.readableDateRefreshed = (dateTimeNowObj.getMonth()+1) + "/" + (dateTimeNowObj.getDate()) + "/" + (dateTimeNowObj.getFullYear()) + " " + dateTimeNowObj.getHours() + ":" + dateTimeNowObj.getMinutes() + ":" + dateTimeNowObj.getSeconds();
        updatedSearchQueryObj.shouldForceReadDb = false;
        updatedSearchQueryObj.lifespan = BsJLSOLM.SEARCH_QUERY_LIFESPAN;

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