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
    addresses: [
        { id: 1, street: "78 Monkhouse Rd", city: "Markham", province: "ON", country: "Canada", postalCode: "L6E 1V5" },
    ],
    shouldDisplayProfile: false,
    shouldResetPaymentForm: false,
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_PAYMENT_FORM_RESET_SUCCESS: return onPaymentFormResetSuccess(state, action);
        case actions.ON_SAVE_PAYMENT_SUCCESS: return onSavePaymentSuccess(state, action);
        case actions.ON_SAVE_PAYMENT_FAIL: return onSavePaymentFail(state, action);
        case actions.ON_SAVE_PROFILE_FAIL: return onSaveProfileFail(state, action);
        case actions.ON_SAVE_PROFILE_SUCCESS: return onSaveProfileSuccess(state, action);
        case actions.ON_PROFILE_DISPLAYED_SUCCESS: return onProfileDisplayedSuccess(state, action);
        case actions.SET_PROFILE: return setProfile(state, action);
        default: return state;
    }
}



/* NORMAL */
const onPaymentFormResetSuccess = (state, action) => {
    return {
        ...state,
        shouldResetPaymentForm: false
    };
};



const onSavePaymentSuccess = (state, action) => {

    //
    document.querySelector("#closePaymentFormBtn").click();

    alert("Payment saved...");
    

    let updatedPaymentInfos = state.paymentInfos;

    if (action.paymentForCrudMethod == "create") {
        return {
            ...state,
            paymentInfos: [...updatedPaymentInfos, action.newPayment],
            shouldResetPaymentForm: true
        };
    } 
    else {

        let i = 0;
        for (; i < updatedPaymentInfos.length; i++) {
            const p = updatedPaymentInfos[i];
            
            if (p.id == action.newPayment.id) { break; }

        }

        updatedPaymentInfos[i] = action.newPayment;

        return {
            ...state,
            paymentInfos: [...updatedPaymentInfos],
            shouldResetPaymentForm: true
        };
    }


};

const onSavePaymentFail = (state, action) => {
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
        addresses: action.addresses,
        shouldDisplayProfile: true
    };
};



export default profile;