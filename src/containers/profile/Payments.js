import React from 'react';
import PaymentForm from './PaymentForm';



function Payments(props) {

    return (
        <div className="tab-pane fade" id="sidebar-1-4" role="tabpanel" aria-labelledby="sidebar-1-4">

            {/* payment-banner */}
            <div className="row">
                <div className="col">
                    <h3 className="mb-0">Payments</h3>
                    {/* <span className="eyebrow">{props.paymentInfos.length} Entry</span><br /> */}
                    <button type="button" className="btn btn-primary btn-with-ico" data-toggle="modal" data-target="#paymentFormModal" onClick={props.onPaymenFormShown}><i className="icon-plus"></i> Add New Payment</button>
                </div>
            </div>

            {/* payment-details */}
            <div className="row gutter-2 mb-6">
                {showPaymentDetails(props.paymentInfos, props.onPaymenFormShown, props.onPaymentMethodDelete)}
            </div>

        </div>
    );
}



function showPaymentDetails(paymentInfos, onPaymenFormShown, onPaymentMethodDelete) {

    const paymentDetails = paymentInfos?.map((p, i) => {
        return (
            <div className="col-md-6" key={i}>
                <div className="card card-data">
                    <div className="card-header card-header-options">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="card-title">{p.card.brand}</h3>
                            </div>
                            <div className="col text-right">
                                <div className="dropdown">
                                    <button id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li>
                                            <a className="dropdown-item" href="#!" data-toggle="modal" data-target="#paymentFormModal" onClick={(e) => onPaymenFormShown(e, p)}>Edit</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#!" onClick={(e) => onPaymentMethodDelete(e, p.id)}>Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body w-75">
                        <h5 className="eyebrow text-muted">Payment Method</h5>
                        <p className="card-text"><b>{p.card.brand}</b> ends in {p.card.last4} Exp: {p.card.exp_month}/{p.card.exp_year}</p>
                        {/* <h5 className="eyebrow text-muted">Last Payment</h5> */}
                        {/* <p className="card-text"><b>${randomLastPaymentDetals[i].amount}</b> successful on {randomLastPaymentDetals[i].date}</p> */}
                    </div>
                </div>
            </div>
        );
    });

    return paymentDetails;
}



export default Payments;