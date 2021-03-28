import * as actions from '../actions/profile';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore2 from '../bs-library/helpers/BsCore2';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** */
const initialState = {
    profile: {
    },
    shouldDoPostSavePayment: false,
    wasPaymentFormCrudOk: false,

    paymentInfos: [],
    addresses: [
        { id: 1, street: "78 Monkhouse Rd", city: "Markham", province: "ON", country: "Canada", postalCode: "L6E 1V5" },
    ],
    orders: [],
    ordersMetaData: {},
    shouldDisplayProfile: false,
    selectedOrderPageNum: 1
    // shouldResetPaymentForm: false,
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {

        case actions.ON_SET_PROFILE_FAIL: return onSetProfileFail(state, action);

        case actions.ON_SAVE_ACCOUNT_RETURN: return onSaveAccountReturn(state, action);

        case actions.ON_READ_ORDERS_RETURN: return onReadOrdersReturn(state, action);
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
const onSaveAccountReturn = (state, action) => {

    action.callBackData.doCallBackFunc(action.callBackData);

    return {
        ...state,
    };
};



const onReadOrdersReturn = (state, action) => {

    if (action.objs.errors) {
        return {
            ...state,
        };
    }


    let updatedOrders = state.orders;
    let updatedPageNum = state.selectedOrderPageNum;

    if (action.objs?.orders?.length > 0) {
        updatedOrders = action.objs.orders;
        updatedPageNum = action.objs.pageNum
    }

    return {
        ...state,
        orders: updatedOrders,
        selectedOrderPageNum: updatedPageNum,
        ordersMetaData: action.objs.ordersMetaData
    };
};



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

    alert("Payment saved...");


    let updatedState = {
        ...state,
        shouldDoPostSavePayment: true,
        wasPaymentFormCrudOk: true
    };

    let updatedPaymentInfos = state.paymentInfos;

    if (action.paymentForCrudMethod == "create") {
        return {
            ...updatedState,
            paymentInfos: [...updatedPaymentInfos, action.newPayment]
        };
    }
    else {

        let i = 0;
        for (; i < updatedPaymentInfos.length; i++) {
            const p = updatedPaymentInfos[i];

            if (p.id === action.newPayment.id) { break; }

        }

        updatedPaymentInfos[i] = action.newPayment;

        return {
            ...updatedState,
            paymentInfos: [...updatedPaymentInfos]
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


    BsCore2.alertForCallBackDataErrors(action.callBackData);
    action.callBackData.doCallBackFunc();

    return {
        ...state,
    };
};

const onSaveProfileSuccess = (state, action) => {

    const updatedProfile = action.callBackData.objs.profile ?? {};
    if (BsJLS.set('profile.personalData', updatedProfile)) { BsJLSOLM.updateRefreshDate('profile.personalData'); }

    action.callBackData.doCallBackFunc();

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

    switch (action.callBackData.resultCode) {
        case 1: // Read from the backend.

            const profile = action.callBackData.objs.profile ?? {};
            const paymentInfos = action.callBackData.objs.paymentInfos ?? [];
            const addresses = action.callBackData.objs.addresses ?? [];


            if (BsJLS.set('profile.personalData', profile)) { BsJLSOLM.updateRefreshDate('profile.personalData'); }
            if (BsJLS.set('profile.stripePaymentInfos', paymentInfos)) { BsJLSOLM.updateRefreshDate('profile.stripePaymentInfos'); }
            if (BsJLS.set('profile.addresses', addresses)) { BsJLSOLM.updateRefreshDate('profile.addresses'); }

            return {
                ...state,
                profile: profile,
                paymentInfos: paymentInfos,
                addresses: addresses,
                shouldDisplayProfile: true
            };

        case 2: // Read from local-storage.

            return {
                ...state,
                profile: BsJLS.get('profile.personalData') ?? {},
                paymentInfos: BsJLS.get('profile.stripePaymentInfos') ?? [],
                addresses: BsJLS.get('profile.addresses') ?? [],
                shouldDisplayProfile: true
            };

        default:
            return { ...state };
    }
};



const onSetProfileFail = (state, action) => {
    return {
        ...state,
    };
};



export default profile;