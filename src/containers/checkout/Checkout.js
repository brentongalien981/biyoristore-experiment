import React from 'react';
import { withRouter } from 'react-router-dom';
import BsAppSession from '../../bs-library/helpers/BsAppSession';


class Checkout extends React.Component {

    /* HELPER FUNCS */
    getCheckoutAsWhoModal() {

        if (BsAppSession.get("hasChosenToCheckoutAsWho") == 1) { return null; }

        return (

            <>
                <button type="button" id="checkoutAsWhoModalBtn" style={{ display: "none" }} className="btn btn-primary" data-toggle="modal" data-target="#checkoutAsWhoModal">Launch modal</button>

                <div className="modal fade" id="checkoutAsWhoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4>Checkout as guest?</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.dismissModal}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div className="modal-footer">
                                <div className="container-fluid">
                                    <div className="row gutter-0">
                                        <div className="col">
                                            <button type="button" className="btn btn-block btn-secondary" data-dismiss="modal" onClick={this.dismissModal}>Yes</button>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="btn btn-block btn-primary" data-dismiss="modal" onClick={this.login}>I have an account</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }



    /* MAIN FUNCS */
    componentDidMount() {
        const modalBtn = document.querySelector("#checkoutAsWhoModalBtn");
        if (modalBtn) { modalBtn.click(); }
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

                        <button onClick={this.goToPayNow}>Pay Now</button>
                    </div>
                </section>

                {this.getCheckoutAsWhoModal()}
            </>
        );
    }



    /* EVENT FUNCS */
    login = () => {
        BsAppSession.set("hasChosenToCheckoutAsWho", 1);
        this.props.history.push("/join");
    };



    dismissModal = () => {
        BsAppSession.set("hasChosenToCheckoutAsWho", 1);
    };



    goToPayNow = () => {
        this.props.history.push("/payment");
    };
}



export default withRouter(Checkout);