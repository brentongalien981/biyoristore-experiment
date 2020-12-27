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
import OrderDetailsSummaryModal from './OrderDetailsSummaryModal';
import Loader from '../../components/loader/Loader';
import NonClosableLoader from '../../components/loader/NonClosableLoader';
import ShippingOptions from './ShippingOptions';


class Checkout extends React.Component {

    /* HELPER FUNCS */
    isPaymentMethodPredefined() {
        if (this.state.paymentMethod.id != null && this.state.paymentMethod.id !== 0) { return true; }
        return false;
    }



    validateFields = (obj) => {

        let returnObj = { isObjValid: true, msg: "" };

        for (const field in obj) {
            const val = obj[field];

            if (field === "id" || field === "isBlankAddress") { continue; }

            if (!val || val.trim().length === 0) {
                returnObj.isObjValid = false;
                returnObj.msg += field + " can not be empty.\n";
            }
        }

        return returnObj;
    };



    /* MAIN FUNCS */
    static BLANK_ADDRESS = { firstName: "", lastName: "", street: "", city: "", province: "", country: "", postalCode: "", email: "", phone: "" };

    state = {
        address: { ...Checkout.BLANK_ADDRESS },
        paymentMethod: {}
    };



    componentDidUpdate() {
        //ish
        if (this.props.shouldShowShippingDetails) {

            // of all the order-items, get the product-seller that has the slowest restock-time
            const items = this.props.cartItems;
            let slowestItemToRestock = null;
            let slowestRestockDays = 0;

            for (const i of items) {
                if (i.product.mostEfficientSeller.productSeller.restock_days >= slowestRestockDays) {
                    slowestItemToRestock = i;
                    slowestRestockDays = i.product.mostEfficientSeller.productSeller.restock_days;
                }
            }

            // set estimate-shipping-time
            let i = 1;
            for (const r of this.props.efficientShipmentRates) {
                const estimateShippingTime = slowestRestockDays + r.delivery_days;
                Bs.log("shipment " + i + " => " + r.service + " => " + estimateShippingTime + " days => $" + r.rate + " " + r.currency);
                ++i;
            }

            this.setState({ nonClosableLoader: null });

            // TODO: show shipping-options
            document.querySelector("#ShippingOptionsTriggerBtn").click();




            // TODO: show order details summary.
            // document.querySelector("#OrderDetailsSummaryModalTriggerBtn").click();

            this.props.finalizeShowShippingDetails();
        }
    }


