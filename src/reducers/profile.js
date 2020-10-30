import * as actions from '../actions/profile';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';

/** */
const initialState = {
    profile: {
    },
    //ish
    shouldDoPostSavePayment: false,
    wasPaymentFormCrudOk: false,

    paymentInfos: [
        { id: 1, type: "Visa", cardNumber: "1234123412341234", expirationMonth: "08", expirationYear: "2024" },
        { id: 2, type: "Mastercard", cardNumber: "0987098709870987", expirationMonth: "01", expirationYear: "2022" },
    ],
    addresses: [
        { id: 1, street: "78 Monkhouse Rd", city: "Markham", province: "ON", country: "Canada", postalCode: "L6E 1V5" },
    ],
    shouldDisplayProfile: false,
    // shouldResetPaymentForm: false,
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_ADDRESS_DELETE_FAIL: return onAddressDeleteFail(state, action);
        case actions.ON_ADDRESS_DELETE_SUCCESS: return onAddressDeleteSuccess(state, action);
        case actions.ON_ADDRESS_FORM_RESET_SUCCESS: return onAddressFormResetSuccess(state, action);
        case actions.ON_SAVE_ADDRESS_FAIL: return onSaveAddressFail(state, action);
        case actions.ON_SAVE_ADDRESS_SUCCESS: return onSaveAddressSuccess(state, action);
        // case actions.ON_PAYMENT_FORM_RESET_SUCCESS: return onPaymentFormResetSuccess(state, action);
        case actions.ON_SAVE_PAYMENT_SUCCESS: return onSavePaymentSuccess(state, action);
        case actions.ON_SAVE_PAYMENT_FAIL: return onSavePaymentFail(state, action);

        case actions.DO_POST_SAVE_PAYMENT_FINALIZATION: return doPostSavePaymentFinalization(state, action);

        case actions.ON_SAVE_PROFILE_FAIL: return onSaveProfileFail(state, action);
        case actions.ON_SAVE_PROFILE_SUCCESS: return onSaveProfileSuccess(state, action);
        case actions.ON_PROFILE_DISPLAYED_SUCCESS: return onProfileDisplayedSuccess(state, action);
        case actions.SET_PROFILE: return setProfile(state, action);
        default: return state;
    }
}



/* NORMAL */
const onAddressDeleteFail = (state, action) => {
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

const onAddressDeleteSuccess = (state, action) => {
    alert("Address deleted");

    let updatedAddresses = state.addresses;

    let i = 0;
    for (; i < updatedAddresses.length; i++) {
        const a = updatedAddresses[i];

        if (a.id == action.addressId) {
            break;
        }

    }

    updatedAddresses.splice(i, 1);

    return {
        ...state,
        addresses: [...updatedAddresses]
    };
};

const onAddressFormResetSuccess = (state, action) => {
    return {
        ...state,
        shouldResetAddressForm: false
    };
};

const onSaveAddressFail = (state, action) => {
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

const onSaveAddressSuccess = (state, action) => {

    document.querySelector("#closeAddressFormBtn").click();
    alert("Address saved...");


    let updatedAddresses = state.addresses;

    if (action.addressFormCrudMethod == "create") {
        return {
            ...state,
            addresses: [...updatedAddresses, action.address],
            shouldResetAddressForm: true
        };
    }
    else {

        let i = 0;
        for (; i < updatedAddresses.length; i++) {
            const a = updatedAddresses[i];

            if (a.id == action.address.id) { break; }

        }

        updatedAddresses[i] = action.address;

        return {
            ...state,
            addresses: [...updatedAddresses],
            shouldResetAddressForm: true
        };
    }
};

// const onPaymentFormResetSuccess = (state, action) => {
//     return {
//         ...state,
//         shouldResetPaymentForm: false
//     };
// };



const onSavePaymentSuccess = (state, action) => {

    document.querySelector("#closePaymentFormBtn").click();

    alert("TODO: Payment saved... Re-implement this after re-working the payment@read.");

    // TODO: Delete this.
    //ish
    return { 
        ...state,
        shouldDoPostSavePayment: true,
        wasPaymentFormCrudOk: true 
    };


    // TODO: Re-implement this.
    // let updatedPaymentInfos = state.paymentInfos;

    // if (action.paymentForCrudMethod == "create") {
    //     return {
    //         ...state,
    //         paymentInfos: [...updatedPaymentInfos, action.newPayment],
    //         shouldResetPaymentForm: true
    //     };
    // } 
    // else {

    //     let i = 0;
    //     for (; i < updatedPaymentInfos.length; i++) {
    //         const p = updatedPaymentInfos[i];

    //         if (p.id == action.newPayment.id) { break; }

    //     }

    //     updatedPaymentInfos[i] = action.newPayment;

    //     return {
    //         ...state,
    //         paymentInfos: [...updatedPaymentInfos],
    //         shouldResetPaymentForm: true
    //     };
    // }


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
        shouldDoPostSavePayment: true,
        wasPaymentFormCrudOk: false
    };
};



const doPostSavePaymentFinalization = (state, action) => {
    return {
        ...state,
        shouldDoPostSavePayment: false
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