import * as actions from '../actions/checkout';
import Bs from '../bs-library/helpers/Bs';
import BsCore2 from '../bs-library/helpers/BsCore2';



/* STATE */
const initialState = {
    message: "This is the initial state of STORE: checkout.",
    // profile: {},
    addresses: [],
    paymentInfos: [],
    paymentPageEntryCode: "",
    checkoutFinalizationPageEntryCode: "",
    paymentFinalizationPageEntryCode: "",
    predefinedPaymentFinalizationPageEntryCode: "",
    // shouldDisplayFinalizationMsg: false,
    shouldDoPostPaymentFinalizationProcess: false,
    paymentProcessStatusCode: 0,
    orderProcessStatusCode: 0,
    // isThereError: false,
    order: {},

    shouldShowShippingDetails: false,
    efficientShipmentRates: [],
    canSelectShippingOption: false,
    shipmentId: "",
    shipmentRate: {},
    shouldGoToCheckoutFinalizationPage: false,
    shippingInfo: {},
    paymentMethod: {}
};



/* REDUCER */
const checkout = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PAYMENT_METHOD: return setPaymentMethod(state, action);
        case actions.SET_SHIPPING_INFO: return setShippingInfo(state, action);
        case actions.SET_SHIPMENT_RATE: return setShipmentRate(state, action);
        case actions.RESET_REDUCER_INIT_VARS: return resetReducerInitVars(state, action);
        // case actions.FINALIZE_SHOW_SHIPPING_DETAILS: return finalizeShowShippingDetails(state, action);

        case actions.ON_GET_SHIPPING_RATES_FAIL: return onGetShippingRatesFail(state, action);
        case actions.ON_GET_SHIPPING_RATES_RETURN: return onGetShippingRatesReturn(state, action);
        
        // case actions.ON_ADDRESS_SELECTION_CHANGE: return onAddressSelectionChange(state, action);
        case actions.END_PAYMENT_FINALIZATION_PROCESS: return endPaymentFinalizationProcess(state, action);
        case actions.ON_FINALIZE_ORDER_RETURN: return onFinalizeOrderReturn(state, action);
        case actions.RESET_FINALIZATION_OBJS: return resetFinalizationObjs(state, action);
        // case actions.ON_FINALIZE_ORDER_FAIL: return onFinalizeOrderFail(state, action);
        // case actions.ON_FINALIZE_ORDER_SUCCESS: return onFinalizeOrderSuccess(state, action);
        case actions.SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE: return setPredefinedPaymentFinalizationPageEntryCode(state, action);
        case actions.SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE: return setPaymentFinalizationPageEntryCode(state, action);
        case actions.SET_PAYMENT_PAGE_ENTRY_CODE: return setPaymentPageEntryCode(state, action);
        case actions.SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE: return setCheckoutFinalizationPageEntryCode(state, action);        
        case actions.ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS: return onReadCheckoutRequiredDataSuccess(state, action);
        case actions.ON_READ_CHECKOUT_REQUIRED_DATA_FAIL: return onReadCheckoutRequiredDataFail(state, action);
        default: return state;
    }
};



/* NORMAL FUNCS */
const setPaymentMethod = (state, action) => {
    return {
        ...state,
        paymentMethod: action.paymentMethod
    };
};



const setShippingInfo = (state, action) => {
    return {
        ...state,
        shippingInfo: action.shippingInfo
    };
};



const setShipmentRate = (state, action) => {
    return {
        ...state,
        shipmentRate: action.shipmentRate,
        shouldGoToCheckoutFinalizationPage: true
    };
};



const resetReducerInitVars = (state, action) => {
    return {
        ...state,
        canSelectShippingOption: false,
        shouldGoToCheckoutFinalizationPage: false
    };
};



const onGetShippingRatesFail = (state, action) => {

    BsCore2.alertForGeneralError();
    action.callBackData.doCallBackFunc();

    return {
        ...state
    };
};