    componentDidMount() {

        if (this.props.cartItems.length === 0) {
            alert("Please add items to your cart before checkout.");
            this.props.history.replace("/products");
            return;
        }

        // Show the modal.
        const modalBtn = document.querySelector("#checkoutAsWhoModalBtn");
        if (modalBtn) { modalBtn.click(); }

        //
        if (BsAppSession.isLoggedIn()) { this.props.readCheckoutRequiredData(); }

        //
        this.props.setPredefinedPaymentFinalizationPageEntryCode();
        this.props.setPaymentPageEntryCode();
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
                                <PaymentMethodFormGroup paymentMethod={this.state.paymentMethod} numOfPaymentMethods={this.props.paymentInfos.length} onPaymentMethodInputChange={this.onPaymentMethodInputChange} />
                            </div>

                            <aside className="col-lg-4">
                                <div className="row">
                                    <CartSummary cartItems={this.props.cartItems} />
                                    <OrderSummary cartItems={this.props.cartItems} />

                                    <div className="col-12 mt-1">
                                        <a href="#!" className="btn btn-primary btn-lg btn-block" onClick={this.onOrderPlace}>Place Order</a>
                                    </div>

                                </div>
                            </aside>

                        </div>
                    </div>
                </section>

                <AddressOptions addresses={this.props.addresses} onAddressSelectionChange={this.onAddressSelectionChange} />
                <PaymentMethodOptions paymentInfos={this.props.paymentInfos} onPaymentMethodSelectionChange={this.onPaymentMethodSelectionChange} />

                <CheckoutAsWhoModal login={this.login} dismissModal={this.dismissModal} />
                {this.state.nonClosableLoader}
                <ShippingOptions shippingRates={this.props.efficientShipmentRates} />
                <OrderDetailsSummaryModal address={this.state.address} onOrderDetailsConfirm={this.onOrderDetailsConfirm} />

            </>
        );
    }



    /* EVENT FUNCS */
    onOrderDetailsConfirm = () => {

        Bs.log("\n\n##############################");
        Bs.log("In METHOD: onOrderDetailsConfirm()");

        //
        let redirectPage = "/payment";
        let redirectPageDataRequirements = {};


        if (this.isPaymentMethodPredefined()) {

            Bs.log("payment method is predefined, redirect to predefined-payment-page");

            // set redirect-page's data-requirements
            redirectPage = "/predefined-payment-finalization";
            redirectPageDataRequirements = {
                pageEntryCode: this.props.predefinedPaymentFinalizationPageEntryCode,
                paymentMethodId: this.state.paymentMethod.id,
                shippingInfo: this.state.address,
                cartItems: this.props.cartItems,
            };
        }
        else {

            //
            Bs.log("payment method is NOT predefined, redirect to payment-page");

            // set payment-page's data-requirements
            redirectPageDataRequirements = {
                cartItems: this.props.cartItems,
                shippingAddress: this.state.address,
                paymentPageEntryCode: this.props.paymentPageEntryCode
            };
        }


        //
        Bs.log("redirectPageDataRequirements ==> ...");
        Bs.log(redirectPageDataRequirements);

        // redirect
        this.props.history.push(redirectPage, redirectPageDataRequirements);


    };



    onOrderPlace = (e) => {
        e.preventDefault();
        Bs.log("In METHOD: onOrderPlace()");

        let returnObj = this.validateFields(this.state.address);

        // check that address fields are filled
        if (!returnObj.isObjValid) {
            alert(returnObj.msg);
            return;
        }


        // show loader
        this.setState({ nonClosableLoader: <NonClosableLoader msg="Please wait... We're looking for your shipping options." /> });


        // check shipping validity
        const items = this.props.cartItems;
        // for (const i of items) {
        //     Bs.log("i.product.mostEfficientSeller.name ==> " + i.product.mostEfficientSeller.name);
        // }
        this.props.testGetShippingRates(items);


    };



    onPaymentMethodInputChange = (e) => {
        Bs.log("In METHOD: onPaymentMethodInputChange()");

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedPaymentMethod = this.state.paymentMethod;
        updatedPaymentMethod[name] = value;

        this.setState({ paymentMethod: updatedPaymentMethod });
    };



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
        if (a.isBlankAddress) { a = { ...a, ...Checkout.BLANK_ADDRESS }; }
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
        efficientShipmentRates: state.checkout.efficientShipmentRates,
        shouldShowShippingDetails: state.checkout.shouldShowShippingDetails,
        predefinedPaymentFinalizationPageEntryCode: state.checkout.predefinedPaymentFinalizationPageEntryCode,
        paymentPageEntryCode: state.checkout.paymentPageEntryCode,
        cart: state.cart.cart,
        cartItems: state.cart.cart.cartItems,
        profile: state.checkout.profile,
        addresses: state.checkout.addresses,
        paymentInfos: state.checkout.paymentInfos,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        finalizeShowShippingDetails: () => dispatch(actions.finalizeShowShippingDetails()),
        // TODO: change the name
        testGetShippingRates: (items) => dispatch(actions.testGetShippingRates(items)),
        // onAddressSelectionChange: (e, i) => dispatch(actions.onAddressSelectionChange(e, i)),
        setPredefinedPaymentFinalizationPageEntryCode: () => dispatch(actions.setPredefinedPaymentFinalizationPageEntryCode()),
        setPaymentPageEntryCode: () => dispatch(actions.setPaymentPageEntryCode()),
        readCheckoutRequiredData: () => dispatch(actions.readCheckoutRequiredData()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));