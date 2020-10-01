import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import HeaderLight from './HeaderLight';
import HeaderDark from './HeaderDark';
import BsAppSession from '../bs-library/helpers/BsAppSession';
import { connect } from 'react-redux';



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
        BsAppSession.set("isLoggedIn", 0);
        this.props.history.push("/");
    };
}



const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
    };
};


export default connect(mapStateToProps, null)(withRouter(Header));