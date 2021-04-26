import React from 'react';
import { ORDER_PROCESSING_PERIOD, PAYMENT_TO_FUNDS_PERIOD } from '../../bs-library/constants/global';



function getShippingDescription(estimatedShippingDays) {
    let label = "";

    let totalDeliveryDays = estimatedShippingDays + ORDER_PROCESSING_PERIOD + PAYMENT_TO_FUNDS_PERIOD;
    label += estimatedShippingDays + '-' + totalDeliveryDays + ' Business Days';

    return label;
}



function getSlowestRestockDays(cartItems) {

    // of all the order-items, get the product-seller that has the slowest restock-time
    const items = cartItems;
    let slowestItemToRestock = null;
    let slowestRestockDays = 0;

    for (const i of items) {
        if (i.product.mostEfficientSeller.productSeller.restock_days >= slowestRestockDays) {
            slowestItemToRestock = i;
            slowestRestockDays = i.product.mostEfficientSeller.productSeller.restock_days;
        }
    }

    return slowestRestockDays;
}



function getEstimatedArrivalDescription(props) {
    const slowestRestockDays = getSlowestRestockDays(props.cartItems);
    const estimatedShippingDays = slowestRestockDays + props.shipmentRate.delivery_days;
    const description = getShippingDescription(estimatedShippingDays);
    return description;
}



function getPaymentMethodDetails(paymentMethod) {
    const p = paymentMethod;
    if (p?.id != null && p?.id !== 0) {
        return (<p className="card-text"><b>{p.brand.toUpperCase()}</b> ends in {p.last4} Exp: {p.expMonth}/{p.expYear}</p>);
    }

    return (<p className="card-text">To be charged at payment.</p>);
}



function OrderInfo(props) {

    const s = props.shippingInfo;
    const p = props.paymentInfo;


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

                        {/* STATUS */}
                        <div className="col-6 col-md-3 mb-3">
                            <h5 className="eyebrow text-muted">Status</h5>
                            <p className="card-text">
                                Payment Pending<br />
                                Arrives in {getEstimatedArrivalDescription(props)}<br />
                                <button className="btn btn-warning btn-sm" onClick={props.onShowShippingOptions}>Change Shipping Option</button>
                            </p>
                        </div>

                        {/* TO */}
                        <div className="col-6 col-md-3 mb-3">
                            <h5 className="eyebrow text-muted">To</h5>
                            <p className="card-text">
                                {s.firstName + " " + s.lastName}<br />
                                {s.email}<br />
                                {s.phone}
                            </p>
                        </div>

                        {/* WHERE */}
                        <div className="col-6 col-md-3">
                            <h5 className="eyebrow text-muted">Where</h5>
                            <p className="card-text">
                                {s.street}<br />{s.city}, {s.province}<br />{s.country}, {s.postalCode}
                            </p>
                        </div>

                        {/* PAYMENT-INFO */}
                        <div className="col-6 col-md-3">
                            <h5 className="eyebrow text-muted">Payment Method</h5>
                            {getPaymentMethodDetails(props.paymentMethod)}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}



export default OrderInfo;