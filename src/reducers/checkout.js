import * as actions from '../actions/checkout';
import Bs from '../bs-library/helpers/Bs';
import BsCore2 from '../bs-library/helpers/BsCore2';



/* STATE */
const initialState = {
    message: "This is the initial state of STORE: cart.",
    addresses: []
};



/* REDUCER */
const checkout = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS: return onReadCheckoutRequiredDataSuccess(state, action);
        default: return state;
    }
};



/* NORMAL FUNCS */
const onReadCheckoutRequiredDataSuccess = (state, action) => {
    
    return {
        ...state,
        addresses: action.objs.addresses
    };
};



/* HELPER FUNCS */



export default checkout;