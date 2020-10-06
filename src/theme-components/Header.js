import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import HeaderLight from './HeaderLight';
import HeaderDark from './HeaderDark';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import { connect } from 'react-redux';
import { resetCart } from '../actions/cart';



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
        const userEmail = BsAppSession.get("email");
        BsAppSession.clear();
        BsAppSession.set("email", userEmail);
        BsAppSession.set("isLoggedIn", 0);
        this.props.resetCart();
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
        resetCart: () => dispatch(resetCart())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));