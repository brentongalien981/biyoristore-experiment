import * as actions from '../actions/join';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';

/** */
const initialState = {
    message: "This is the initial state of STORE: join.",
    credentials: {
        signIn: { email: BsAppSession.get("email"), password: "" },
        createAccount: { email: BsAppSession.get("email"), password: "", repeatedPassword: "" },
    }
};



/* REDUCER */
const join = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_CREATE_ACCOUNT_SUCCESS: return onCreateAccountSuccess(state, action);
        case actions.ON_CREATE_ACCOUNT_FAIL: return onCreateAccountFail(state, action);
        default: return state;
    }
}



/* NORMAL */
const onCreateAccountFail = (state, action) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onCreateAccountFail()");

    alert("onCreateAccountFail");

    return {
        ...state,
        message: "Just executed METHOD: onCreateAccountFail() from REDUCER: join"
    };
};

const onCreateAccountSuccess = (state, action) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onCreateAccountSuccess()");

    return {
        ...state,
        message: "Just executed METHOD: onCreateAccountSuccess() from REDUCER: join"
    };
};



export default join;