import * as actions from '../actions/cart';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore from '../bs-library/helpers/BsCore';



/* STATE */
const initialState = {
    message: "This is the initial state of STORE: cart.",
    shouldResetSettingCartItemCountFlag: false,
    cart: {
        id: 0,
        cartItems: [
            // {
            //     id: 0,
            //     quantity: 1,
            //     product: {
            //         id: 0,
            //         name: "DefaultProductName",
            //         price: 1.00,
            //         brand: { id: 0, name: "DefaultBrandName" },
            //         productPhotoUrls: [
            //             { id: 0, url: "default-product1.jpg" }
            //         ]

            //     }

            // }
        ]
    }
};



/* REDUCER */
const cart = (state = initialState, action) => {
    switch (action.type) {
        // case actions.SET_CART_ID: return setCartId(state, action);
        case actions.RESET_CART: return resetCart(state, action);
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



/* NORMAL FUNCS */
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

    BsAppSession.set("cart", JSON.stringify(updatedCart));

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

    BsAppSession.set("cart", JSON.stringify(updatedCart));

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

    let updatedCart = state.cart;
    let product = action.obj;

    // TODO: Modify this line.
    product.mostEfficientSeller = product.sellers[0];

    if (!isAlreadyInCart(product, updatedCart)) { addProductToCart(product, updatedCart); }

    return {
        ...state,
        cart: { ...updatedCart }
    };
};



const resetCart = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: resetCart()");

    const cart = { id: 0, cartItems: [] };
    BsAppSession.set("cart", JSON.stringify(cart));

    return {
        ...state,
        cart: { ...cart }
    };
};



const setCart = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: setCart()");

    let cart = action.obj;
    if (!cart || cart == "") { cart = { id: 0, cartItems: [] }; }

    BsAppSession.set("cart", JSON.stringify(cart));

    return {
        ...state,
        cart: { ...cart }
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



/* HELPER FUNCS */
const addProductToCart = (product, cart) => {
    const cartItem = { id: null, quantity: 1, product: product };
    cart.cartItems.push(cartItem);

    BsAppSession.set("cart", JSON.stringify(cart));

};



const isAlreadyInCart = (product, cart) => {

    for (const cartItem of cart.cartItems) {
        if (cartItem.product.id == product.id) {
            Bs.log("\n####################");
            Bs.log("product is already in cart");
            return true;
        }
    }


    return false;
};



export default cart;