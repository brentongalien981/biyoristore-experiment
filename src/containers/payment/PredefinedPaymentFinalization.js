import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import Bs from '../../bs-library/helpers/Bs';



class PredefinedPaymentFinalization extends React.Component {

    /* PROPERTIES */
    // static ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
    static unblockNavBlocker = null;
    static isPredefinedPaymentFinalizationProcessing = false;



    /* HELPER FUNCS */
    doPostPredefinedPaymentFinalizationProcess() {
        PredefinedPaymentFinalization.unblockNavBlocker();
        PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing = false;
        this.props.endPaymentFinalizationProcess();
    }



    getCartItemsInfo() {
        const cartItems = this.props.location.state.cartItems;
        let info = [];

        cartItems.forEach(i => {
            const item = { id: i.id, productId: i.product.id, quantity: i.quantity };
            info.push(item);
        });

        return info;
    }



    doActualPredefinedPaymentFinalizationProcess() {
        const objs = {
            paymentMethodId: this.props.location.state.paymentMethodId,
            shippingInfo: this.props.location.state.shippingInfo,
            cartItemsInfo: this.getCartItemsInfo()
        };

        this.props.finalizeOrderWithPredefinedPayment(objs);
    }



    enableNavBlocker() {
        // 2 WARNINGS: Warn user from moving away from the page when pay-process has already been dispatched.
        PredefinedPaymentFinalization.unblockNavBlocker = this.props.history.block(() => {
            alert("Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com");
            return false;
        });
        // window.onbeforeunload = () => { return "Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com"; };
    }



    doPrePredefinedPaymentFinalizationProcess() {

        if (PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing) {
            alert("Please wait. We're finalizing your order.");
            return false;
        }

        PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing = true;

        this.enableNavBlocker();
        return true;
    }



    getMsgComponent() {

        let msgHeader = "";
        let msgBody = "";
        let orderLink = null; // BMD-TODO: add order-link.


        switch (this.props.paymentProcessStatusCode) {
            case -1:
                msgHeader = "Oops, sorry...";
                msgBody = (
                    <>
                        Something went wrong on our end. Your payment was not charged.<br />
                        Please try again shortly<br />
                    </>
                );
                break;
            case 0:
                msgHeader = "Please wait...";
                msgBody = "Please wait. We're finalizing your order.";
                break;
            case 1:
                msgHeader = "Oops, sorry...";
                msgBody = (
                    <>
                        We couldn't process your payment. Your payment was not charged.<br />
                        Please use another card <Link to="/checkout">here and try again.</Link><br />
                    </>
                );
                break;
            case 2:
                msgHeader = "Payment Successful!";
                msgBody = (
                    <>
                        We've received your payment and now processing your order.<br />
                        If you have any questions or want to cancel your order before it's shipped,<br />
                        please contact our Customer Service at <b style={{ color: "orangered" }}>customerservice@anyshotbasketball.com</b>
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



    checkPageEntryCode() {

        const passedState = this.props.location.state;

        if (passedState) {
            // Check if loading this webpage is coming from the checkout-page's 
            // order-details confirmation.
            const actualPageEntryCode = this.props.actualPageEntryCode;
            const passedPageEntryCode = passedState.pageEntryCode;

            if (!actualPageEntryCode || actualPageEntryCode === "" ||
                !passedPageEntryCode || passedPageEntryCode === "" ||
                actualPageEntryCode !== passedPageEntryCode) {
                return false;
            }

            return true;

        }

        return false;
    }



    /* MAIN FUNCS */
    componentWillUnmount() {
        if (PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing) {
            alert("Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com");
            return;
        }

        this.props.setPredefinedPaymentFinalizationPageEntryCode();
    }



    componentDidUpdate() {
        if (this.props.shouldDoPostPaymentFinalizationProcess) {
            this.doPostPredefinedPaymentFinalizationProcess();
        }
    }



    componentDidMount() {
        
        if (!this.checkPageEntryCode()) { 
            alert("Please confirm your order first.");
            this.props.history.replace("/checkout");
            return; 
        }

        this.props.resetFinalizationObjs();

        if (!this.doPrePredefinedPaymentFinalizationProcess()) { return; }

        this.doActualPredefinedPaymentFinalizationProcess();
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
        paymentProcessStatusCode: state.checkout.paymentProcessStatusCode,
        shouldDoPostPaymentFinalizationProcess: state.checkout.shouldDoPostPaymentFinalizationProcess,
        orderProcessStatusCode: state.checkout.orderProcessStatusCode,
        actualPageEntryCode: state.checkout.predefinedPaymentFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setPredefinedPaymentFinalizationPageEntryCode: () => dispatch(actions.setPredefinedPaymentFinalizationPageEntryCode()),
        endPaymentFinalizationProcess: () => dispatch(actions.endPaymentFinalizationProcess()),
        finalizeOrderWithPredefinedPayment: (objs) => dispatch(actions.finalizeOrderWithPredefinedPayment(objs)),
        resetFinalizationObjs: () => dispatch(actions.resetFinalizationObjs()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PredefinedPaymentFinalization));