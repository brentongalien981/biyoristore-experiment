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
        
        helperFuncs.initCartStatusDetailsBasedOnTime();

        switch (helperFuncs.getCartStatus()) {
            case consts.CART_STATUS_AVAILABLE:
            case consts.CART_STATUS_EXTENDING_CART_LIFESPAN:
                if (!helperFuncs.isItTimeToRetryExtendingCartLifespan()) { return; }
                break;
            default:
                return;
        }

        // Check if the current time is 1hr or less before midnight.
        const nowInDateObj = new Date(Date.now());
        if (nowInDateObj.getHours() < consts.END_HOUR_OF_CART_BEING_TOTALLY_AVAILABLE) { return; }



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
                helperFuncs.setCartStatus(consts.HAS_JUST_TRIED_EXTENDING_CART_LIFESPAN);
                helperFuncs.setNumOfTriesExtendingCartLifespan(0);
            }
        };

        helperFuncs.setLatestTimeTryExtendingCartLifespan();
        helperFuncs.incrementNumOfTriesExtendingCartLifespan();
        this.props.tryExtendingCartLifespan(data);
    };



    initCart() {
        let data = {
            bmdHttpRequest: helperFuncs.prepareCartBmdHttpRequestData(),
            doCallBackFunc: () => {
                helperFuncs.setCartStatus(consts.CART_STATUS_AVAILABLE);
                helperFuncs.setNumOfTriesExtendingCartLifespan(0);
            }
        };

        this.props.initCart(data);
    }


    /* MAIN FUNCS */
    componentDidMount() {
        this.initCart();
        setInterval(this.tryExtendingCartLifespan, consts.TRY_EXTENDING_CART_LIFESPAN_INTERVAL_IN_SEC * 1000    );
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