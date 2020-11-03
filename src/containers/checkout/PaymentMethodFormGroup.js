import React from 'react';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



export default function PaymentMethodFormGroup(props) {

    return (
        <>
            <div className="row align-items-end mb-2">
                <div className="col-md-6">
                    <h2 className="h3 mb-0">Payment Method</h2>
                </div>
                {getMyPaymentMethodsBtn(props.numOfPaymentMethods)}
            </div>


            <div className="row gutter-1 mb-6">

                <div className="form-group col-md-6">
                    <label>Card Number</label>
                    <input type="number" className="form-control" name="cardNumber" />
                </div>

                <div className="form-group col-md-3">
                    <label>Expiration Month</label>
                    <input type="number" className="form-control" name="expirationMonth" />
                </div>

                <div className="form-group col-md-3">
                    <label>Expiration Year</label>
                    <input type="number" className="form-control" name="expirationyear" />
                </div>

                <div className="form-group col-md-6">
                    <label>CVC</label>
                    <input type="number" className="form-control" name="cvc" />
                </div>

                <div className="form-group col-md-6">
                    <label>Postal/ZIP Code</label>
                    <input type="text" className="form-control" name="postalCode" />
                </div>


            </div>
        </>
    );
}



function getMyPaymentMethodsBtn(numOfPaymentMethods) {
    if (BsAppSession.isLoggedIn() && numOfPaymentMethods > 0) {
        return (
            <div className="col-md-6 text-md-right">
                <a className="eyebrow unedrline action" data-toggle="modal" data-target="#payments">My payment methods</a>
            </div>
        );
    }

    return null;
}