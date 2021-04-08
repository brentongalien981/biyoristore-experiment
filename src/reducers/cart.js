import * as actions from '../actions/cart';
import * as consts from '../components/cart/constants/consts';
import { RETRIEVED_DATA_FROM_DB, RETRIEVED_DATA_FROM_LOCAL_STORAGE } from '../bs-library/constants/global';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import BsCore from '../bs-library/helpers/BsCore';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';
import { setMostEfficientSellerForProduct } from './products';
import BsCore2 from '../bs-library/helpers/BsCore2';



/** DEFAULTS */
const DEFAULT_CART = { id: 0, cartItems: [] };



/* STATE */
const initialState = {
    cart: { ...DEFAULT_CART }
};



/* REDUCER */
const cart = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_DELETE_CART_ITEM_RETURN: return onDeleteCartItemReturn(state, action);
        case actions.ON_UPDATE_CART_ITEM_COUNT_RETURN: return onUpdateCartItemCountReturn(state, action);
        case actions.ON_ADD_TO_CART_RETURN: return onAddToCartReturn(state, action);
        case actions.ON_INIT_CART_RETURN: return onInitCartReturn(state, action);

        // case actions.SET_CART_ID: return setCartId(state, action);
        case actions.RESET_CART: return resetCart(state, action);
        case actions.SET_CART: return setCart(state, action);
        default: return state;
    }
};



/* HELPER FUNCS */
const addMostEfficientSellerPropToCartItems = (cart) => {
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
};



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
//bmd-ish
const onDeleteCartItemReturn = (state, action) => {

    let updatedCart = state.cart;

    if (action.callBackData.isResultOk) {
        updatedCart = action.callBackData.objs.cart;
        addMostEfficientSellerPropToCartItems(updatedCart);
    } else {
        if (action.callBackData.errorStatusCode == 422) { BsCore2.alertForGeneralError(); }
        else { BsCore2.alertForCallBackDataErrors(action.callBackData); }
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        cart: updatedCart
    };
};



const onUpdateCartItemCountReturn = (state, action) => {

    let updatedCart = state.cart;

    if (action.callBackData.isResultOk) {
        updatedCart = action.callBackData.objs.cart;
        addMostEfficientSellerPropToCartItems(updatedCart);
    } else {
        if (action.callBackData.errorStatusCode == 422) { BsCore2.alertForGeneralError(); }
        else { BsCore2.alertForCallBackDataErrors(action.callBackData); }
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        cart: updatedCart
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



const onInitCartReturn = (state, action) => {

    let cart = { ...DEFAULT_CART };

    if (action.callBackData.isResultOk) {
        cart = action.callBackData.objs.cart;
    }

    addMostEfficientSellerPropToCartItems(cart);


    return {
        ...state,
        cart: cart
    };
};



const onAddToCartReturn = (state, action) => {

    let updatedCart = state.cart;

    switch (action.callBackData.resultCode) {
        case consts.RESULT_CODE_ADD_ITEM_ALREADY_EXISTS:
            alert('This item is already in your cart.');
            break;
        case consts.RESULT_CODE_ADD_ITEM_DATA_MISMATCHES:
            alert('Oops! Invalid cart item.');
            break;
        case consts.RESULT_CODE_ADD_ITEM_SUCCESSFUL:
            alert('Item added to cart.');
            updatedCart = action.callBackData.objs.cart;
            addMostEfficientSellerPropToCartItems(updatedCart);
            break;
        default:
            BsCore2.alertForCallBackDataErrors(action.callBackData);
            break;
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        cart: updatedCart
    };

};



export default cart;