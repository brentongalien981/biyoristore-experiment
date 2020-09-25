import React from 'react';



function PaymentForm(props) {

    const p = props.newPayment;

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
                        <input type="text" className="form-control" placeholder="" name="cardNumber" value={p.cardNumber} onChange={props.onPaymentFormInputChanged} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Name on Card</label>
                        <input type="text" className="form-control" placeholder="" name="nameOnCard" value={p.nameOnCard} onChange={props.onPaymentFormInputChanged} />
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Expiration Month</label>
                        <select name="expirationMonth" className="custom-select" value={p.expirationMonth} onChange={props.onPaymentFormInputChanged}>
                            {getExpirationMonthOptions()}
                        </select>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Expiration Year</label>
                        <select name="expirationYear" className="custom-select" value={p.expirationYear} onChange={props.onPaymentFormInputChanged}>
                            {getExpirationYearOptions()}
                        </select>
                    </div>
                </div>

                <div className="col-12">
                    <a href="#!" className="btn btn-primary" onClick={props.savePayment}>Add</a>
                </div>
            </div>

        </>
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