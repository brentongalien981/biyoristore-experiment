/* NAMES */
export const ON_ADD_TO_CART = "ON_ADD_TO_CART";



/* FUNCS */
export const onAddToCart = (event, productId) => ({
    type: ON_ADD_TO_CART,
    event: event,
    productId: productId
});