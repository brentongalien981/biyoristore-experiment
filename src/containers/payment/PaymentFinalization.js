import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import { setPaymentFinalizationPageEntryCode, finalizeOrder, resetFinalizationMsg } from '../../actions/checkout';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



class PaymentFinalization extends React.Component {

    /* PROPERTIES */
    static HAS_VALID_PAGE_DATA_REQUIREMENTS = false;
    static unblockHistoryNavigation = null;



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



    setWarningForHistoryNavChange() {
        // 2 WARNINGS: Warn user from moving away from the page when pay-process has already been dispatched.
        PaymentFinalization.unblockHistoryNavigation = this.props.history.block(() => {
            alert("Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com");
            return false;
        });
        // window.onbeforeunload = () => { return "Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com"; };
    }



    /* MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.shouldDisplayFinalizationMsg) {
            PaymentFinalization.unblockHistoryNavigation();
        }
    }



    componentDidMount() {

        this.props.resetFinalizationMsg();

        if (PaymentFinalization.HAS_VALID_PAGE_DATA_REQUIREMENTS) {
            this.props.finalizeOrder(this.props.location.state.cartId, this.props.location.state.shippingInfo);

            this.setWarningForHistoryNavChange();
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

        let msgComponent = (<p className="lead">Please wait. We're finalizing your order.</p>);
        let orderLink = null;

        if (this.props.shouldDisplayFinalizationMsg) {

            if (this.props.isThereError) {
                msgComponent = (
                    <>
                        <h1 className="mb-2">Order Error!</h1>
                        <p>
                            We've received your payment, but couldn't finalize your order.<br />
                            Please contact our Customer Service at <b style={{ color: "orangered" }}>customerservice@anyshotbasketball.com</b> to finalize your order.
                        </p>
                    </>
                );
            }
            else {
                msgComponent = (
                    <>
                        <h1 className="mb-2">Order Successful!</h1>
                        <p>
                            We've received your order and sent you an email for your info.<br />
                            Should you want to cancel your order before shipping, please contact our<br />
                            Customer Service at <b style={{ color: "orangered" }}>customerservice@anyshotbasketball.com</b>
                        </p>
                    </>
                );

                if (BsAppSession.isLoggedIn()) { orderLink = (<Link to="#">TODO: Link this to the order.</Link>); }
            }

        }



        return (
            <section className="hero" style={{ paddingTop: "200px", paddingBottom: "300px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {msgComponent}
                            {orderLink}
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
        isThereError: state.checkout.isThereError,
        shouldDisplayFinalizationMsg: state.checkout.shouldDisplayFinalizationMsg,
        paymentFinalizationPageEntryCode: state.checkout.paymentFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetFinalizationMsg: () => dispatch(resetFinalizationMsg()),
        finalizeOrder: (cartId, shippingInfo) => dispatch(finalizeOrder(cartId, shippingInfo)),
        setPaymentFinalizationPageEntryCode: () => dispatch(setPaymentFinalizationPageEntryCode()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentFinalization));