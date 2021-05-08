import * as actions from '../actions/order';

/** CONSTS */
const NON_EXISTENT_ORDER_OBJ = { id: -1 };

/* INITIAL STATE */
const initialState = {
    order: {},
    paymentInfo: {}
};



/* REDUCER */
const order = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_SHOW_ORDER_RETURN: return onShowOrderReturn(state, action);
        default: return state;
    }
}



/* NORMAL */
const onShowOrderReturn = (state, action) => {

    let updatedOrder = state.order;
    let updatedPaymentInfo = state.paymentInfo;

    if (action.callBackData.isResultOk) {
        updatedOrder = action.callBackData.objs.order;
        updatedPaymentInfo = action.callBackData.objs.paymentInfo;

    }

    // BMD-TODO:Use BsJLSOLM & BsJLS.


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        order: updatedOrder ?? {...NON_EXISTENT_ORDER_OBJ},
        paymentInfo: updatedPaymentInfo ?? {}
    };
};



export default order;