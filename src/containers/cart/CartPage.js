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
    state = {
        isSettingCartItemCount: false,
        isDeletingCartItem: false,
        currentlyEditingCartItemIndex: null,
        currentlyDeletedCartItemIndex: -1
    };



    /* HELPER FUNCS */
    getCartPageItems = (items) => {

        const sortedCartItems = cartWidgetHelperFuncs.sortCartItems(items);

        const itemComponents = sortedCartItems?.map((item, i) => {
            return (
                <CartPageItem item={item} key={i} index={i} onProductClick={this.onProductClick}
                    isDeletingCartItem={this.state.isDeletingCartItem}
                    currentlyDeletedCartItemIndex={this.state.currentlyDeletedCartItemIndex}
                    onRemoveCartItem={this.onRemoveCartItem}
                    isSettingCartItemCount={this.state.isSettingCartItemCount}
                    currentlyEditingCartItemIndex={this.state.currentlyEditingCartItemIndex}
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
    onProductClick = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.history.push('/product?productId=' + productId);
        // this.props.resetProduct();
    };



    onSetCartItemCount = (sellerProductId, sizeAvailabilityId, quantity, index) => {
        if (quantity < 1 || quantity > cartWidgetConsts.MAX_CART_ITEM_QUANTITY) { return; }
        if (this.state.isSettingCartItemCount) { return; }
        this.setState({
            isSettingCartItemCount: true,
            currentlyEditingCartItemIndex: index
        });


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
                this.setState({
                    isSettingCartItemCount: false,
                    currentlyEditingCartItemIndex: null
                });
            }
        };


        this.props.updateCartItemCount(data)
    };



    onCheckout = (e) => {
        e.preventDefault();
        this.props.history.push("/checkout");
    };



    onRemoveCartItem = (e, sellerProductId, sizeAvailabilityId, cartItemIndex) => {
        e.preventDefault();

        if (this.state.isDeletingCartItem) {
            // alert('Please wait, we are deleting the previous item.');
            return;
        }

        this.setState({ 
            isDeletingCartItem: true,
            currentlyDeletedCartItemIndex: cartItemIndex
        });


        const bmdHttpRequestData = cartWidgetHelperFuncs.prepareCartBmdHttpRequestData();

        const data = {
            bmdHttpRequest: bmdHttpRequestData,
            params: {
                ...bmdHttpRequestData.params,
                sellerProductId: sellerProductId,
                sizeAvailabilityId: sizeAvailabilityId
            },
            doCallBackFunc: () => {
                this.setState({ 
                    isDeletingCartItem: false,
                    currentlyDeletedCartItemIndex: -1
                });
            }
        };


        this.props.deleteCartItem(data);
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
        deleteCartItem: (data) => dispatch(actions.deleteCartItem(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));