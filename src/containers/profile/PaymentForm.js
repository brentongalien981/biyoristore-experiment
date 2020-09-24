import React from 'react';



function PaymentForm(props) {

    return (
        <>
            {/* payment form banner */}
            <div className="row">
                <div className="col">
                    <h3 className="mb-0">New Payment Method</h3>
                </div>
            </div>

            {/* payment-form */}
            <div className="row gutter-1">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Name on Card</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Expiration Month</label>
                        <select className="custom-select">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Expiration Year</label>
                        <select className="custom-select">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <a href="#!" className="btn btn-primary">Add</a>
                </div>
            </div>

        </>
    );
}



export default PaymentForm;