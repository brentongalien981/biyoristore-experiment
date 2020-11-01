import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import AddressFormGroup from './AddressFormGroup';
import AddressOptions from './AddressOptions';
import CheckoutAsWhoModal from './CheckoutAsWhoModal';
import PaymentMethodFormGroup from './PaymentMethodFormGroup';


class Checkout extends React.Component {

    /* HELPER FUNCS */



    /* MAIN FUNCS */
    constructor(props) {
        super(props);

        // if (this.props.cartItems.length < 1) { alert("Add items on your cart first..."); this.props.history.push("/cart"); }
    }



    componentDidMount() {

        // Show the modal.
        const modalBtn = document.querySelector("#checkoutAsWhoModalBtn");
        if (modalBtn) { modalBtn.click(); }

        //
        this.props.readCheckoutRequiredData();
    }



    render() {

        return (
            <>
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Checkout</h1>
                            </div>
                        </div>

                        {/* <button onClick={this.goToPayNow}>Pay Now</button> */}
                    </div>
                </section>



                <section className="no-overflow pt-0">
                    <div className="container">
                        <div className="row gutter-4 justify-content-center">
                            <div className="col-lg-10">
                                <AddressFormGroup addressType="shipping" />
                                <PaymentMethodFormGroup />
                            </div>
                        </div>
                    </div>
                </section>

                <CheckoutAsWhoModal login={this.login} dismissModal={this.dismissModal} />

                {/* ish */}
                <AddressOptions addresses={this.props.addresses} />
            </>
        );
    }



    /* EVENT FUNCS */
    login = () => {
        BsAppSession.set("hasChosenToCheckoutAsWho", 1);
        this.props.history.push("/join?redirectTo=checkout");
    };



    dismissModal = () => {
        BsAppSession.set("hasChosenToCheckoutAsWho", 1);
    };



    goToPayNow = () => {
        this.props.history.push("/payment");
    };
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cart.cartItems,
        addresses: state.checkout.addresses,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readCheckoutRequiredData: () => dispatch(actions.readCheckoutRequiredData()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));