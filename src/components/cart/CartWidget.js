import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import * as actions from '../../actions/cart';
import Bs from '../../bs-library/helpers/Bs';
import { withRouter } from 'react-router-dom';



class CartWidget extends React.Component {

    /* HELPER FUNCS */


    /* MAIN FUNCS */
    componentDidMount() {
        //bmd-ish: init cart.
        this.props.initCart();
        // this.props.showCart();
    }



    render() {

        const cartItems = this.props.cart?.cartItems?.map((item, i) => {
            return <CartItem item={item} key={i} index={i} onRemoveCartItem={this.onRemoveCartItem} />;
        });

        return (
            <div className="modal fade sidebar" id="cart" tabIndex="-1" role="dialog" aria-labelledby="cartLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="cartLabel">Cart</h5>
                            <button id="closeCartWidgetBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="row gutter-3">
                                {cartItems}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row gutter-0">
                                    <div className="col d-none d-md-block">
                                        <a href="#" className="btn btn-lg btn-block btn-secondary" onClick={this.onViewCartPage}>View Cart</a>
                                    </div>
                                    <div className="col">
                                        <a href="#" className="btn btn-lg btn-block btn-primary" onClick={this.onCheckout}>Checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }



    /* EVENT FUNCS */
    onCheckout = (e) => {
        e.preventDefault();
        document.querySelector("#closeCartWidgetBtn").click();
        this.props.history.push("/checkout");
    };



    onViewCartPage = (e) => {
        e.preventDefault();
        document.querySelector("#closeCartWidgetBtn").click();
        this.props.history.push("/cart");
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
        items: state.cart.items,
        cart: state.cart.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCartItem: (cartItemId, cartItemIndex) => dispatch(actions.deleteCartItem(cartItemId, cartItemIndex)),
        initCart: () => dispatch(actions.initCart())
        // showCart: () => dispatch(actions.showCart())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartWidget));