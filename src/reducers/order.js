import * as actions from '../actions/order';

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

    if (action.objs?.order) { updatedOrder = action.objs.order; }
    else { updatedOrder = { id: -1 }; }

    if (action.objs?.paymentInfo) { updatedPaymentInfo = action.objs.paymentInfo; }

    return {
        ...state,
        order: updatedOrder,
        paymentInfo: updatedPaymentInfo
    };
};



export default order;