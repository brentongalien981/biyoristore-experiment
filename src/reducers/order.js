import * as actions from '../actions/order';
import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from '../bs-library/constants/global';
import BsCore2 from '../bs-library/helpers/BsCore2';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** CONSTS */
const NON_EXISTENT_ORDER_OBJ = { id: -1 };

/* INITIAL STATE */
const initialState = {
    order: {},
    paymentInfo: {},
    shipmentTrackerUrl: null
};



/* REDUCER */
const order = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_SHOW_ORDER_RETURN: return onShowOrderReturn(state, action);
        case actions.ON_REQUEST_FOR_RETURN_RETURN: return onRequestForReturnReturn(state, action);        
        default: return state;
    }
}



/* NORMAL */
const onShowOrderReturn = (state, action) => {

    let updatedOrder = {};
    let updatedPaymentInfo = {};
    let updatedShipmentTrackerUrl = state.updatedShipmentTrackerUrl;

    if (action.callBackData.isResultOk) {

        const bsJLSObjQuery = action.callBackData.bsJLSObjQuery;
        let bsJLSObjData = null;

        if (action.callBackData.retrievedDataFrom == RETRIEVED_DATA_FROM_LOCAL_STORAGE) {

            bsJLSObjData = BsJLS.get(bsJLSObjQuery);
            updatedOrder = bsJLSObjData.order;
            updatedPaymentInfo = bsJLSObjData.paymentInfo;
            updatedShipmentTrackerUrl = bsJLSObjData.shipmentTrackerUrl;

        } else {

            updatedOrder = action.callBackData.objs.order;
            updatedPaymentInfo = action.callBackData.objs.paymentInfo;
            updatedShipmentTrackerUrl = action.callBackData.objs.epShipment?.tracker?.public_url;

            const bsJLSObjLifespanInMin = 120;
            bsJLSObjData = {
                order: updatedOrder,
                paymentInfo: updatedPaymentInfo,
                shipmentTrackerUrl: updatedShipmentTrackerUrl
            };


            if (BsJLS.set(bsJLSObjQuery, bsJLSObjData)) {
                BsJLSOLM.updateRefreshDateForSearchQuery(bsJLSObjQuery, bsJLSObjLifespanInMin);
            }
        }

    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        order: updatedOrder.id ? updatedOrder:  { ...NON_EXISTENT_ORDER_OBJ },
        paymentInfo: updatedPaymentInfo ?? {},
        shipmentTrackerUrl: updatedShipmentTrackerUrl
    };
};



const onRequestForReturnReturn = (state, action) => {

    if (action.callBackData.isResultOk) {

    } else {
        BsCore2.tryAlertForBmdResultCodeErrors2(action.callBackData);
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state
    };
};



export default order;