import * as actions from '../actions/join';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';

/** */
const initialState = {
    message: "This is the initial state of STORE: join.",
    credentials: {
        signIn: { email: BsAppSession.get("email"), password: "" },
        createAccount: { email: BsAppSession.get("email"), password: "", repeatedPassword: "" },
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

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onCreateAccountFail()");
    Bs.log("action.errors ==> ...");
    Bs.log(action.errors);

    let errorMsg = "";

    for (const field in action.errors) {
        if (action.errors.hasOwnProperty(field)) {
            const fieldErrors = action.errors[field];

            errorMsg += fieldErrors[0] + "\n";
            
        }
    }

    // alert(errorMsg);

    return {
        ...state,
        isThereJoinError: true,
        errorMsg: errorMsg,
        message: "Just executed METHOD: onCreateAccountFail() from REDUCER: join"
    };
};

const onCreateAccountSuccess = (state, action) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onCreateAccountSuccess()");


    BsAppSession.set("userId", action.json.userId);
    BsAppSession.set("email", action.json.email);
    BsAppSession.set("apiToken", action.json.apiToken);
    BsAppSession.set("isLoggedIn", 1);

    return {
        ...state,
        isThereJoinError: false,
        shouldRedirectHome: true,
        message: "Just executed METHOD: onCreateAccountSuccess() from REDUCER: join"
    };
};



export default join;