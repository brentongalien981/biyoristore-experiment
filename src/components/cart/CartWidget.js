import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import * as actions from '../../actions/cart';



class CartWidget extends React.Component {

    componentDidMount() {
        this.props.showCart();
    }



    render() {

        const cartItems = this.props.cart?.cartItems?.map((item, i) => {
            return <CartItem item={item} key={i} />;
        });

        return (
            <div className="modal fade sidebar" id="cart" tabIndex="-1" role="dialog" aria-labelledby="cartLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="cartLabel">Cart</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                        <a href="cart.html" className="btn btn-lg btn-block btn-secondary">View Cart</a>
                                    </div>
                                    <div className="col">
                                        <a href="checkout.html" className="btn btn-lg btn-block btn-primary">Checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}



const mapStateToProps = (state) => {
    return {
        items: state.cart.items,
        cart: state.cart.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showCart: () => dispatch(actions.showCart())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);