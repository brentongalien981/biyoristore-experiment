import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import { setPaymentFinalizationPageEntryCode, finalizeOrder, resetFinalizationObjs, endPaymentFinalizationProcess } from '../../actions/checkout';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { COMPANY_CUSTOMER_SERVICE_EMAIL } from '../../bs-library/constants/global';



class PaymentFinalization extends React.Component {

    /* PROPERTIES */
    static ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
    static unblockNavBlocker = null;
    static isPaymentFinalizationProcessing = false;



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



    enableNavBlocker() {
        // 2 WARNINGS: Warn user from moving away from the page when pay-process has already been dispatched.
        PaymentFinalization.unblockNavBlocker = this.props.history.block(() => {
            alert("Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com");
            return false;
        });
        // window.onbeforeunload = () => { return "Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com"; };
    }



    doPrePaymentFinalizationProcess() {
        if (!PaymentFinalization.ARE_PAGE_DATA_REQUIREMENTS_VALID) { return false; }

        if (PaymentFinalization.isPaymentFinalizationProcessing) {
            alert("Please wait. We're finalizing your order.");
            return false;
        }

        PaymentFinalization.isPaymentFinalizationProcessing = true;

        this.enableNavBlocker();
        return true;
    }


    // BMD-ISH
    doActualPaymentFinalizationProcess() {
        this.props.finalizeOrder(this.props.location.state.cartId, this.props.location.state.shippingInfo);
    }



    doPostPaymentFinalizationProcess() {
        PaymentFinalization.unblockNavBlocker();
        PaymentFinalization.isPaymentFinalizationProcessing = false;
        this.props.endPaymentFinalizationProcess();
    }



    getMsgComponent() {

        let msgHeader = "";
        let msgBody = "";
        let orderLink = null; // bmd-todo:LATER add order-link.


        switch (this.props.orderProcessStatusCode) {
            case 0:
                msgBody = "Please wait. We're finalizing your order.";
                break;
            default:
                msgHeader = "Payment Successful!";
                msgBody = (
                    <>
                        We've received your payment and now processing your order.<br />
                        If you have any questions or want to cancel your order before it's shipped,<br />
                        please contact our Customer Service at <b style={{ color: "orangered" }}>{COMPANY_CUSTOMER_SERVICE_EMAIL}</b>
                    </>
                );
                break;
        }

        return (
            <>
                <h1 className="mb-2">{msgHeader}</h1>
                <p>{msgBody}</p>
            </>
        );
    }



    /* MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.shouldDoPostPaymentFinalizationProcess) {
            this.doPostPaymentFinalizationProcess();
        }
    }



    componentDidMount() {
        if (!this.doPrePaymentFinalizationProcess()) { return; }
        this.doActualPaymentFinalizationProcess();
    }



    componentWillUnmount() {
        Bs.log("\n\n##############################");
        Bs.log("In CLASS: PaymentFinalization, METHOD: componentWillUnmount()...");

        if (PaymentFinalization.isPaymentFinalizationProcessing) {
            alert("Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com");
            return;
        }

        this.props.setPaymentFinalizationPageEntryCode();

        if (PaymentFinalization.unblockNavBlocker?.()) { }
        
    }



    constructor(props) {
        super(props);
        Bs.log("\n\n##############################");
        Bs.log("In CLASS: PaymentFinalization, METHOD: constructor()...");

        PaymentFinalization.ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
        PaymentFinalization.isPaymentFinalizationProcessing = false;

        if (!this.checkPageEntryCode()) {
            alert("Please confirm your order details first");
            this.props.history.replace("/checkout");
            return;
        }

        PaymentFinalization.ARE_PAGE_DATA_REQUIREMENTS_VALID = true;
        this.props.resetFinalizationObjs();
    }



    render() {

        let msgComponent = this.getMsgComponent();

        return (
            <section className="hero" style={{ paddingTop: "200px", paddingBottom: "300px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {msgComponent}
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
        // isThereError: state.checkout.isThereError,
        orderProcessStatusCode: state.checkout.orderProcessStatusCode,
        // shouldDisplayFinalizationMsg: state.checkout.shouldDisplayFinalizationMsg,
        shouldDoPostPaymentFinalizationProcess: state.checkout.shouldDoPostPaymentFinalizationProcess,
        paymentFinalizationPageEntryCode: state.checkout.paymentFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        endPaymentFinalizationProcess: () => dispatch(endPaymentFinalizationProcess()),
        resetFinalizationObjs: () => dispatch(resetFinalizationObjs()),
        finalizeOrder: (cartId, shippingInfo) => dispatch(finalizeOrder(cartId, shippingInfo)),
        setPaymentFinalizationPageEntryCode: () => dispatch(setPaymentFinalizationPageEntryCode()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentFinalization));