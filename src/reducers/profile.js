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

    paymentInfos: [],
    addresses: [
        { id: 0, street: "123 My Address", city: "Manhattan", province: "NY", country: "United State", postalCode: "98765" },
    ],
    orders: [],
    ordersMetaData: {},

    shouldDisplayProfile: false,
    selectedOrderPageNum: 1
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {

        case actions.ON_SET_PROFILE_FAIL: return onSetProfileFail(state, action);

        case actions.ON_SAVE_ACCOUNT_RETURN: return onSaveAccountReturn(state, action);

        case actions.ON_READ_ORDERS_RETURN: return onReadOrdersReturn(state, action);

        case actions.ON_ADDRESS_DELETE_FAIL: return onAddressDeleteFail(state, action);
        case actions.ON_ADDRESS_DELETE_SUCCESS: return onAddressDeleteSuccess(state, action);
        case actions.ON_SAVE_ADDRESS_FAIL: return onSaveAddressFail(state, action);
        case actions.ON_SAVE_ADDRESS_SUCCESS: return onSaveAddressSuccess(state, action);

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



const onSaveAddressFail = (state, action) => {
    action.callBackData.doCallBackFunc(false);
    BsCore2.alertForCallBackDataErrors(action.callBackData);

    return {
        ...state,
    };
};


//bmd-ish
const onSaveAddressSuccess = (state, action) => {

    let oldAddresses = BsJLS.get('profile.addresses');
    const updatedAddress = action.callBackData.address;
    let updatedAddresses = [...oldAddresses];

    if (action.callBackData.addressFormCrudMethod == "create") {
        updatedAddresses = [...updatedAddresses, updatedAddress];
    }
    else {

        let i = 0;
        for (; i < oldAddresses.length; i++) {
            const a = oldAddresses[i];
            if (a.id == updatedAddress.id) { break; }
        }

        oldAddresses[i] = updatedAddress;
        updatedAddresses = [...oldAddresses];
    }


    if (BsJLS.set('profile.addresses', updatedAddresses)) { BsJLSOLM.updateRefreshDate('profile.addresses'); }
    action.callBackData.doCallBackFunc(true);
    document.querySelector("#closeAddressFormBtn").click();

    return {
        ...state,
        addresses: updatedAddresses
    };

};

// const onPaymentFormResetSuccess = (state, action) => {
//     return {
//         ...state,
//         shouldResetPaymentForm: false
//     };
// };



const onSavePaymentSuccess = (state, action) => {

    //ish
    const isResultOk = action.callBackData.isResultOk;
    action.callBackData.doCallBackFunc(isResultOk);

    if (!isResultOk) {
        if (action.callBackData.caughtCustomError) {
            alert('Oops, there\s an error. ' + action.callBackData.caughtCustomError);
        } else {
            BsCore2.alertForCallBackDataErrors();
        }

        return { ...state };
    }


    let oldPaymentInfos = BsJLS.get('profile.stripePaymentInfos');
    let updatedPaymentInfos = oldPaymentInfos;

    if (action.callBackData.paymentFormCrudMethod == "create") {
        updatedPaymentInfos = [...oldPaymentInfos, action.callBackData.objs.newPayment];
    }
    else {
        let indexOfUpdatedPayment = null;

        for (let i = 0; i < oldPaymentInfos.length; i++) {
            const p = oldPaymentInfos[i];

            if (p.id === action.callBackData.objs.newPayment.id) {
                indexOfUpdatedPayment = i;
                break;
            }

        }

        if (indexOfUpdatedPayment) {
            oldPaymentInfos[indexOfUpdatedPayment] = action.callBackData.objs.newPayment;
            updatedPaymentInfos = [...oldPaymentInfos];
        }
    }

    if (BsJLS.set('profile.stripePaymentInfos', updatedPaymentInfos)) { BsJLSOLM.updateRefreshDate('profile.stripePaymentInfos'); }


    document.querySelector("#closePaymentFormBtn").click();


    return {
        ...state,
        paymentInfos: updatedPaymentInfos,
    };
};



const onSavePaymentFail = (state, action) => {

    action.callBackData.doCallBackFunc(false);
    BsCore2.alertForCallBackDataErrors(action.callBackData);

    return {
        ...state,
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