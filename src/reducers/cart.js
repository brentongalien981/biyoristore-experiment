import * as actions from '../actions/cart';
import { RETRIEVED_DATA_FROM_DB, RETRIEVED_DATA_FROM_LOCAL_STORAGE } from '../bs-library/constants/global';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore from '../bs-library/helpers/BsCore';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';
import { setMostEfficientSellerForProduct } from './products';



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
        case actions.SET_CART: return setCart(state, action);
        case actions.ON_ADD_TO_CART: return onAddToCart(state, action);
        default: return state;
    }
};



/* HELPER FUNCS */
// bmd-ish
const isTryingToAddItemWithDifferentSize = (cart, productToAdd, selectedSizeObj) => {

    const cartItems = cart.cartItems;
    for (const ci of cartItems) {
        if (ci.product.id == productToAdd.id) {
            if (ci.selectedSizeAvailability?.id != selectedSizeObj.id) {
                return true;
            }
        }
    }

    return false;
};



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
            if (cartItems?.length >= 0) {
                isValid = true;
                for (const ci of cartItems) {
                    if (typeof (ci?.selectedSizeAvailability) != 'object'
                        || typeof (ci?.product?.mostEfficientSeller) != 'object'
                    ) {
                        isValid = false;
                        break;
                    }

                }

            }

        }
    }

    return isValid;
};


//bmd-ish
const addProductToCart = (product, cart, selectedSizeAvailability) => {
    const cartItem = { id: null, quantity: 1, selectedSizeAvailability: selectedSizeAvailability, product: product };
    cart.cartItems.push(cartItem);
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
        cart = action.callBackData.objs.cart;
    }


    // Set the most-efficient-seller property for every product for cart-items.
    let modifiedCartItems = [];
    if (cart.cartItems) {
        cart.cartItems.forEach(ci => {
            let modifiedCartItem = { ...ci };
            const cartItemProductWithMostEfficientSellerProp = setMostEfficientSellerForProduct(ci.product);
            modifiedCartItem.product = cartItemProductWithMostEfficientSellerProp;
            modifiedCartItems.push(modifiedCartItem);
        });
    }


    cart.cartItems = modifiedCartItems;


    return {
        ...state,
        cart: cart
    };
};



const onAddToCart = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: onAddToCart()");
    Bs.log('action.data ==> ...');
    Bs.log(action.data);

    let oldCart = BsJLS.get('cart') ?? state.cart;
    const productToAdd = action.data.product;
    const selectedSizeObj = action.data.selectedSizeObj;
    let alertMsg = null;

    if (isAlreadyInCart(productToAdd, oldCart)) {
        if (isTryingToAddItemWithDifferentSize(oldCart, productToAdd, selectedSizeObj)) {
            addProductToCart(productToAdd, oldCart, selectedSizeObj);
            alertMsg = 'Item added to cart.';
        }
        else {
            alertMsg = 'Item is already in your cart.';
        }

    }
    else {
        addProductToCart(productToAdd, oldCart, selectedSizeObj);
        alertMsg = 'Item added to cart.';
    }

    const updatedCart = { ...oldCart };
    //bmd-ish: save to local-storage.
    BsJLS.set('cart', updatedCart)
    alert(alertMsg);


    return {
        ...state,
        cart: updatedCart,
    };
};



export default cart;