import React from 'react';



function PaymentForm(props) {

    const p = props.newPayment;
    const methodTitle = (props.paymentFormCrudMethod == "create" ? "New Payment Method" : "Edit Payment Method");
    const submitBtnText = (props.paymentFormCrudMethod == "create" ? "Add" : "Update");

    return (
        <div className="modal fade" id="exampleModal-1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{methodTitle}</h5>
                        <button id="closePaymentFormBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div className="modal-body">

                        <div className="row gutter-1">

                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Card Number</label>
                                    <input type="text" className="form-control" placeholder="" name="cardNumber" value={p.cardNumber} onChange={props.onPaymentFormInputChanged} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Name on Card</label>
                                    <input type="text" className="form-control" placeholder="" name="nameOnCard" onChange={props.onPaymentFormInputChanged} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Expiration Month</label>
                                    <select name="expirationMonth" className="custom-select" value={p.expirationMonth} onChange={props.onPaymentFormInputChanged}>
                                        {getExpirationMonthOptions()}
                                    </select>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Expiration Year</label>
                                    <select name="expirationYear" className="custom-select" value={p.expirationYear} onChange={props.onPaymentFormInputChanged}>
                                        {getExpirationYearOptions()}
                                    </select>
                                </div>
                            </div>

                            <div className="col-12">
                                <a href="#!" className="btn btn-primary" onClick={props.savePayment}>{submitBtnText}</a>
                            </div>
                        </div>

                    </div>

                </div>
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