import * as actions from '../actions/home';
import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from '../bs-library/constants/global';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** CONSTS */

/* INITIAL STATE */
const initialState = {
    featuredBrands: []
};



/* REDUCER */
const home = (state = initialState, action) => {
    switch (action.type) {        
        case actions.ON_READ_FEATURED_PRODUCTS_RETURN: return onReadFeaturedProductsReturn(state, action);
        default: return state;
    }
}



/* NORMAL */
const onReadFeaturedProductsReturn = (state, action) => {

    let featuredBrands = state.featuredBrands;

    if (action.callBackData.isResultOk) {
        featuredBrands = action.callBackData.objs.featuredBrands;
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        featuredBrands: featuredBrands
    };
};




export default home;