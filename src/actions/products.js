import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import BsJLS from "../bs-library/helpers/BsJLS";

export const READ_PRODUCTS = "READ_PRODUCTS";
export const READ_BRANDS = "READ_BRANDS";
export const ON_BRAND_FILTER_CHANGED = "ON_BRAND_FILTER_CHANGED";
export const ON_CATEGORY_FILTER_CHANGED = "ON_CATEGORY_FILTER_CHANGED";
export const ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER = "ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER";
export const ON_PRODUCT_LIKED = "ON_PRODUCT_LIKED";

export const DISPLAY_CATEGORIES = "DISPLAY_CATEGORIES";
export const ON_READ_FILTERS_OK = "ON_READ_FILTERS_OK";
export const AJAX_READ_BRANDS = "AJAX_READ_BRANDS";
export const AJAX_READ_PRODUCTS = "AJAX_READ_PRODUCTS";




export const onProductClickedViaListingReducer = (e, props, product) => {
    return { type: ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER, e: e, props: props, product: product };
};

export const onProductLiked = (event) => ({
    type: ON_PRODUCT_LIKED,
    event: event
});

export const displayCategories = (objs) => ({
    type: DISPLAY_CATEGORIES,
    objs: objs
});

export const ajaxReadProducts = (objs, paginationData) => ({
    type: AJAX_READ_PRODUCTS,
    objs: objs,
    paginationData: paginationData
});

export const ajaxReadBrands = (objs) => ({
    type: AJAX_READ_BRANDS,
    objs: objs
});

export const onReadFiltersOk = (objs) => ({ type: ON_READ_FILTERS_OK, objs: objs });



export const readCategories = () => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/categories',
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/products.js, METHOD: readCategories() => ajaxCrud() => callBackFunc()");

                dispatch(displayCategories(json.objs));
            }
        });
    };
};

export const onCategoryFilterChanged = (categoryFilterEventData) => {
    return { type: ON_CATEGORY_FILTER_CHANGED, categoryFilterEventData: categoryFilterEventData };
};

export const onBrandFilterChanged = (brandFilterEventData) => {
    return { type: ON_BRAND_FILTER_CHANGED, brandFilterEventData: brandFilterEventData };
};

export const readProducts = (params) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products',
            neededResponseParams: ["paginationData"],
            params: { ...params },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/products.js, METHOD: readProducts() => ajaxCrud() => callBackFunc()");
                Bs.log("\nJSON.ERRORS ==> ...");
                Bs.log(json.errors);
                Bs.log(json.objs);

                dispatch(ajaxReadProducts(json.objs, json.paginationData));
            }
        });
    };
};

export const readBrands = () => {
    return (dispatch) => {
        BsCore.ajaxCrud({
            url: '/brands',
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/products.js, METHOD: readBrands() => ajaxCrud() => callBackFunc()");
                Bs.log("\njson.objs ==> ...");
                Bs.log(json.objs);

                dispatch(ajaxReadBrands(json.objs));
            }
        });
    };
};



export const readFilters = () => {

    // Check if relevant BsJLSOLM objects still have relatively fresh values.
    if (!BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.brands)
        || !BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.products.categories)) {

        const objs = {
            brands: BsJLS.get("products.brands"),
            categories: BsJLS.get("products.categories"),
            retrievedDataFrom: "localStorage"
        };

        Bs.log("objs ==> ...");
        Bs.log(objs);
        return onReadFiltersOk(objs);
    }


    // If the obj values are old, refresh.
    return (dispatch) => {
        BsCore.ajaxCrud({
            url: '/listing/read-filters',
            callBackFunc: (requestData, json) => {
                BsJLSOLM.updateRefreshDate("products.brands");
                BsJLSOLM.updateRefreshDate("products.categories");

                dispatch(onReadFiltersOk(json.objs));
            }
        });
    };
};