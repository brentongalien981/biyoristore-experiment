import React from 'react';



function OrderInfo(props) {

    const o = props.order;
    const p = props.paymentInfo;

    if (!o.id) { return (<h3>Reading order...</h3>); }
    if (o.id === -1) { return (<h4>Order not found...</h4>); }

    return (
        <div className="col-md-12">
            <div className="card card-data">

                <div className="card-header card-header-options">
                    <div className="row align-items-center">
                        <div className="col py-2">
                            <h3 className="card-title">Details</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">

                        <div className="col-6 col-md-3 mb-3">
                            <h5 className="eyebrow text-muted">Status</h5>
                            <p className="card-text">
                                order #: {o.id}<br />
                                status: {o.status.readable_name}<br />
                                created: {o.createdAt}
                            </p>
                        </div>

                        <div className="col-6 col-md-3 mb-3">
                            <h5 className="eyebrow text-muted">To</h5>
                            <p className="card-text">
                                {"bmd-TODO: FirstName LastName"}<br />
                                {o.email}<br />
                                {o.phone}
                            </p>
                        </div>

                        <div className="col-6 col-md-3">
                            <h5 className="eyebrow text-muted">Where</h5>
                            <p className="card-text">
                                {o.street}<br />{o.city}, {o.province}<br />{o.country}, {o.postalCode}
                            </p>
                        </div>

                        <div className="col-6 col-md-3">
                            <h5 className="eyebrow text-muted">Payment Method</h5>
                            <p className="card-text"><b>{p.card?.brand}</b> ends in {p.card?.last4} Exp: {p.card?.exp_month}/{p.card?.exp_year}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}



export default OrderInfo;