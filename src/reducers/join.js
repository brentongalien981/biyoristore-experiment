import * as actions from '../actions/join';
import Bs from '../bs-library/helpers/Bs';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore2 from '../bs-library/helpers/BsCore2';

/** */
const initialState = {
    message: "This is the initial state of STORE: join.",
    credentials: {
        signIn: { email: BsAppLocalStorage.get("email"), password: "" },
        createAccount: { email: BsAppLocalStorage.get("email"), password: "", repeatedPassword: "" },
    },
    isThereJoinError: false,
    errorMsg: "",
    shouldRedirectHome: false
};



/* REDUCER */
const join = (state = initialState, action) => {
    switch (action.type) {
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



const resetErrors = (state, action) => {

    return {
        ...state,
        isThereJoinError: false
    };
};

const onCreateAccountFail = (state, action) => {

    action.objs.doPostProcessCallBack();
    BsCore2.alertForGeneralErrors(action.objs.errors);

    return {
        ...state,
    };
};

const onCreateAccountSuccess = (state, action) => {

    // Bs.log("\n###############");
    // Bs.log("In REDUCER: join, METHOD: onCreateAccountSuccess()");


    // BsAppSession.set("userId", action.json.userId);
    // BsAppSession.set("email", action.json.email);
    // BsAppSession.set("apiToken", action.json.apiToken);
    // BsAppSession.set("isLoggedIn", 1);

    action.returndData.doPostProcessCallBack();

    if (action.returndData.isResultOk) {
        alert("hell yeah!");
    } else {
        BsCore2.alertForGeneralError();
    }



    return {
        ...state,
        // isThereJoinError: false,
        // shouldRedirectHome: true,
        // message: "Just executed METHOD: onCreateAccountSuccess() from REDUCER: join"
    };
};



export default join;