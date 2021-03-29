import React from 'react';



function PaymentForm(props) {

    const methodTitle = (props.paymentFormCrudMethod == "create" ? "New Payment Method" : "Edit Payment Method");


    return (
        <div className="modal fade" id="paymentFormModal" tabIndex="-1" role="dialog" aria-labelledby="paymentFormModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="paymentFormModalLabel">{methodTitle}</h5>
                        <button id="closePaymentFormBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        {getFormContent(props)}
                    </div>

                </div>
            </div>
        </div>
    );
}



function getFormContent(props) {

    const p = props.newPayment;
    const submitBtnText = (props.paymentFormCrudMethod == "create" ? "Add" : "Update");

    const disabledInputAttrib = props.paymentFormCrudMethod == "edit" ? { disabled: true } : {};

    if (props.isPaymentFormCruding) {
        return (
            <h5>Saving payment...</h5>
        );
    }

    return (
        <div className="row gutter-1">

            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" {...disabledInputAttrib} className="form-control" placeholder="" name="cardNumber" value={p.cardNumber} onChange={props.onPaymentFormInputChanged} />
                </div>
            </div>

            {/* <div className="col-12">
            <div className="form-group">
                <label htmlFor="cardNumber">Name on Card</label>
                <input type="text" className="form-control" placeholder="" name="nameOnCard" onChange={props.onPaymentFormInputChanged} />
            </div>
        </div> */}

            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="expirationMonth">Expiration Month</label>
                    <select name="expirationMonth" className="custom-select" value={p.expirationMonth} onChange={props.onPaymentFormInputChanged}>
                        {getExpirationMonthOptions()}
                    </select>
                </div>
            </div>

            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="expirationYear">Expiration Year</label>
                    <select name="expirationYear" className="custom-select" value={p.expirationYear} onChange={props.onPaymentFormInputChanged}>
                        {getExpirationYearOptions()}
                    </select>
                </div>
            </div>

            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="cvc">CVC</label>
                    <input type="text" {...disabledInputAttrib} className="form-control" placeholder="" name="cvc" value={p.cvc} onChange={props.onPaymentFormInputChanged} />
                </div>
            </div>


            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="postalCode">ZIP / Postal Code</label>
                    <input type="text" className="form-control" placeholder="" name="postalCode" value={p.postalCode} onChange={props.onPaymentFormInputChanged} />
                </div>
            </div>

            <div className="col-12">
                <a href="#!" className="btn btn-primary" onClick={props.savePayment}>{submitBtnText}</a>
            </div>
        </div>

    );
}



function getExpirationYearOptions() {
    let options = [];

    for (let i = 2020; i <= 2030; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    return options
}



function getExpirationMonthOptions() {
    let options = [];

    for (let i = 1; i <= 12; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    return options
}



export default PaymentForm;