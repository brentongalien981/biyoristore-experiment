import BsJLS from "./BsJLS";

/**
 * JLSOLM stands for JsonifiedLocalStorage Object LifespanManager
 * var dateRefreshed: milliseconds after 1970
 * var lifespan: lifespan in sec
 * 
 * NOTE: Everytime you update a valuo of BsJLSOLM, call BsJLS.set("BsJLSOLM-objs") or BsJLS.set("BsJLSOLM-searchQueries")
 */
export default class BsJLSOLM {

    static defaultObjs = {
        products: {
            brands: { dateRefreshed: null, lifespan: 3600 },
            categories: { dateRefreshed: null, lifespan: 3600 }
        },
        checkout: {},
        cart: {},
        profile: {}
    };



    static objs = BsJLS.get("BsJLSOLM-objs") ?? BsJLSOLM.defaultObjs;



    static searchQueries = {
        'teamId=8&categoryId=2': {
            lifespan: 3600,
            products: [
                { productId: 1, name: "Durant Jersey" },
                { productId: 2, name: "LeBron Jersey" }
            ]
        },
    };


    static updateRefreshDate(objPath) {
        if (!objPath || objPath.length === 0) { return; }

        const objPathArr = objPath.split(".");

        let currentTraversedObj = BsJLSOLM.objs;
        objPathArr.forEach(key => {
            currentTraversedObj = currentTraversedObj[key];
        });

        currentTraversedObj.dateRefreshed = Date.now();

        BsJLS.set("BsJLSOLM-objs", BsJLSOLM.objs);
    }



    static shouldObjRefresh(obj) {
        if (!obj.dateRefreshed) { return true; }
        
        const msNow = Date.now();
        const objLifespan = obj.lifespan * 1000;
        const elapsedTime = msNow - obj.dateRefreshed;

        if (elapsedTime > objLifespan) { return true; }

        return false;
    }
}