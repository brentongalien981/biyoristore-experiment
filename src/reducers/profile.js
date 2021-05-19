import { CLEAR_SENSITIVE_DATA_FOR_PROFILE_REDUCER } from '../actions/appStateManager';
import * as actions from '../actions/profile';
import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from '../bs-library/constants/global';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore2 from '../bs-library/helpers/BsCore2';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';



/** CONSTS */
const DEFAULT_ADDRESS = { id: 0, street: "123 My Address", city: "Manhattan", province: "NY", country: "United State", postalCode: "98765" };


/** */
const initialState = {
    profile: {
    },

    paymentInfos: [],
    addresses: [{...DEFAULT_ADDRESS}],
    orders: [],
    ordersMetaData: {},

    shouldDisplayProfile: false,
    selectedOrderPageNum: 0
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {

        case CLEAR_SENSITIVE_DATA_FOR_PROFILE_REDUCER: return clearSensitiveDataForProfileReducer(state, action);

        case actions.ON_SET_PROFILE_FAIL: return onSetProfileFail(state, action);

        case actions.ON_SAVE_ACCOUNT_RETURN: return onSaveAccountReturn(state, action);

        case actions.ON_READ_ORDERS_RETURN: return onReadOrdersReturn(state, action);

        case actions.ON_ADDRESS_DELETE_FAIL: return onAddressDeleteFail(state, action);
        case actions.ON_ADDRESS_DELETE_SUCCESS: return onAddressDeleteSuccess(state, action);
        case actions.ON_SAVE_ADDRESS_FAIL: return onSaveAddressFail(state, action);
        case actions.ON_SAVE_ADDRESS_SUCCESS: return onSaveAddressSuccess(state, action);

        case actions.ON_DELETE_PAYMENT_METHOD_RETURN: return onDeletePaymentMethodReturn(state, action);
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
const clearSensitiveDataForProfileReducer = (state, action) => {

    const updatedProfile = {};
    const updatedPaymentInfos = [];
    const updatedAddresses = [{...DEFAULT_ADDRESS}];
    const updatedOrders = [];
    const updatedOrdersMetaData = {};


    return {
        ...state,
        profile: updatedProfile,
        paymentInfos: updatedPaymentInfos,
        addresses: updatedAddresses,
        orders: updatedOrders,
        ordersMetaData: updatedOrdersMetaData,
    };
};



const onSaveAccountReturn = (state, action) => {

    action.callBackData.doCallBackFunc(action.callBackData);

    return {
        ...state,
    };
};



const onReadOrdersReturn = (state, action) => {

    action.callBackData.doCallBackFunc();

    if (!action.callBackData.isResultOk) {
        return {
            ...state,
        };
    }

    let updatedPageOrders = [];
    let userOrdersMetaData = {};
    const pageOrdersReadQuery = 'userOrders?pageNum=' + action.callBackData.pageNum;

    if (action.callBackData.retrievedDataFrom === RETRIEVED_DATA_FROM_LOCAL_STORAGE) {
        updatedPageOrders = BsJLS.get(pageOrdersReadQuery);
        userOrdersMetaData = BsJLS.get('userOrdersMetaData');
        // Bs.log('has read userOrders from local-storage');
    }
    else {

        updatedPageOrders = action.callBackData.objs.orders;
        userOrdersMetaData = action.callBackData.objs.ordersMetaData;
        let lifespanInMin = 1;
        const isSensitiveInfo = true;

        if (BsJLS.set(pageOrdersReadQuery, updatedPageOrders)) { BsJLSOLM.updateRefreshDateForSearchQuery(pageOrdersReadQuery, lifespanInMin, isSensitiveInfo); }
        BsJLS.set('userOrdersMetaData', userOrdersMetaData);
        // Bs.log('has read userOrders from backend');
    }


    return {
        ...state,
        orders: updatedPageOrders ?? [],
        selectedOrderPageNum: action.callBackData.pageNum,
        ordersMetaData: userOrdersMetaData ?? {}
    };
};



const onAddressDeleteFail = (state, action) => {
    action.callBackData.doCallBackFunc(false);
    BsCore2.alertForCallBackDataErrors(action.callBackData);

    return {
        ...state,
    };
};



const onAddressDeleteSuccess = (state, action) => {

    let updatedAddresses = BsJLS.get('profile.addresses') ?? [];

    let i = 0;
    for (; i < updatedAddresses.length; i++) {
        const a = updatedAddresses[i];

        if (a.id == action.callBackData.addressId) {
            break;
        }

    }

    updatedAddresses.splice(i, 1);


    if (BsJLS.set('profile.addresses', updatedAddresses)) { BsJLSOLM.updateRefreshDate('profile.addresses'); }
    action.callBackData.doCallBackFunc(true);

    return {
        ...state,
        addresses: [...updatedAddresses]
    };
};



const onDeletePaymentMethodReturn = (state, action) => {

    let oldPaymentInfos = BsJLS.get('profile.stripePaymentInfos') ?? [];
    let updatedPaymentInfos = [...oldPaymentInfos];

    if (action.callBackData.isResultOk) {
        updatedPaymentInfos = [];
        const paymentMethodId = action.callBackData.paymentMethodId;

        for (const p of oldPaymentInfos) {
            if (p.id == paymentMethodId) { continue; }
            updatedPaymentInfos.push(p);
        }
    }
    else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    if (BsJLS.set('profile.stripePaymentInfos', updatedPaymentInfos)) { BsJLSOLM.updateRefreshDate('profile.stripePaymentInfos'); }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        paymentInfos: updatedPaymentInfos
    };
};



const onSaveAddressFail = (state, action) => {
    action.callBackData.doCallBackFunc(false);
    BsCore2.alertForCallBackDataErrors(action.callBackData);

    return {
        ...state,
    };
};



const onSaveAddressSuccess = (state, action) => {

    let oldAddresses = BsJLS.get('profile.addresses') ?? [];
    const updatedAddress = action.callBackData.address;
    let updatedAddresses = [...oldAddresses];

    if (action.callBackData.addressFormCrudMethod == "create") {
        updatedAddresses = [...oldAddresses, updatedAddress];
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



const onSavePaymentSuccess = (state, action) => {

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


    let oldPaymentInfos = BsJLS.get('profile.stripePaymentInfos') ?? [];
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


            // if (BsJLS.set('profile.personalData', profile)) { BsJLSOLM.updateRefreshDate('profile.personalData'); }
            // if (BsJLS.set('profile.stripePaymentInfos', paymentInfos)) { BsJLSOLM.updateRefreshDate('profile.stripePaymentInfos'); }
            // if (BsJLS.set('profile.addresses', addresses)) { BsJLSOLM.updateRefreshDate('profile.addresses'); }

            return {
                ...state,
                profile: profile,
                paymentInfos: paymentInfos,
                addresses: addresses,
                shouldDisplayProfile: true
            };

        // case 2: // Read from local-storage.

        //     return {
        //         ...state,
        //         profile: BsJLS.get('profile.personalData') ?? {},
        //         paymentInfos: BsJLS.get('profile.stripePaymentInfos') ?? [],
        //         addresses: BsJLS.get('profile.addresses') ?? [],
        //         shouldDisplayProfile: true
        //     };

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