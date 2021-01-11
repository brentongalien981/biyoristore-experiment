import Bs from "../bs-library/helpers/Bs";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import BsJLS from "../bs-library/helpers/BsJLS";
import BsCore2 from "../bs-library/helpers/BsCore2";

export const READ_PRODUCTS = "READ_PRODUCTS";
export const ON_BRAND_FILTER_CHANGED = "ON_BRAND_FILTER_CHANGED";
export const ON_CATEGORY_FILTER_CHANGED = "ON_CATEGORY_FILTER_CHANGED";
export const ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER = "ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER";
export const ON_PRODUCT_LIKED = "ON_PRODUCT_LIKED";

export const ON_READ_FILTERS_OK = "ON_READ_FILTERS_OK";
export const AJAX_READ_PRODUCTS = "AJAX_READ_PRODUCTS";




export const onProductClickedViaListingReducer = (e, props, product) => {
    return { type: ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER, e: e, props: props, product: product };
};

export const onProductLiked = (event) => ({
    type: ON_PRODUCT_LIKED,
    event: event
});


export const ajaxReadProducts = (objs, paginationData) => ({
    type: AJAX_READ_PRODUCTS,
    objs: objs,
    paginationData: paginationData
});



export const onReadFiltersOk = (objs) => ({ type: ON_READ_FILTERS_OK, objs: objs });



export const onCategoryFilterChanged = (categoryFilterEventData) => {
    return { type: ON_CATEGORY_FILTER_CHANGED, categoryFilterEventData: categoryFilterEventData };
};

export const onBrandFilterChanged = (brandFilterEventData) => {
    return { type: ON_BRAND_FILTER_CHANGED, brandFilterEventData: brandFilterEventData };
};



export const readProducts = (params) => {

    // TODO: Use BsJLSOLM.



    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/listing/read-products',
            params: { ...params },
            callBackFunc: (requestData, json) => {
                //ish
                // dispatch(ajaxReadProducts(json.objs, json.paginationData));
            }
        });
    };
};



export const readFilters = () => {

    // Check if relevant BsJLSOLM objects still have relatively fresh values.
    if (!BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.brands)
        && !BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.categories)) {

        const objs = {
            brands: BsJLS.get("products.brands") ?? [],
            categories: BsJLS.get("products.categories") ?? [],
            retrievedDataFrom: "localStorage"
        };

        Bs.log("objs ==> ...");
        Bs.log(objs);
        return onReadFiltersOk(objs);
    }


    // If the obj values are old, refresh.
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
};