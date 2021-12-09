import React from 'react';
import { TAX_RATE } from '../../bs-library/constants/global';
import Bs from '../../bs-library/helpers/Bs';
import { getCartItemDisplayPrice } from '../../components/cart/helper-funcs/HelperFuncsA';



function OrderSummary(props) {

    const orderSummaryVals = getOrderSummaryValues(props.items, props.shouldCalculateForOrderPage, props.shouldCalculateForCheckoutFinalizationPage, props.shipmentRate, props.exchangeRates);

    let checkoutBtn = null;
    if (!props.withNoCheckoutBtn) { checkoutBtn = (<a href="#" className="btn btn-lg btn-primary btn-block mt-1" onClick={props.onCheckout}>Checkout</a>); }

    let payBtn = null;
    if (props.withPayBtn) {
        payBtn = (<button className="btn btn-lg btn-primary btn-block mt-1" onClick={props.onPay}>Pay</button>);
    }

    const shipmentRateFee = orderSummaryVals.shipmentRateFee;
    const tax = orderSummaryVals.tax ? "$" + orderSummaryVals.tax.toFixed(2) : "TBC";
    const total = orderSummaryVals.total ? "$" + orderSummaryVals.total.toFixed(2) : "TBC";


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



function getOrderSummaryValues(items, shouldCalculateForOrderPage, shouldCalculateForCheckoutFinalizationPage, shipmentRate, exchangeRates) {

    let shipmentRateFee = shipmentRate?.rate ?? null;
    shipmentRateFee = shipmentRate?.rate ? parseFloat(shipmentRate?.rate) : null;
    shipmentRateFee = parseFloat(shipmentRateFee.toFixed(2));

    // if (exchangeRates && exchangeRates['CAD-to-USD']) {
    //     shipmentRateFee = shipmentRateFee * parseFloat(exchangeRates['CAD-to-USD'].rate);
    //     shipmentRateFee = parseFloat(shipmentRateFee.toFixed(2));
    // }
    

    let vals = {
        subtotal: 0.0, shipmentRateFee: shipmentRateFee, tax: null, total: null
    };

    if (items != null && items?.length != 0) {

        items.forEach(i => {

            // BMD-TODO: On DEV-ITER-007: Refactor to handle multiple scenarios.
            // if (shouldCalculateForCheckoutFinalizationPage) {

            //     let itemMostEfficientPrice = i.product.mostEfficientSeller.productSeller.discount_sell_price ?? i.product.mostEfficientSeller.productSeller.sell_price;
            //     itemMostEfficientPrice = parseFloat(itemMostEfficientPrice);
            //     itemTotalPrice = itemMostEfficientPrice * parseInt(i.quantity);

            // } else if (shouldCalculateForOrderPage) {
            //     itemTotalPrice = parseFloat(i.price) * parseInt(i.quantity);
            // } else {
            //     itemTotalPrice = parseFloat(i.product.price) * parseInt(i.quantity);
            // }

            const itemTotalPrice = parseFloat(getCartItemDisplayPrice(i)) * parseInt(i.quantity);

            vals.subtotal += itemTotalPrice;
        });

        vals.subtotal = parseFloat(vals.subtotal.toFixed(2));

        if (shipmentRateFee) {
            vals.tax = (vals.subtotal + vals.shipmentRateFee) * TAX_RATE;
            vals.tax = parseFloat(vals.tax.toFixed(2));

            vals.total = vals.subtotal + vals.shipmentRateFee + vals.tax;
            vals.total = parseFloat(vals.total.toFixed(2));
        }
    }

    return vals;
}



export default OrderSummary;