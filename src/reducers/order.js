import * as actions from '../actions/order';

/* INITIAL STATE */
const initialState = {
    order: {}
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
    if (action.objs?.order) { updatedOrder = action.objs.order; }
    else { updatedOrder = { id: -1 }; }

    return {
        ...state,
        order: updatedOrder
    };
};



export default order;