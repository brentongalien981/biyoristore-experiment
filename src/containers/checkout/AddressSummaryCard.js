import React from 'react';



export default function AddressSummaryCard(props) {

    const addressTypeLabel = props.addressType == "shipping" ? "Shipping Details" : "Billing Details";
    const a = props.address;

    return (
        <div className="col-md-6">
            <div className="card card-data">
                <div className="card-header card-header-options py-1">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="card-title">{addressTypeLabel}</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body w-75">
                    <h5 className="eyebrow text-muted">Where</h5>
                    <p className="card-text">
                        {a.street}<br />{a.city}, {a.province}<br />{a.country}, {a.postalCode}
                    </p>

                    <h5 className="eyebrow text-muted">To</h5>
                    <p className="card-text">{a.firstName + " " + a.lastName}<br />{a.email}<br />{a.phone}</p>
                </div>
            </div>
        </div>
    );
}