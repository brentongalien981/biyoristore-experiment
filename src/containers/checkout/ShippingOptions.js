import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



export default function ShippingOptions(props) {

    const slowestRestockDays = getSlowestRestockDays(props.cartItems);

    const options = props.shippingRates?.map((r, i) => {

        const estimatedShippingDays = slowestRestockDays + r.delivery_days;

        const shippingDescription = getShippingDescription(estimatedShippingDays, r);

        return (
            <div key={i} className="custom-control custom-radio mb-2">
                <input type="radio" name="custom-radio-1" className="custom-control-input" id={"shipping-option-" + i} onChange={() => props.onShippingOptionChange(r.id)} />
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
                        </div>

                        <div className="modal-body">
                            <ul>{options}</ul>
                        </div>

                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row gutter-0">
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-primary" data-dismiss="modal" onClick={props.onShippingOptionConfirm}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}



function getShippingDescription(estimatedShippingDays, rate) {
    const r = rate;
    Bs.log("estimatedShippingDays ==> " + estimatedShippingDays);

    let label = r.service + " / ";

    if (estimatedShippingDays >= 4) {
        label += (estimatedShippingDays - 3) + "-" + estimatedShippingDays + " Business Days";
    } else if (estimatedShippingDays > 1) {
        label += "1-" + estimatedShippingDays + " Business Days";
    } else {
        label += estimatedShippingDays + " Business Day";
    }

    label += " / $" + r.rate + " " + r.currency;

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