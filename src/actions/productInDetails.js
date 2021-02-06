import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const RESET_PRODUCT = "RESET_PRODUCT";
export const SHOW_RELATED_PRODUCTS = "SHOW_RELATED_PRODUCTS";
export const RELAUNCH_VENDOR_SCRIPT = "RELAUNCH_VENDOR_SCRIPT";
export const SHOW_PRODUCT = "SHOW_PRODUCT";



/* FUNCS */
export const resetProduct = () => ({ type: RESET_PRODUCT });

export const showRelatedProducts = (objs) => ({
    type: SHOW_RELATED_PRODUCTS,
    objs: objs
});

export const relaunchVendorScript = () => ({
    type: RELAUNCH_VENDOR_SCRIPT
});

export const showProduct = (objs) => ({
    type: SHOW_PRODUCT,
    objs: objs
});



/* AJAX FUNCS */
export const readRelatedProducts = (productId) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products/relatedProducts',
            params: { productId: productId },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/productInDetails.js, METHOD: readRelatedProducts() => ajaxCrud() => callBackFunc()");

                dispatch(showRelatedProducts(json.objs));
            }
        });
    };
};

export const readProduct = (productId) => {
    //ish
    const requestUrlQ = '?productId=' + productId;
    if (BsJLSOLM.shouldObjRefresh(BsJLSOLM.searchQueryObjs[requestUrlQ])) {
        return (dispatch) => {

            BsCore2.ajaxCrud({
                url: '/products/show',
                params: {
                    productId: productId,
                    requestUrlQ: requestUrlQ
                },
                callBackFunc: (requestData, json) => {

                    BsJLSOLM.updateRefreshDateForSearchQuery(requestUrlQ);
                    const objs = { ...json.objs, requestUrlQ: requestUrlQ };

                    dispatch(showProduct(objs));
                }
            });
        };
    }

    const objs = { retrievedDataFrom: "localStorage", requestUrlQ: requestUrlQ };
    return showProduct(objs);
};