import * as actions from '../actions/profile';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';

/** */
const initialState = {
    profile: {
    },
    paymentInfos: [
        { id: 1, type: "Visa", cardNumber: "1234123412341234", expirationMonth: "08", expirationYear: "2024" },
        { id: 2, type: "Mastercard", cardNumber: "0987098709870987", expirationMonth: "01", expirationYear: "2022" },
    ],
    shouldDisplayProfile: false
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_SAVE_PROFILE_FAIL: return onSaveProfileFail(state, action);
        case actions.ON_SAVE_PROFILE_SUCCESS: return onSaveProfileSuccess(state, action);
        case actions.ON_PROFILE_DISPLAYED_SUCCESS: return onProfileDisplayedSuccess(state, action);
        case actions.SET_PROFILE: return setProfile(state, action);
        default: return state;
    }
}



/* NORMAL */
const onSaveProfileFail = (state, action) => {
    let errorMsg = "";

    for (const field in action.errors) {
        if (action.errors.hasOwnProperty(field)) {
            const fieldErrors = action.errors[field];

            errorMsg += fieldErrors[0] + "\n";

        }
    }

    if (errorMsg.length > 0) { alert(errorMsg); }
    else { alert("Oops, there's an error on our end. Please try again."); }

    return {
        ...state,
    };
};

const onSaveProfileSuccess = (state, action) => {

    BsAppSession.set("email", action.profile.email);
    alert("Profile saved...");

    return {
        ...state,
    };
};

const onProfileDisplayedSuccess = (state, action) => {
    return {
        ...state,
        shouldDisplayProfile: false
    };
};

const setProfile = (state, action) => {
    return {
        ...state,
        profile: action.profile,
        paymentInfos: action.paymentInfos,
        shouldDisplayProfile: true
    };
};



export default profile;