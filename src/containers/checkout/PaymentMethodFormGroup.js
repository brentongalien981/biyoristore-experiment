import React from 'react';
import BmdAuth from '../../bs-library/core/BmdAuth';



export default function PaymentMethodFormGroup(props) {

    if (!props.numOfPaymentMethods || props.numOfPaymentMethods <= 1) { return null; }

    return (
        <>
            <div className="row align-items-end mb-2">
                <div className="col-md-6">
                    <h2 className="h3 mb-0">Payment Method</h2>
                </div>
                {getMyPaymentMethodsBtn(props.numOfPaymentMethods)}
            </div>

            {getPaymentMethodInputFields(props)}
        </>
    );
}



function getPaymentMethodInputFields(props) {

    const p = props.paymentMethod;

    if (!p.id || p.id === 0) {
        return (
            <div className="row gutter-1 mb-6">
                <div className="form-group col-md-6"></div>
                <hr style={{ width: '100%' }} />
            </div>
        );
    }

    let disabledAttrib = { disabled: true };
    // if (!p.id || p.id === 0) { disabledAttrib = {}; }

    return (
        <div className="row gutter-1 mb-6">
            <div className="form-group col-md-6">
                <label>Card Number</label>
                <input type="text" className="form-control" {...disabledAttrib} name="cardNumber" value={p.cardNumber} onChange={props.onPaymentMethodInputChange} />
            </div>

            <div className="form-group col-md-3">
                <label>Expiration Month</label>
                <input type="number" className="form-control" {...disabledAttrib} name="expMonth" value={p.expMonth} onChange={props.onPaymentMethodInputChange} />
            </div>

            <div className="form-group col-md-3">
                <label>Expiration Year</label>
                <input type="number" className="form-control" {...disabledAttrib} name="expYear" value={p.expYear} onChange={props.onPaymentMethodInputChange} />
            </div>

            <div className="form-group col-md-6">
                <label>CVC</label>
                <input type="text" className="form-control" {...disabledAttrib} name="cvc" value={p.cvc} onChange={props.onPaymentMethodInputChange} />
            </div>

            <div className="form-group col-md-6">
                <label>Postal/ZIP Code</label>
                <input type="text" className="form-control" {...disabledAttrib} name="postalCode" value={p.postalCode} onChange={props.onPaymentMethodInputChange} />
            </div>
        </div>
    );
}



function getMyPaymentMethodsBtn(numOfPaymentMethods) {
    if (BmdAuth.isLoggedIn() && numOfPaymentMethods > 0) {
        return (
            <div className="col-md-6 text-md-right">
                <a className="eyebrow unedrline action" data-toggle="modal" data-target="#payments">My payment methods</a>
            </div>
        );
    }

    return null;
}