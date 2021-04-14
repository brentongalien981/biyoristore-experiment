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
import BmdAuth from '../../bs-library/core/BmdAuth';


class Checkout extends React.Component {

    /* PROPERTIES */
    static BLANK_ADDRESS = { firstName: "", lastName: "", street: "", city: "", province: "", country: "", postalCode: "", email: "", phone: "" };

    state = {
        address: { ...Checkout.BLANK_ADDRESS },
        paymentMethod: {},
        shipmentRate: {}
    };



    /* HELPER FUNCS */
    goToCheckoutFinalizationPage() {
        const redirectPage = "/checkout-finalization";
        const redirectPageDataRequirements = {
            pageEntryCode: this.props.checkoutFinalizationPageEntryCode
        };

        this.props.history.push(redirectPage, redirectPageDataRequirements);
    }



    showShippingOptions() {
        document.querySelector("#ShippingOptionsTriggerBtn").click();
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
    componentDidUpdate() {
        if (this.props.shouldDoGetShippingRatesPostProcess) {

            this.setState({ nonClosableLoader: null });

            if (this.props.shouldShowShippingDetails) {
                this.showShippingOptions();
            }

            this.props.doGetShippingRatesFinalizationProcess();
        }


        if (this.props.shouldGoToCheckoutFinalizationPage) {
            this.goToCheckoutFinalizationPage();
        }
    }


    
    componentDidMount() {

        this.props.resetReducerInitVars();

        // Show the modal.
        const modalBtn = document.querySelector("#checkoutAsWhoModalBtn");
        if (modalBtn) { modalBtn.click(); }

        //bmd-ish: Edit the workflow.
        if (BmdAuth.isLoggedIn()) { this.props.readCheckoutRequiredData(); }

        //bmd-todo: Move this to a more generic method "setOnlyAllowableDestinationPagesEntryCode()".
        this.props.setCheckoutFinalizationPageEntryCode();
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
                <ShippingOptions shippingRates={this.props.efficientShipmentRates} cartItems={this.props.cartItems} onShippingOptionConfirm={this.onShippingOptionConfirm} onShippingOptionChange={this.onShippingOptionChange} />

            </>
        );
    }



    /* EVENT FUNCS */
    onShippingOptionChange = (e, r) => {
        this.setState({ shipmentRate: r });
    };



    onShippingOptionConfirm = () => {

        // If user confirms without selection, re-show the options.
        if (!this.state.shipmentRate || this.state.shipmentRate.id == null || this.state.shipmentRate.id === "") {

            alert("Please select a shipping option.");

            setTimeout(() => {
                document.querySelector("#ShippingOptionsTriggerBtn").click();
            }, 200);

            return;
        }

        this.props.setShipmentRate(this.state.shipmentRate);
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


        // check shipping validity and get shipment-rates
        const items = this.props.cartItems;
        let reducedCartItemsData = [];
        for (const i of items) {
            const reducedCartItem = { productId: i.product.id, quantity: i.quantity, packageItemTypeId: i.product.packageItemTypeId };
            reducedCartItemsData.push(reducedCartItem);
        }


        const params = {
            reducedCartItemsData: reducedCartItemsData,
            shippingInfo: this.state.address,
            paymentMethod: this.state.paymentMethod
        };

        this.props.getShippingRates(params);
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

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedAddress = this.state.address;
        updatedAddress[name] = value;

        this.setState({ address: updatedAddress });
    };



    onPaymentMethodSelectionChange = (paymentMethod) => {
        this.setState({ paymentMethod: paymentMethod });
    };



    onAddressSelectionChange = (a) => {
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
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shouldGoToCheckoutFinalizationPage: state.checkout.shouldGoToCheckoutFinalizationPage,
        canSelectShippingOption: state.checkout.canSelectShippingOption,
        efficientShipmentRates: state.checkout.efficientShipmentRates,
        shouldDoGetShippingRatesPostProcess: state.checkout.shouldDoGetShippingRatesPostProcess,
        shouldShowShippingDetails: state.checkout.shouldShowShippingDetails,
        checkoutFinalizationPageEntryCode: state.checkout.checkoutFinalizationPageEntryCode,
        cart: state.cart.cart,
        cartItems: state.cart.cart.cartItems,
        profile: state.checkout.profile,
        addresses: state.checkout.addresses,
        paymentInfos: state.checkout.paymentInfos,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setShipmentRate: (shipmentRate) => dispatch(actions.setShipmentRate(shipmentRate)),
        resetReducerInitVars: () => dispatch(actions.resetReducerInitVars()),
        doGetShippingRatesFinalizationProcess: () => dispatch(actions.doGetShippingRatesFinalizationProcess()),
        getShippingRates: (params) => dispatch(actions.getShippingRates(params)),
        // onAddressSelectionChange: (e, i) => dispatch(actions.onAddressSelectionChange(e, i)),
        setCheckoutFinalizationPageEntryCode: () => dispatch(actions.setCheckoutFinalizationPageEntryCode()),
        readCheckoutRequiredData: () => dispatch(actions.readCheckoutRequiredData()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));