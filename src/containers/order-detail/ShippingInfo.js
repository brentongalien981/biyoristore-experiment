import React from 'react';



function ShippingInfo(props) {

    const o = props.order;

    if (!o.id) { return (<h3>Reading order...</h3>); }
    if (o.id === -1) { return (<h4>Order not found...</h4>); }

    return (
        <div className="col-md-10">
            <div className="card card-data">

                <div className="card-header card-header-options">
                    <div className="row align-items-center">
                        <div className="col py-2">
                            <h3 className="card-title">Shipping Info</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body w-75">
                    <div className="row">

                        <div className="col">
                            <h5 className="eyebrow text-muted">Status</h5>
                            <p className="card-text">
                                order #: {o.id}<br />
                                status: {o.status.readable_name}<br />
                                created: {o.createdAt}
                            </p>
                        </div>

                        <div className="col">
                            <h5 className="eyebrow text-muted">To</h5>
                            <p className="card-text">
                                {o.email}<br />
                                {o.phone}
                            </p>
                        </div>

                        <div className="col">
                            <h5 className="eyebrow text-muted">Where</h5>
                            <p className="card-text">
                                {o.street}<br />{o.city}, {o.province}<br />{o.country}, {o.postalCode}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}



export default ShippingInfo;