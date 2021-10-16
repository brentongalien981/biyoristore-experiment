import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const SET_SEARCH_PHRASE = "SET_SEARCH_PHRASE";
export const ON_SEARCH_PRODUCTS_RETURN = "ON_SEARCH_PRODUCTS_RETURN";



/* FUNCS */
export const setSearchPhrase = (data) => ({ type: SET_SEARCH_PHRASE, data: data });
export const onSearchProductsReturn = (callBackData) => ({ type: ON_SEARCH_PRODUCTS_RETURN, callBackData: callBackData });



/* AJAX FUNCS */
export const searchProducts = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/search',
            params: { ...data.params },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onSearchProductsReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode, isResultOk: false };
                dispatch(onSearchProductsReturn(callBackData));
            }
        });
    };
};