import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import { setPaymentFinalizationPageEntryCode, finalizeOrder } from '../../actions/checkout';



class PaymentFinalization extends React.Component {

    /* PROPERTIES */
    static HAS_VALID_PAGE_DATA_REQUIREMENTS = false;



    /* HELPER FUNCS */
    checkPageEntryCode() {

        Bs.log("\n\n##############################");
        Bs.log("In METHOD: checkPageEntryCode()...");

        const passedState = this.props.location.state;
        Bs.log("\nthis.props.location.state ==> ...");
        Bs.log(this.props.location.state);

        if (passedState) {

            // Check if loading this webpage is coming from the checkout-page's 
            // order-details confirmation.
            const actualPageEntryCode = this.props.paymentFinalizationPageEntryCode;
            const passedPageEntryCode = passedState.paymentFinalizationPageEntryCode;

            if (!actualPageEntryCode || actualPageEntryCode === "" ||
                !passedPageEntryCode || passedPageEntryCode === "" ||
                actualPageEntryCode !== passedPageEntryCode) {
                return false;
            }


            Bs.log("\nthis.props.paymentFinalizationPageEntryCode ==> " + this.props.paymentFinalizationPageEntryCode);
            Bs.log("this.props.location.state.paymentFinalizationPageEntryCode ==> " + this.props.location.state.paymentFinalizationPageEntryCode);

            return true;

        }

        return false;
    }



    /* MAIN FUNCS */
    componentDidMount() {

        if (PaymentFinalization.HAS_VALID_PAGE_DATA_REQUIREMENTS) {
            this.props.finalizeOrder(this.props.location.state.cartId, this.props.location.state.shippingInfo);
        }
    }



    componentWillUnmount() {
        Bs.log("\n\n##############################");
        Bs.log("In CLASS: PaymentFinalization, METHOD: componentWillUnmount()...");

        this.props.setPaymentFinalizationPageEntryCode();
    }



    constructor(props) {

        super(props);
        Bs.log("\n\n##############################");
        Bs.log("In CLASS: PaymentFinalization, METHOD: constructor()...");

        PaymentFinalization.HAS_VALID_PAGE_DATA_REQUIREMENTS = false;

        if (!this.checkPageEntryCode()) { 
            alert("Please confirm your order details first"); 
            this.props.history.replace("/checkout");
            return; 
        }

        PaymentFinalization.HAS_VALID_PAGE_DATA_REQUIREMENTS = true;
    }



    render() {
        return (
            <section className="hero">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="mb-2">Order Finalizing</h1>
                            <p>Payment successful! We're just finalizing your order. Please wait...</p>
                        </div>
                    </div>

                </div>
            </section>
        );
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        paymentFinalizationPageEntryCode: state.checkout.paymentFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        finalizeOrder: (cartId, shippingInfo) => dispatch(finalizeOrder(cartId, shippingInfo)),
        setPaymentFinalizationPageEntryCode: () => dispatch(setPaymentFinalizationPageEntryCode()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentFinalization));