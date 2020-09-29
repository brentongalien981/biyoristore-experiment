import * as cartActions from '../actions/cart';
import Bs from '../bs-library/helpers/Bs';



const initialState = {
    message: "This is the initial state of STORE: cart.",
    items: [
        { id: 1, name: "Default Product 1", price: 39.99, quantity: 1 },
        { id: 2, name: "Default Product 2", price: 49.99, quantity: 3 }
    ]
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