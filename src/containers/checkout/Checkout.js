import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import OrderSummary from './OrderSummary';
import AddressFormGroup from './AddressFormGroup';
import AddressOptions from './AddressOptions';
import CartSummary from './CartSummary';
import CheckoutAsWhoModal from './CheckoutAsWhoModal';
import PaymentMethodFormGroup from './PaymentMethodFormGroup';
import PaymentMethodOptions from './PaymentMethodOptions';
import Bs from '../../bs-library/helpers/Bs';


class Checkout extends React.Component {

    /* HELPER FUNCS */



    /* MAIN FUNCS */
    state = {
        address: {},
        paymentMethod: {}
    };

    componentDidMount() {

        // Show the modal.
        const modalBtn = document.querySelector("#checkoutAsWhoModalBtn");
        if (modalBtn) { modalBtn.click(); }

        //
        if (BsAppSession.isLoggedIn()) { this.props.readCheckoutRequiredData(); }
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
                        <div className="row gutter-4 justify-content-between">

                            <div className="col-lg-8">
                                <AddressFormGroup address={this.state.address} addressType="shipping" numOfAddresses={this.props.addresses.length} onOrderInputChange={this.onOrderInputChange} />
                                <PaymentMethodFormGroup paymentMethod={this.state.paymentMethod} numOfPaymentMethods={this.props.paymentInfos.length} />
                            </div>

                            <aside className="col-lg-4">
                                <div className="row">
                                    <CartSummary cartItems={this.props.cartItems} />
                                    <OrderSummary cartItems={this.props.cartItems} />

                                    <div className="col-12 mt-1">
                                        <a href="#!" className="btn btn-primary btn-lg btn-block">Place Order</a>
                                    </div>

                                </div>
                            </aside>

                        </div>
                    </div>
                </section>

                <CheckoutAsWhoModal login={this.login} dismissModal={this.dismissModal} />

                <AddressOptions addresses={this.props.addresses} onAddressSelectionChange={this.onAddressSelectionChange} />
                <PaymentMethodOptions paymentInfos={this.props.paymentInfos} onPaymentMethodSelectionChange={this.onPaymentMethodSelectionChange} />
            </>
        );
    }



    /* EVENT FUNCS */
    //ish
    onOrderInputChange = (e) => {
        Bs.log("In METHOD: onOrderInputChange()");

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedAddress = this.state.address;
        updatedAddress[name] = value;

        this.setState({ address: updatedAddress });
    };



    onPaymentMethodSelectionChange = (paymentMethod) => {
        Bs.log("In METHOD: onPaymentMethodSelectionChange()");
        Bs.log("paymentMethod ==> ...");
        Bs.log(paymentMethod);

        this.setState({ paymentMethod: paymentMethod });
    };



    onAddressSelectionChange = (a) => {
        Bs.log("In EVENT: onAddressSelectionChange()");
        if (a.isBlankAddress) { a = { ...a, firstName: "" }; }
        this.setState({ address: a });
    };



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
        profile: state.checkout.profile,
        addresses: state.checkout.addresses,
        paymentInfos: state.checkout.paymentInfos,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        // onAddressSelectionChange: (e, i) => dispatch(actions.onAddressSelectionChange(e, i)),
        readCheckoutRequiredData: () => dispatch(actions.readCheckoutRequiredData()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));