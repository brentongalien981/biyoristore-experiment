import * as actions from '../actions/join';
import Bs from '../bs-library/helpers/Bs';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore2 from '../bs-library/helpers/BsCore2';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** */
const initialState = {
    message: "This is the initial state of STORE: join.",
    credentials: {
        signIn: { email: BsAppLocalStorage.get("email"), password: "" },
        createAccount: { email: BsAppLocalStorage.get("email"), password: "", repeatedPassword: "" },
    },
    isThereJoinError: false,
    errorMsg: "",
    shouldRedirectHome: false,
    // FLAGS
    shouldDoOnRegisterProcessFinalization: false,
};



/* REDUCER */
const join = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_LOGIN_SUCCESS: return onLoginSuccess(state, action);
        case actions.ON_LOGIN_FAIL: return onLoginFail(state, action);
        case actions.RESET_FLAGS: return resetFlags(state, action);
        case actions.ON_REDIRECT_HOME_SUCCESS: return onRedirectHomeSuccess(state, action);
        case actions.RESET_ERRORS: return resetErrors(state, action);
        case actions.ON_CREATE_ACCOUNT_SUCCESS: return onCreateAccountSuccess(state, action);
        case actions.ON_CREATE_ACCOUNT_FAIL: return onCreateAccountFail(state, action);
        default: return state;
    }
}



/* NORMAL */
const onRedirectHomeSuccess = (state, action) => {

    return {
        ...state,
        shouldRedirectHome: false
    };
};



const resetFlags = (state, action) => {

    return {
        ...state,
        shouldDoOnRegisterProcessFinalization: false,
    };
};



const resetErrors = (state, action) => {

    return {
        ...state,
        isThereJoinError: false
    };
};

const onCreateAccountFail = (state, action) => {

    action.objs.doPostProcessCallBack();
    if (action.objs?.doOnReturnFailCallBack?.()) {}
    BsCore2.alertForGeneralErrors(action.objs?.errors);

    return {
        ...state,
    };
};
//ish

const onCreateAccountSuccess = (state, action) => {

    action.returnData.doPostProcessCallBack();
    let shouldDoOnRegisterProcessFinalization = false;


    if (action.returnData.isResultOk) {

        const currentAuthUserData = {
            email: action.returnData.objs.email,
            bmdToken: action.returnData.objs.bmdToken,
            authProviderId: action.returnData.objs.authProviderId,
            expiresIn: action.returnData.objs.expiresIn,
            isKeptLoggedIn: false,
        };

        BsJLS.set('auth.currentAccount', currentAuthUserData);
        BsAppLocalStorage.set('isLoggedIn', 1);
        BsAppLocalStorage.set('email', currentAuthUserData.email);


        BsJLSOLM.updateRefreshDate('auth.currentAccount');

        shouldDoOnRegisterProcessFinalization = true;

    } else {
        if (action.returnData?.doOnReturnFailCallBack?.()) {}
        BsCore2.alertForGeneralError();
        
    }



    return {
        ...state,
        shouldDoOnRegisterProcessFinalization: shouldDoOnRegisterProcessFinalization,
    };
};


//ish
const onLoginFail = (state, action) => {

    const isProcessSuccessful = false;
    action.callBackData.doPostProcessCallBack(isProcessSuccessful);
    BsCore2.alertForGeneralErrors(action.callBackData.errors);

    return {
        ...state,
    };
};



const onLoginSuccess = (state, action) => {

    const isProcessSuccessful = action.callBackData.isResultOk ? true : false;

    action.callBackData.doPostProcessCallBack(isProcessSuccessful);

    return {
        ...state,
    };
};



export default join;