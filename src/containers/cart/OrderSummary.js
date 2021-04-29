import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



function OrderSummary(props) {

    const orderSummaryVals = getOrderSummaryValues(props.items, props.shouldCalculateForOrderPage, props.shouldCalculateForCheckoutFinalizationPage, props.shipmentRate);

    let checkoutBtn = null;
    if (!props.withNoCheckoutBtn) { checkoutBtn = (<a href="#" className="btn btn-lg btn-primary btn-block mt-1" onClick={props.onCheckout}>Checkout</a>); }

    let payBtn = null;
    if (props.withPayBtn) {
        payBtn = (<button className="btn btn-lg btn-primary btn-block mt-1" onClick={props.onPay}>Pay</button>);
    }

    const shipmentRateFee = orderSummaryVals.shipmentRateFee;
    const tax = orderSummaryVals.tax ? "$" + orderSummaryVals.tax : "TBC";
    const total = orderSummaryVals.total ? "$" + orderSummaryVals.total : "TBC";


    let shipmentRateFeeSection = (<li className="list-group-item d-flex justify-content-between align-items-center">Shipping<span>TBC</span></li>);
    if (shipmentRateFee) {
        shipmentRateFeeSection = (<li className="list-group-item d-flex justify-content-between align-items-center">Shipping<span>${shipmentRateFee.toFixed(2)}</span></li>);
    }

    return (
        <div className="col-lg-4">
            <div className="card card-data bg-light">

                <div className="card-header py-2 px-3">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="fs-18 mb-0">Order Summary</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <ul className="list-group list-group-minimal">

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Subtotal<span>${orderSummaryVals.subtotal.toFixed(2)}</span>
                        </li>

                        {shipmentRateFeeSection}

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Tax<span>{tax}</span>
                        </li>
                    </ul>
                </div>

                <div className="card-footer py-2">
                    <ul className="list-group list-group-minimal">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-dark fs-18">
                            Total<span>{total}</span>
                        </li>
                    </ul>
                </div>

            </div>

            {checkoutBtn}
            {payBtn}
        </div>
    );
}



function getOrderSummaryValues(items, shouldCalculateForOrderPage, shouldCalculateForCheckoutFinalizationPage, shipmentRate) {

    let shipmentRateFee = shipmentRate?.rate ?? null;
    shipmentRateFee = shipmentRate?.rate ? parseFloat(shipmentRate?.rate) : null;

    let vals = {
        subtotal: 0.0, shipmentRateFee: shipmentRateFee, tax: null, total: null
    };

    if (items != null && items?.length != 0) {

        items.forEach(i => {

            let itemTotalPrice = 0.0;

            // BMD-ON-STAGING: Refactor to handle multiple scenarios.
            // if (shouldCalculateForCheckoutFinalizationPage) {

            //     let itemMostEfficientPrice = i.product.mostEfficientSeller.productSeller.discount_sell_price ?? i.product.mostEfficientSeller.productSeller.sell_price;
            //     itemMostEfficientPrice = parseFloat(itemMostEfficientPrice);
            //     itemTotalPrice = itemMostEfficientPrice * parseInt(i.quantity);

            // } else if (shouldCalculateForOrderPage) {
            //     itemTotalPrice = parseFloat(i.price) * parseInt(i.quantity);
            // } else {
            //     itemTotalPrice = parseFloat(i.product.price) * parseInt(i.quantity);
            // }
            let itemMostEfficientPrice = i.product.mostEfficientSeller.productSeller.discount_sell_price ?? i.product.mostEfficientSeller.productSeller.sell_price;
            itemMostEfficientPrice = parseFloat(itemMostEfficientPrice);
            itemTotalPrice = itemMostEfficientPrice * parseInt(i.quantity);


            vals.subtotal += itemTotalPrice;
        });

        if (shipmentRateFee) {
            vals.tax = (vals.subtotal + vals.shipmentRateFee) * 0.13;
            vals.total = vals.subtotal + vals.tax;
        }
    }

    return vals;
}



export default OrderSummary;