import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import * as actions from '../../actions/cart';
import Bs from '../../bs-library/helpers/Bs';
import { withRouter } from 'react-router-dom';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import BmdAuth from '../../bs-library/core/BmdAuth';
import WaitLoader from '../loader/WaitLoader';
import BsJLS from '../../bs-library/helpers/BsJLS';
import * as helperFuncs from './helper-funcs/HelperFuncsA';
import * as consts from './constants/consts';



class CartWidget extends React.Component {

    /** PROPS */
    state = {
        isReadingCart: false,
        isDeletingCartItem: false
    };



    /* HELPER FUNCS */
    //bmd-ish
    tryExtendingCartLifespan = () => {

        Bs.log('In CLASS: CartWidget, METHOD: tryExtendingCartLifespan()...');
        //bmd-todo: Also work on when the cart-status gets stuck to CART_STATUS_EXTENDING_CART_LIFESPAN.

        Bs.log('helperFuncs.getCartStatus ==> ' + helperFuncs.getCartStatus());
        if (helperFuncs.getCartStatus() != consts.CART_STATUS_AVAILABLE) { return; }

        // Check if the current time is 1hr or less before midnight.
        const nowInDateObj = new Date(Date.now());
        if (nowInDateObj.getHours() < 12) { return; } //bmd-todo: change to 23.


        helperFuncs.setCartStatus(consts.CART_STATUS_EXTENDING_CART_LIFESPAN);

        const bmdHttpRequestData = helperFuncs.prepareCartBmdHttpRequestData();

        const data = {
            bmdHttpRequest: bmdHttpRequestData,
            params: {
                ...bmdHttpRequestData.params,
                oldTemporaryGuestUserId: BmdAuth.getTemporaryGuestUserId(),
                newTemporaryGuestUserId: BmdAuth.resetTemporaryGuestUserId()
            },
            doCallBackFunc: () => {
                helperFuncs.setCartStatus(consts.CART_STATUS_AVAILABLE);
            }
        };


        this.props.tryExtendingCartLifespan(data);
    };



    initCart() {
        let data = {
            bmdHttpRequest: helperFuncs.prepareCartBmdHttpRequestData()
        };

        this.props.initCart(data);
    }


    /* MAIN FUNCS */
    componentDidMount() {
        this.initCart();
        setInterval(this.tryExtendingCartLifespan, consts.TRY_EXTENDING_CART_LIFESPAN_INTERVAL);
    }



    render() {

        let cartItems = this.props.cart?.cartItems?.map((item, i) => {
            return <CartItem item={item} key={i} index={i} onRemoveCartItem={this.onRemoveCartItem} />;
        });

        if (this.state.isReadingCart) {
            cartItems = (<WaitLoader />);
        }


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


    
    onRemoveCartItem = (e, sellerProductId, sizeAvailabilityId) => {
        e.preventDefault();

        if (this.state.isDeletingCartItem) {
            alert('Please wait, we are deleting the previous item.');
            return;
        }

        this.setState({ isDeletingCartItem: true });


        const bmdHttpRequestData = helperFuncs.prepareCartBmdHttpRequestData();

        const data = {
            bmdHttpRequest: bmdHttpRequestData,
            params: {
                ...bmdHttpRequestData.params,
                sellerProductId: sellerProductId,
                sizeAvailabilityId: sizeAvailabilityId
            },
            doCallBackFunc: () => {
                this.setState({ isDeletingCartItem: false });
            }
        };


        this.props.deleteCartItem(data);
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
        tryExtendingCartLifespan: (data) => dispatch(actions.tryExtendingCartLifespan(data)),
        deleteCartItem: (data) => dispatch(actions.deleteCartItem(data)),
        initCart: (data) => dispatch(actions.initCart(data))
        // showCart: () => dispatch(actions.showCart())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartWidget));