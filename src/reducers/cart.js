import * as actions from '../actions/cart';
import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from '../bs-library/constants/global';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore from '../bs-library/helpers/BsCore';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';



/** DEFAULTS */
const DEFAULT_CART = { id: 0, cartItems: [] };



/* STATE */
const initialState = {
    message: "This is the initial state of STORE: cart.",
    shouldResetSettingCartItemCountFlag: false,
    cart: { ...DEFAULT_CART }
};



/* REDUCER */
const cart = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_INIT_CART_RETURN: return onInitCartReturn(state, action);

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



/* HELPER FUNCS */
// bmd-ish
const combineCarts = (backendCart, localStorageCart) => {
    const backendCartItems = backendCart.cartItems ?? [];
    const localStorageCartItems = localStorageCart.cartItems ?? [];

    let combinedCartItems = [...backendCartItems];

    localStorageCartItems.forEach(cartItem => {
        if (!isAlreadyInCart(cartItem.product, backendCart)) {
            combinedCartItems.push(cartItem);
        }
    });

    const combinedCart = {
        ...backendCart,
        cartItems: combinedCartItems
    };

    return combinedCart;
};



const checkCartValidity = (cart) => {
    let isValid = false;

    if (cart) {
        const cartId = cart.id;
        const cartItems = cart.cartItems;
        if (parseInt(cartId) && typeof (cartItems) == 'object') {
            isValid = true;
        }
    }

    return isValid;
};



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


// bmd-ish
const onInitCartReturn = (state, action) => {

    let cart = { ...DEFAULT_CART };


    if (action.callBackData.isResultOk) {

        if (action.callBackData.retrievedDataFrom === RETRIEVED_DATA_FROM_LOCAL_STORAGE) {
            if (!BsJLSOLM.shouldObjWithPathRefresh('cart')) {
                // If local-storage-cart is not tampered, use it.
                const localStorageCart = BsJLS.get('cart');
                if (checkCartValidity(localStorageCart)) {
                    cart = localStorageCart;
                }
            }
        } else {

            let localStorageCart = BsJLS.get('cart');

            if (!checkCartValidity(localStorageCart)) {
                localStorageCart = { ...DEFAULT_CART };
            }

            const backendCart = action.callBackData.objs.cart;
            cart = combineCarts(backendCart, localStorageCart);
        }
    }



    if (BsJLS.set('cart', cart)) { BsJLSOLM.updateRefreshDate('cart'); }
    // else { alert('Please free-up some space on your storage for better experience.'); }



    return {
        ...state,
        cart: cart
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