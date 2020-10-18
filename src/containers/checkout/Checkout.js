import React from 'react';
import { withRouter } from 'react-router-dom';


class Checkout extends React.Component {

    /* HELPER FUNCS */



    /* MAIN FUNCS */
    render() {
        return (
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
        );
    }



    /* EVENT FUNCS */
    goToPayNow = () => {
        this.props.history.push("/payment");
    };
}



export default withRouter(Checkout);