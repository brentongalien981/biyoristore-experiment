import React from 'react';
import { connect } from 'react-redux';
import CartPageItem from './CartPageItem';
import OrderSummary from './OrderSummary';
import * as actions from '../../actions/cart';
import Bs from '../../bs-library/helpers/Bs';
import { withRouter } from 'react-router-dom';
import * as cartWidgetHelperFuncs from '../../components/cart/helper-funcs/HelperFuncsA';
import * as cartWidgetConsts from '../../components/cart/constants/consts';



class CartPage extends React.Component {

    /** PROPS */
    state = { isSettingCartItemCount: false };



    /* HELPER FUNCS */
    getCartPageItems = (items) => {
        const itemComponents = items?.map((item, i) => {
            return (
                <CartPageItem item={item} key={i} index={i} onRemoveCartItem={this.onRemoveCartItem}
                    onSetCartItemCount={this.onSetCartItemCount} />
            );
        });

        return itemComponents;
    };



    /* MAIN FUNCS */
    render() {
        return (
            <>
                {/* page header */}
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Your Cart</h1>
                            </div>
                        </div>
                    </div>
                </section>


                {/* main section */}
                <section className="pt-0">
                    <div className="container">

                        {/* cart-items-table-header */}
                        <div className="row mb-1 d-none d-lg-flex">
                            <div className="col-lg-8">
                                <div className="row pr-6">
                                    <div className="col-lg-6"><span className="eyebrow">Product</span></div>
                                    <div className="col-lg-2 text-center"><span className="eyebrow">Price</span></div>
                                    <div className="col-lg-2 text-center"><span className="eyebrow">Quantity</span></div>
                                    <div className="col-lg-2 text-center"><span className="eyebrow">Total</span></div>
                                </div>
                            </div>
                        </div>


                        <div className="row gutter-2 gutter-lg-4 justify-content-end">

                            {/* cart items */}
                            <div className="col-lg-8 cart-item-list">
                                {this.getCartPageItems(this.props.cart.cartItems)}
                            </div>

                            {/* order summary */}
                            <OrderSummary items={this.props.cart.cartItems} onCheckout={this.onCheckout} />
                        </div>

                    </div>
                </section>

            </>
        );
    }



    /* EVENT FUNCS */
    //bmd-ish
    onSetCartItemCount = (sellerProductId, sizeAvailabilityId, quantity, index) => {
        if (quantity < 1 || quantity > cartWidgetConsts.MAX_CART_ITEM_QUANTITY) { return; }
        if (this.state.isSettingCartItemCount) { alert("Oops, we're processing your previous input. Please try again shortly."); return; }
        this.setState({ isSettingCartItemCount: true });

        
        const bmdHttpRequestData = cartWidgetHelperFuncs.prepareCartBmdHttpRequestData();

        const data = {
            bmdHttpRequest: bmdHttpRequestData,
            params: {
                ...bmdHttpRequestData.params,
                sellerProductId: sellerProductId,
                sizeAvailabilityId: sizeAvailabilityId,
                quantity: quantity,
                index: index
            },
            doCallBackFunc: () => {
                this.setState({ isSettingCartItemCount: false });
            }
        };


        this.props.updateCartItemCount(data)
    };



    onCheckout = (e) => {
        e.preventDefault();
        this.props.history.push("/checkout");
    };



    onRemoveCartItem = (e, cartItemId, cartItemIndex) => {
        Bs.log("\n####################");
        Bs.log("In METHOD: onRemoveCartItem()");
        e.preventDefault();
        Bs.log("cartItemId ==> " + cartItemId);
        Bs.log("index ==> " + cartItemIndex);

        this.props.deleteCartItem(cartItemId, cartItemIndex);
    };
}



const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        updateCartItemCount: (data) => dispatch(actions.updateCartItemCount(data)),
        showCart: () => dispatch(actions.showCart()),
        deleteCartItem: (cartItemId, cartItemIndex) => dispatch(actions.deleteCartItem(cartItemId, cartItemIndex)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));