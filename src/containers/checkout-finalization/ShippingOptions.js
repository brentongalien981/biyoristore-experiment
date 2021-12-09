import React from 'react';
import { ORDER_PROCESSING_PERIOD, PAYMENT_TO_FUNDS_PERIOD } from '../../bs-library/constants/global';
import Bs from '../../bs-library/helpers/Bs';



export default function ShippingOptions(props) {

    const slowestRestockDays = getSlowestRestockDays(props.cartItems);

    const options = props.shippingRates?.map((r, i) => {

        const estimatedShippingDays = slowestRestockDays + parseInt(r.delivery_days);

        const shippingDescription = getShippingDescription(estimatedShippingDays, r, props.exchangeRates);

        return (
            <div key={i} className="custom-control custom-radio mb-2">
                <input type="radio" name="custom-radio-1" className="custom-control-input" id={"shipping-option-" + i} onChange={(e) => props.onShippingOptionChange(r)} />
                <label className="custom-control-label" htmlFor={"shipping-option-" + i}>{shippingDescription}</label>
            </div>
        );
    });



    return (
        <>
            <button id="ShippingOptionsTriggerBtn" style={{ display: "none" }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#ShippingOptions">Launch Loader</button>

            <div className="modal fade" id="ShippingOptions" tabIndex="-1" role="dialog" aria-labelledby="ShippingOptionsLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4>Choose your shipping option</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <ul>{options}</ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}



function getShippingDescription(estimatedShippingDays, rate, exchangeRates) {
    const r = rate;
    const shippingRateFee = r.rate.toFixed(2);

    let shippingRateFeeInUSD = r.rate * parseFloat(exchangeRates['CAD-to-USD'].rate);
    shippingRateFeeInUSD = shippingRateFeeInUSD.toFixed(2);


    let label = r.service + " / ";
    let totalDeliveryDays = estimatedShippingDays + ORDER_PROCESSING_PERIOD + PAYMENT_TO_FUNDS_PERIOD;

    label += estimatedShippingDays + '-' + totalDeliveryDays + ' Business Days';
    // label += " / $" + shippingRateFeeInUSD;
    label += " / $" + shippingRateFee;    

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