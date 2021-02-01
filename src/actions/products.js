import Bs from "../bs-library/helpers/Bs";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import BsJLS from "../bs-library/helpers/BsJLS";
import BsCore2 from "../bs-library/helpers/BsCore2";

export const READ_PRODUCTS = "READ_PRODUCTS";
export const ON_BRAND_FILTER_CHANGED = "ON_BRAND_FILTER_CHANGED";
export const ON_CATEGORY_FILTER_CHANGED = "ON_CATEGORY_FILTER_CHANGED";
export const ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER = "ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER";
export const ON_PRODUCT_LIKED = "ON_PRODUCT_LIKED";
export const END_REFRESH_PRODUCTS_PROCESS = "END_REFRESH_PRODUCTS_PROCESS";
export const END_READ_FILTERS_PROCESS = "END_READ_FILTERS_PROCESS";
export const ON_URL_CHANGED = "ON_URL_CHANGED";
export const ON_READ_PRODUCTS_FAIL = "ON_READ_PRODUCTS_FAIL";
export const ON_READ_PRODUCTS_OK = "ON_READ_PRODUCTS_OK";
export const ON_READ_FILTERS_OK = "ON_READ_FILTERS_OK";



export const onProductLiked = (event) => ({
    type: ON_PRODUCT_LIKED,
    event: event
});
export const endRefreshProductsProcess = () => ({ type: END_REFRESH_PRODUCTS_PROCESS });
export const endReadFiltersProcess = () => ({ type: END_READ_FILTERS_PROCESS });
export const onUrlChanged = () => ({ type: ON_URL_CHANGED });

export const onReadProductsFail = () => ({ type: ON_READ_PRODUCTS_FAIL });
export const onReadProductsOk = (objs) => ({ type: ON_READ_PRODUCTS_OK, objs: objs });
export const onReadFiltersOk = (objs) => ({ type: ON_READ_FILTERS_OK, objs: objs });
export const onBrandFilterChanged = (brandFilterEventData) => {
    return { type: ON_BRAND_FILTER_CHANGED, brandFilterEventData: brandFilterEventData };
};



export const readProducts = (params) => {

    if (BsJLSOLM.shouldObjRefresh(BsJLSOLM.searchQueryObjs[params.completeUrlQuery])) {

        return (dispatch) => {

            BsCore2.ajaxCrud({
                url: '/listing/read-products',
                params: { ...params },
                callBackFunc: (requestData, json) => {

                    BsJLSOLM.updateRefreshDateForSearchQuery(params.completeUrlQuery);

                    const objs = { ...params, ...json.objs }
                    dispatch(onReadProductsOk(objs));
                },
                errorCallBackFunc: (errors) => { dispatch(onReadProductsFail()); }
            });
        };
    }


    return onReadProductsOk({ retrievedDataFrom: "localStorage", ...params });
};



export const readFilters = () => {

    if (BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.brands)
        || BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.categories)
        || BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.teams)) {

        return (dispatch) => {
            BsCore2.ajaxCrud({
                url: '/listing/read-filters',
                callBackFunc: (requestData, json) => {

                    BsJLSOLM.updateRefreshDate("products.brands");
                    BsJLSOLM.updateRefreshDate("products.categories");
                    BsJLSOLM.updateRefreshDate("products.teams");

                    dispatch(onReadFiltersOk(json.objs));
                }
            });
        };
    }


    return onReadFiltersOk({ retrievedDataFrom: "localStorage" });

};