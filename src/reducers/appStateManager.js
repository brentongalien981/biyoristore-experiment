import * as actions from '../actions/appStateManager';
import BmdAuth from '../bs-library/core/BmdAuth';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** DEFAULTS */



/** INITIAL STATE */
const initialState = {
    numOfOpenBmdTabs: 0,
};



/** REDUCER */
const appStateManager = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_CHECK_BMD_AUTH_VALIDITY_OK: return onCheckBmdAuthValidityOk(state, action);
        case actions.ON_CHECK_BMD_AUTH_VALIDITY_FAIL: return onCheckBmdAuthValidityFail(state, action);
        default: return state;
    }
}



/** NORMAL FUNCS */
const onCheckBmdAuthValidityOk = (state, action) => {

    if (!action.callBackData.isResultOk) {
        BmdAuth.clearAuth();
    }

    return {
        ...state,
    };
};



const onCheckBmdAuthValidityFail = (state, action) => {

    BmdAuth.clearAuth();

    return {
        ...state,
    };
};



export default appStateManager;