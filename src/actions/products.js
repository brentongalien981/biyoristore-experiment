import Bs from "../bs-library/helpers/Bs";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import BsJLS from "../bs-library/helpers/BsJLS";
import BsCore2 from "../bs-library/helpers/BsCore2";

export const READ_PRODUCTS = "READ_PRODUCTS";
export const ON_BRAND_FILTER_CHANGED = "ON_BRAND_FILTER_CHANGED";
export const ON_CATEGORY_FILTER_CHANGED = "ON_CATEGORY_FILTER_CHANGED";
export const ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER = "ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER";
export const ON_PRODUCT_LIKED = "ON_PRODUCT_LIKED";

export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const ON_READ_PRODUCTS_OK = "ON_READ_PRODUCTS_OK";
export const ON_READ_FILTERS_OK = "ON_READ_FILTERS_OK";




export const onProductClickedViaListingReducer = (e, props, product) => {
    return { type: ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER, e: e, props: props, product: product };
};

export const onProductLiked = (event) => ({
    type: ON_PRODUCT_LIKED,
    event: event
});


export const setSelectedCategory = (categoryFilterIndex) => ({ type: SET_SELECTED_CATEGORY, categoryFilterIndex: categoryFilterIndex });
export const onReadProductsOk = (objs) => ({ type: ON_READ_PRODUCTS_OK, objs: objs });
export const onReadFiltersOk = (objs) => ({ type: ON_READ_FILTERS_OK, objs: objs });


//ish
export const onCategoryFilterChanged = (categoryFilterEventData) => {
    return { type: ON_CATEGORY_FILTER_CHANGED, categoryFilterEventData: categoryFilterEventData };
};

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

                    const objs = { ...json.objs, completeUrlQuery: params.completeUrlQuery }
                    dispatch(onReadProductsOk(objs));
                }
            });
        };
    }


    return onReadProductsOk({ retrievedDataFrom: "localStorage", completeUrlQuery: params.completeUrlQuery });
};



export const readFilters = () => {

    if (BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.brands)
        || BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.categories)) {

        return (dispatch) => {
            BsCore2.ajaxCrud({
                url: '/listing/read-filters',
                callBackFunc: (requestData, json) => {

                    BsJLSOLM.updateRefreshDate("products.brands");
                    BsJLSOLM.updateRefreshDate("products.categories");

                    dispatch(onReadFiltersOk(json.objs));
                }
            });
        };
    }


    return onReadFiltersOk({ retrievedDataFrom: "localStorage" });

};