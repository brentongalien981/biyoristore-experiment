import * as actions from '../actions/join';
import Bs from '../bs-library/helpers/Bs';

/** */
const initialState = {
    message: "This is the initial state of STORE: join.",
    credentials: {
        signIn: { email: "", password: "" },
        createAccount: { email: "", password: "", repeatedPassword: "" },
    }
};



/* REDUCER */
const join = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_REGISTER: return onRegister(state, action);
        case actions.ON_EMAIL_CHANGED_FOR_CREATE_ACCOUNT: return onEmailChangedForCreateAccount(state, action);
        default: return state;
    }
}



/* NORMAL */
const onEmailChangedForCreateAccount = (state, action) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onEmailChangedForCreateAccount()");

    return {
        ...state
    };
};

const onRegister = (state, action) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onRegister()");

    return {
        ...state,
        message: "Just executed METHOD: onRegister() from REDUCER: join"
    };
};



export default join;