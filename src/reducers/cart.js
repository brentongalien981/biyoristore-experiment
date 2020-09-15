import * as cartActions from '../actions/cart';
import Bs from '../bs-library/helpers/Bs';



const initialState = {
    message: "This is the initial state of STORE: cart.",
};



/* REDUCER */
const cart = (state = initialState, action) => {
    switch (action.type) {
        case cartActions.ON_ADD_TO_CART: return onAddToCart(state, action);
        default: return state;
    }
};



/* NORMAL */
const onAddToCart = (state, action) => {
    action.event.stopPropagation();
    
    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: onAddToCart()");

    return {
        ...state
    };
};



export default cart;