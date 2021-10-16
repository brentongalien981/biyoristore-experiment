import { ON_SEARCH_PRODUCTS_RETURN, PREPARE_TO_REFRESH_PRODUCTS, SET_SEARCH_PHRASE } from "../actions/search";
import { setMostEfficientSellerForProducts } from "./products";


/** CONSTS */

/* INITIAL STATE */
const initialState = {
    searchPhrase: '',
    searchedProducts: [],
    paginationData: {}
};



/* REDUCER */
const search = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_PHRASE: return setSearchPhrase(state, action);
        case ON_SEARCH_PRODUCTS_RETURN: return onSearchProductsReturn(state, action);
        default: return state;
    }
}



/* NORMAL */
const setSearchPhrase = (state, action) => {

    return {
        ...state,
        searchPhrase: action.data.searchPhrase
    };
};



const onSearchProductsReturn = (state, action) => {

    let products = state.searchedProducts;
    let paginationData = state.paginationData;

    if (action.callBackData.isResultOk) {
        products = setMostEfficientSellerForProducts(action.callBackData.objs.searchPageProducts?.products);
        paginationData = action.callBackData.objs.searchPageProducts?.paginationData ?? paginationData;
    }
    else {
        // BsCore2.tryAlertForBmdResultCodeErrors2(action.callBackData);
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        searchedProducts: products,
        paginationData: paginationData
    };
};




export default search;