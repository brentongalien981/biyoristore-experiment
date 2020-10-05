import * as actions from '../actions/cart';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore from '../bs-library/helpers/BsCore';



const initialState = {
    message: "This is the initial state of STORE: cart.",
    shouldResetSettingCartItemCountFlag: false,
    cart: {
        id: 0,
        cartItems: [
            {
                id: 0,
                quantity: 1,
                product: {
                    id: 0,
                    name: "DefaultProductName",
                    price: 1.00,
                    brand: { id: 0, name: "DefaultBrandName" },
                    productPhotoUrls: [
                        { id: 0, url: "default-product1.jpg" }
                    ]

                }

            }
        ]
    },
    items: [
        { id: 1, name: "Default Product 1", price: 39.99, quantity: 1 },
        { id: 2, name: "Default Product 2", price: 49.99, quantity: 3 }
    ]
};



/* REDUCER */
const cart = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_SHOULD_RESET_SETTING_CART_ITEM_COUNT_FLAG_SUCCESS: return onShouldResetSettingCartItemCountFlagSuccess(state, action);
        case actions.ON_UPDATE_CART_ITEM_COUNT_FAIL: return onUpdateCartItemCountFail(state, action);
        case actions.ON_UPDATE_CART_ITEM_COUNT_SUCCESS: return onUpdateCartItemCountSuccess(state, action);
        case actions.ON_DELETE_CART_ITEM_FAIL: return onDeleteCartItemFail(state, action);
        case actions.ON_DELETE_CART_ITEM_SUCCESS: return onDeleteCartItemSuccess(state, action);
        case actions.ON_ADD_TO_CART_FAIL: return onAddToCartFail(state, action);
        case actions.ON_ADD_TO_CART_SUCCESS: return onAddToCartSuccess(state, action);
        case actions.SET_CART: return setCart(state, action);
        case actions.ON_ADD_TO_CART: return onAddToCart(state, action);
        default: return state;
    }
};



/* NORMAL */
const onShouldResetSettingCartItemCountFlagSuccess = (state, action) => {
    return {
        ...state,
        shouldResetSettingCartItemCountFlag: false
    };
};



const onUpdateCartItemCountFail = (state, action) => {

    BsCore.alertForGeneralErrors(action.errors);

    return {
        ...state,
        shouldResetSettingCartItemCountFlag: true
    };
};



const onUpdateCartItemCountSuccess = (state, action) => {

    Bs.log("action.cartItemIndex ==> " + action.cartItemIndex);

    let updatedCartItems = state.cart.cartItems;
    Bs.log("updatedCartItems ==> ...");
    Bs.log(updatedCartItems);

    updatedCartItems[action.index].quantity = action.quantity;

    let updatedCart = state.cart;
    Bs.log("updatedCart ==> ...");
    Bs.log(updatedCart);

    updatedCart.cartItems = updatedCartItems;
    Bs.log("updatedCart ==> ...");
    Bs.log(updatedCart);

    return {
        ...state,
        cart: { ...updatedCart },
        shouldResetSettingCartItemCountFlag: true
    };
};



const onDeleteCartItemFail = (state, action) => {

    BsCore.alertForGeneralErrors(action.errors);

    return {
        ...state
    };
};



const onDeleteCartItemSuccess = (state, action) => {

    Bs.log("action.cartItemIndex ==> " + action.cartItemIndex);

    let updatedCartItems = state.cart.cartItems;
    Bs.log("updatedCartItems ==> ...");
    Bs.log(updatedCartItems);

    updatedCartItems.splice(action.cartItemIndex, 1);
    Bs.log("updatedCartItems ==> ...");
    Bs.log(updatedCartItems);

    let updatedCart = state.cart;
    Bs.log("updatedCart ==> ...");
    Bs.log(updatedCart);

    updatedCart.cartItems = updatedCartItems;
    Bs.log("updatedCart ==> ...");
    Bs.log(updatedCart);

    return {
        ...state,
        cart: { ...updatedCart }
    };
};



const onAddToCartFail = (state, action) => {

    BsCore.alertForGeneralErrors(action.errors);

    return {
        ...state
    };
};

const onAddToCartSuccess = (state, action) => {
    alert("Item added to cart.");

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