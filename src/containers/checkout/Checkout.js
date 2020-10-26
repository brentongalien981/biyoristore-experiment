import React from 'react';
import { withRouter } from 'react-router-dom';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import AddressFormGroup from './AddressFormGroup';
import CheckoutAsWhoModal from './CheckoutAsWhoModal';


class Checkout extends React.Component {

    /* HELPER FUNCS */



    /* MAIN FUNCS */
    componentDidMount() {

        // Show the modal.
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

                        {/* <button onClick={this.goToPayNow}>Pay Now</button> */}
                    </div>
                </section>



                <section className="no-overflow pt-0">
                    <div className="container">
                        <div className="row gutter-4 justify-content-center">
                            <div className="col-lg-10">
                                <AddressFormGroup addressType="shipping" />
                                <AddressFormGroup addressType="billing" />

                            </div>
                        </div>
                    </div>
                </section>

                <CheckoutAsWhoModal login={this.login} dismissModal={this.dismissModal} />
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



export default withRouter(Checkout);