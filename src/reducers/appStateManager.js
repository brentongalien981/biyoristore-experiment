import * as actions from '../actions/appStateManager';
import BmdAuth from '../bs-library/core/BmdAuth';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** DEFAULTS */



/** INITIAL STATE */
const initialState = {
    //
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

    updatePseudoSession(action.callBackData);

    return {
        ...state,
    };
};



const onCheckBmdAuthValidityFail = (state, action) => {

    updatePseudoSession(action.callBackData);

    return {
        ...state,
    };
};



/** HELPER-FUNCS */
const updatePseudoSession = (callBackData) => {
    if (!callBackData.isResultOk) {
        BmdAuth.clearAuth();

        const reactRouterHistory = callBackData.reactRouterHistory;

        if (!BmdAuth.isAuthorizedForWebPage(reactRouterHistory.location.pathname)) {
            alert('You\'re session ended.');
            reactRouterHistory.replace('/');
        }
    }
};



export default appStateManager;