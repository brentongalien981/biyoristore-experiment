import React from 'react';



function PaymentInfo(props) {

    const p = props.paymentInfo;

    return (
        <div className="col-md-6">
            <div className="card card-data">

                <div className="card-header card-header-options">
                    <div className="row align-items-center">
                        <div className="col py-2">
                            <h3 className="card-title">Payment Info</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body w-75">

                    <h5 className="eyebrow text-muted">Payment Method</h5>
                    <p className="card-text"><b>{p.card?.brand}</b> ends in {p.card?.last4} Exp: {p.card?.exp_month}/{p.card?.exp_year}</p>
                </div>

            </div>
        </div>
    );
}



export default PaymentInfo;