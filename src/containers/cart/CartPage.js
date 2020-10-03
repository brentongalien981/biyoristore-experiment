import React from 'react';
import { connect } from 'react-redux';
import CartPageItem from './CartPageItem';
import OrderSummary from './OrderSummary';
import * as actions from '../../actions/cart';
import Bs from '../../bs-library/helpers/Bs';



class CartPage extends React.Component {

    /* HELPER FUNCS */
    getCartPageItems = (items) => {
        const itemComponents = items?.map((item, i) => {
            return <CartPageItem item={item} key={i} index={i} onRemoveCartItem={this.onRemoveCartItem}  />
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
                            <OrderSummary items={this.props.cart.cartItems} />
                        </div>

                    </div>
                </section>

            </>
        );
    }



    /* EVENT FUNCS */
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
        showCart: () => dispatch(actions.showCart()),
        deleteCartItem: (cartItemId, cartItemIndex) => dispatch(actions.deleteCartItem(cartItemId, cartItemIndex)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(CartPage);