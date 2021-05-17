import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import HeaderLight from './HeaderLight';
import HeaderDark from './HeaderDark';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import { connect } from 'react-redux';
import { initCart } from '../actions/cart';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BmdAuth from '../bs-library/core/BmdAuth';
import TemporaryAlertSystem from '../components/temporary-alert-system/TemporaryAlertSystem';
import { queueAlert } from '../actions/temporaryAlerts';
import * as cartWidgetHelperFuncs from '../components/cart/helper-funcs/HelperFuncsA';
import { CART_STATUS_AVAILABLE } from '../components/cart/constants/consts';
import { clearSensitiveData } from '../actions/appStateManager';




class Header extends React.Component {
    render() {    
        const cartItems = this.props.cart?.cartItems;
        let cartItemsCount = cartItems?.length;
        if (!cartItemsCount) { cartItemsCount = ";)"; }

        if (this.props.location.pathname === "/") {
            return (<HeaderLight onLogout={this.onLogout} cartItemsCount={cartItemsCount} />);
        }
    
        return (<HeaderDark onLogout={this.onLogout} cartItemsCount={cartItemsCount} />);
    }



    onLogout = (e) => {
        e.preventDefault();

        this.clearSensitiveData();

        BmdAuth.clearAuth();
        BmdAuth.resetTemporaryGuestUserId();
        this.initCart();

        const msg = 'See yah later!';
        const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: msg });
        this.props.queueAlert(newAlertObj);

        this.props.history.push("/");
    };


    // BMD-TODO:
    clearSensitiveData() {

        // Clear sensitive data on BsJLS and redux-store.
        this.props.clearSensitiveData();

        // BMD-TODO: Clear sensitive BsJLS & BsJLSOLM search-queries and JLS-objs ie. userOrders?pageNum=3, etc...

    }



    initCart() {
        let data = {
            
            bmdHttpRequest: cartWidgetHelperFuncs.prepareCartBmdHttpRequestData(),
            doCallBackFunc: () => {
                cartWidgetHelperFuncs.setCartStatus(CART_STATUS_AVAILABLE);
                cartWidgetHelperFuncs.setNumOfTriesExtendingCartLifespan(0);
            }
        };

        this.props.initCart(data);
    }
}



const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        clearSensitiveData: () => dispatch(clearSensitiveData()),
        queueAlert: (obj) => dispatch(queueAlert(obj)),
        initCart: (data) => dispatch(initCart(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));