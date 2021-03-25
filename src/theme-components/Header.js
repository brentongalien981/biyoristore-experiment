import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import HeaderLight from './HeaderLight';
import HeaderDark from './HeaderDark';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import { connect } from 'react-redux';
import { resetCart } from '../actions/cart';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BmdAuth from '../bs-library/core/BmdAuth';
import TemporaryAlertSystem from '../components/temporary-alert-system/TemporaryAlertSystem';
import { queueAlert } from '../actions/temporaryAlerts';




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
        BmdAuth.clearAuth();
        this.props.resetCart();

        const msg = 'See yah later!';
        const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: msg });
        this.props.queueAlert(newAlertObj);

        this.props.history.push("/");
    };
}



const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        queueAlert: (obj) => dispatch(queueAlert(obj)),
        resetCart: () => dispatch(resetCart()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));