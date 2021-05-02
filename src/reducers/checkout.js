import * as actions from '../actions/checkout';
import Bs from '../bs-library/helpers/Bs';
import BsCore2 from '../bs-library/helpers/BsCore2';
import { ORDER_STATUSES } from '../containers/payment/constants/consts';



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
    paymentProcessStatusCode: 0,
    orderProcessStatusCode: 0,
    order: {},
    orderId: 0,

    shouldShowShippingDetails: false,
    efficientShipmentRates: [],
    canSelectShippingOption: false,
    shipmentId: "",
    shipmentRate: {},
    shippingInfo: {},
    paymentMethod: {},

    // FLAGS
    canGoToPaymentPage: false,
    shouldGoToCheckoutFinalizationPage: false
};



/* REDUCER */
const checkout = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET_CHECKOUT_FINALIZATION_PAGE_FLAGS: return resetCheckoutFinalizationPageFlags(state, action);
        case actions.ON_DO_ORDER_INVENTORY_CHECKS_RETURN: return onDoOrderInventoryChecksReturn(state, action);

        case actions.SET_PAYMENT_METHOD: return setPaymentMethod(state, action);
        case actions.SET_SHIPPING_INFO: return setShippingInfo(state, action);
        case actions.SET_SHIPMENT_RATE: return setShipmentRate(state, action);
        case actions.RESET_REDUCER_INIT_VARS: return resetReducerInitVars(state, action);
        // case actions.FINALIZE_SHOW_SHIPPING_DETAILS: return finalizeShowShippingDetails(state, action);

        case actions.ON_GET_SHIPPING_RATES_FAIL: return onGetShippingRatesFail(state, action);
        case actions.ON_GET_SHIPPING_RATES_RETURN: return onGetShippingRatesReturn(state, action);

        // case actions.ON_ADDRESS_SELECTION_CHANGE: return onAddressSelectionChange(state, action);

        case actions.ON_FINALIZE_ORDER_WITH_PREDEFINED_PAYMENT_RETURN: return onFinalizeOrderWithPredefinedPaymentReturn(state, action);
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



/** HELPER FUNCS */
const extractCheapestShipmentRate = (efficientShipmentRates) => {
    let cheapestRate = {};

    efficientShipmentRates.forEach(r => {
        if (!cheapestRate.rate) { cheapestRate = r; }
        else {
            if (parseFloat(r.rate) <= parseFloat(cheapestRate.rate)
                && r.delivery_days < cheapestRate.delivery_days
            ) {
                cheapestRate = r;
            }
        }

    });

    return cheapestRate;
};



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



/* NORMAL FUNCS */
const resetCheckoutFinalizationPageFlags = (state, action) => {

    return {
        ...state,
        canGoToPaymentPage: false
    };
};



const onDoOrderInventoryChecksReturn = (state, action) => {

    let canGoToPaymentPage = true;

    if (!action.callBackData.isResultOk) {

        canGoToPaymentPage = false;
        const failedCheckObjs = action.callBackData.objs.orderItemExceedInventoryQuantityFailedCheckObjs;
        let errorMsg = 'Oops!';

        failedCheckObjs.forEach(fco => {
            if (fco.productInventoryQuantity == 0) {
                errorMsg += '\nWe just ran out of stock for ' + fco.productName + ' with size ' + fco.size + '.';
            } else {

                let pluralSingularClause = fco.productInventoryQuantity;
                pluralSingularClause += (fco.productInventoryQuantity == 1 ? ' item left for ' : ' items left for ');
                errorMsg += '\nWe only have ' + pluralSingularClause + fco.productName + ' with size ' + fco.size + '.';
            }
        });

        alert(errorMsg);
    }


    action.callBackData.doCallBackFunc();

    return {
        ...state,
        canGoToPaymentPage: canGoToPaymentPage
    };
};



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

    let shipmentRate = state.shipmentRate;
    const chosenShipmentRate = action.shipmentRate;

    for (const r of state.efficientShipmentRates) {
        if (r.id == chosenShipmentRate.id) {
            shipmentRate = r;
            break;
        }
    }

    return {
        ...state,
        shipmentRate: shipmentRate
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



const onGetShippingRatesReturn = (state, action) => {

    const resultCode = action.callBackData.objs.resultCode;
    const DESTINATION_ADDRESS_EXCEPTION = -2;
    const NULL_PREDEFINED_PACKAGE_EXCEPTION = -3;
    const EMPTY_CART_EXCEPTION = -4;
    const COULD_NOT_FIND_SHIPMENT_RATES = -5;
    const NUM_OF_DAILY_ORDERS_LIMIT_REACHED = -6;
    const NUM_OF_DAILY_ORDER_ITEMS_LIMIT_REACHED = -7;

    const ENTIRE_PROCESS_OK = 1;

    let shipmentId = "";
    let efficientShipmentRates = [];
    let shipmentRate = {};
    let shouldGoToCheckoutFinalizationPage = false;

    switch (resultCode) {
        case DESTINATION_ADDRESS_EXCEPTION:
            alert("Oops! Please enter a valid address.");
            break;
        case NULL_PREDEFINED_PACKAGE_EXCEPTION:
            alert("Oops! Our largest package-box couldn't quite carry that many items. Try doing multiple orders or reduce your cart item quantities.");
            break;
        case EMPTY_CART_EXCEPTION:
            alert("Oops! Please add items to your cart.");
            break;
        case COULD_NOT_FIND_SHIPMENT_RATES:
            alert("Oops! We couldn't find a shipping-option available. Please try again later.");
            break;
        case NUM_OF_DAILY_ORDERS_LIMIT_REACHED:
        case NUM_OF_DAILY_ORDER_ITEMS_LIMIT_REACHED:
            alert("We're very sorry... Due to our restricted man-power, we've reached the order limits we could process for today. Try again tomorrow, ok? Thank you.");
            break;
        case ENTIRE_PROCESS_OK:
            shipmentId = action.callBackData.objs.shipmentId;
            efficientShipmentRates = action.callBackData.objs.efficientShipmentRates;
            shipmentRate = extractCheapestShipmentRate(efficientShipmentRates);
            shouldGoToCheckoutFinalizationPage = true;
            break;
        default:
            BsCore2.alertForGeneralError();
            break;
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        shipmentId: shipmentId,
        efficientShipmentRates: efficientShipmentRates,
        shipmentRate: shipmentRate,
        shouldGoToCheckoutFinalizationPage: shouldGoToCheckoutFinalizationPage
    };
};



const resetFinalizationObjs = (state, action) => {
    return {
        ...state,
        paymentProcessStatusCode: 0,
        orderProcessStatusCode: 0,
        orderId: 0
    };
};


// BMD-ISH
const onFinalizeOrderWithPredefinedPaymentReturn = (state, action) => {

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        paymentProcessStatusCode: (action.callBackData.objs?.paymentProcessStatusCode ?? ORDER_STATUSES.PAYMENT_METHOD_NOT_CHARGED),
        orderProcessStatusCode: (action.callBackData.objs?.orderProcessStatusCode ?? -1),
        orderId: action.callBackData.objs?.orderId ?? 0
    };
};



const onFinalizeOrderReturn = (state, action) => {

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        orderProcessStatusCode: (action.callBackData.objs?.orderProcessStatusCode ?? -1),
        orderId: action.callBackData.objs?.orderId ?? 0
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



export default checkout;