import React from 'react';
import PaymentForm from './PaymentForm';



function Payments(props) {

    return (
        <div className="tab-pane fade" id="sidebar-1-4" role="tabpanel" aria-labelledby="sidebar-1-4">

            {/* payment banner */}
            <div className="row">
                <div className="col">
                    <h3 className="mb-0">Payments</h3>
                    <span className="eyebrow">{props.paymentInfos.length} Entry</span>
                </div>
            </div>

            {/* payment-details */}
            <div className="row gutter-2 mb-6">
                {showPaymentDetails(props.paymentInfos)}
            </div>

            <PaymentForm newPayment={props.newPayment} onPaymentFormInputChanged={props.onPaymentFormInputChanged} savePayment={props.savePayment} />
        </div>
    );
}



function showPaymentDetails(paymentInfos) {

    // TODO: 
    const randomLastPaymentDetals = [
        { amount: "7.00", date: "04/14/2019" },
        { amount: "19.00", date: "05/15/2019" },
        { amount: "250.00", date: "09/14/2020" },
        { amount: "350.00", date: "09/14/2021" },
        { amount: "450.00", date: "09/14/2022" },
        { amount: "550.00", date: "09/14/2023" },
    ];

    const paymentDetails = paymentInfos.map((p, i) => {
        return (
            <div className="col-md-6" key={i}>
                <div className="card card-data">
                    <div className="card-header card-header-options">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="card-title">{p.type}</h3>
                            </div>
                            <div className="col text-right">
                                <div className="dropdown">
                                    <button id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li>
                                            <a className="dropdown-item" href="#!">Edit</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#!">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body w-75">
                        <h5 className="eyebrow text-muted">Paymeny Method</h5>
                        <p className="card-text"><b>{p.type}</b> ends in {p.cardNumber.substring(12)} Exp: {p.expirationMonth}/{p.expirationYear}</p>
                        <h5 className="eyebrow text-muted">Last Payment</h5>
                        <p className="card-text"><b>${randomLastPaymentDetals[i].amount}</b> successful on {randomLastPaymentDetals[i].date}</p>
                    </div>
                </div>
            </div>
        );
    });

    return paymentDetails;
}



export default Payments;