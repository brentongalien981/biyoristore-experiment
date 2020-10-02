import * as actions from '../actions/cart';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore from '../bs-library/helpers/BsCore';



const initialState = {
    message: "This is the initial state of STORE: cart.",
    cart: {},
    items: [
        { id: 1, name: "Default Product 1", price: 39.99, quantity: 1 },
        { id: 2, name: "Default Product 2", price: 49.99, quantity: 3 }
    ]
};



/* REDUCER */
const cart = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_ADD_TO_CART_FAIL: return onAddToCartFail(state, action);
        case actions.ON_ADD_TO_CART_SUCCESS: return onAddToCartSuccess(state, action);
        case actions.SET_CART: return setCart(state, action);
        case actions.ON_ADD_TO_CART: return onAddToCart(state, action);
        default: return state;
    }
};



/* NORMAL */
const onAddToCartFail = (state, action) => {

    BsCore.alertForGeneralErrors(action.errors);

    return {
        ...state
    };
};

const onAddToCartSuccess = (state, action) => {
    alert ("Item added to cart.");
    
    return {
        ...state,
        cart: action.obj
    };
};

const setCart = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: setCart()");

    return {
        ...state,
        cart: action.obj
    };
};

const onAddToCart = (state, action) => {
    action.event.stopPropagation();

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: onAddToCart()");

    return {
        ...state,
    };
};



export default cart;