//bmd-ish
const onGetShippingRatesReturn = (state, action) => {

    const resultCode = action.callBackData.objs.resultCode;
    const DESTINATION_ADDRESS_EXCEPTION = -2;
    const EMPTY_CART_EXCEPTION = -4;
    const ENTIRE_PROCESS_OK = 1;

    let shipmentId = "";
    let efficientShipmentRates = [];

    switch (resultCode) {
        case DESTINATION_ADDRESS_EXCEPTION:
            alert("Oops! Please enter a valid address.");
            break;
        case EMPTY_CART_EXCEPTION:
            alert("Oops! Please add items to your cart.");
            break;
        case ENTIRE_PROCESS_OK:
            shipmentId = action.callBackData.objs.shipmentId;
            efficientShipmentRates = action.callBackData.objs.efficientShipmentRates;
            break;
        default:
            BsCore2.alertForGeneralError();
            break;
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        shipmentId: shipmentId,
        efficientShipmentRates: efficientShipmentRates
    };
};



const endPaymentFinalizationProcess = (state, action) => {
    return {
        ...state,
        shouldDoPostPaymentFinalizationProcess: false
    };
};



const resetFinalizationObjs = (state, action) => {
    return {
        ...state,
        paymentProcessStatusCode: 0,
        orderProcessStatusCode: 0,
        order: {}
    };
};



const onFinalizeOrderReturn = (state, action) => {
    return {
        ...state,
        shouldDoPostPaymentFinalizationProcess: true,
        paymentProcessStatusCode: (action.objs?.paymentProcessStatusCode ? action.objs.paymentProcessStatusCode : -1),
        orderProcessStatusCode: (action.objs?.orderProcessStatusCode ? action.objs.orderProcessStatusCode : -1),
        order: (action.objs?.order ? action.objs.order : {})
    };
};



const setCheckoutFinalizationPageEntryCode = (state, action) => {
    return {
        ...state,
        checkoutFinalizationPageEntryCode: Bs.getRandomId(),
    };
};



const setPredefinedPaymentFinalizationPageEntryCode = (state, action) => {
    return {
        ...state,
        predefinedPaymentFinalizationPageEntryCode: Bs.getRandomId(),
    };
};



const setPaymentFinalizationPageEntryCode = (state, action) => {
    return {
        ...state,
        paymentFinalizationPageEntryCode: Bs.getRandomId(),
    };
};



const setPaymentPageEntryCode = (state, action) => {
    return {
        ...state,
        paymentPageEntryCode: Bs.getRandomId(),
    };
};



const onReadCheckoutRequiredDataFail = (state, action) => {

    BsCore2.alertForGeneralError();

    return {
        ...state
    };
};



const onReadCheckoutRequiredDataSuccess = (state, action) => {

    const updatedAddresses = setAddresses(action.objs);
    const updatedPaymentInfos = setPaymentInfos(action.objs.paymentInfos)

    return {
        ...state,
        // profile: action.objs.profile,
        addresses: updatedAddresses,
        paymentInfos: updatedPaymentInfos
    };
};



/* HELPER FUNCS */
const setPaymentInfos = (paymentInfos) => {

    paymentInfos.unshift({});
    let updatedPaymentInfos = [];

    paymentInfos.forEach(p => {
        updatedPaymentInfos.push({
            id: p.id ? p.id : 0,
            cardNumber: p.card ? "**** **** **** " + p.card?.last4 : "",
            cvc: p.card ? "***" : "",
            expMonth: p.card?.exp_month ? p.card?.exp_month : "",
            expYear: p.card?.exp_year ? p.card?.exp_year : "",
            postalCode: p.billing_details?.address?.postal_code ? p.billing_details?.address?.postal_code : "",
            brand: p.card?.brand ? p.card?.brand : "",
            last4: p.card ? p.card?.last4 : ""
        });
    });


    return updatedPaymentInfos;
};



const setAddresses = (objs) => {
    let addresses = [];

    // Append an option for the user to fill-in her address.
    addresses.push({ id: 0, isBlankAddress: true });

    objs.addresses.forEach(a => {
        const addressWithProfile = { ...a, ...objs.profile };
        addresses.push(addressWithProfile);
    });

    return addresses;
};



const uncheckAllOptions = (options) => {
    let updatedOptions = [];

    options.forEach(o => {
        o.isChecked = false;
        updatedOptions.push(o);
    });

    return updatedOptions;
};



export default checkout;