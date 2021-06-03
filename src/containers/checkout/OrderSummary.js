import React from 'react';
import { getCartItemDisplayPrice } from '../../components/cart/helper-funcs/HelperFuncsA';
import { TAX_RATE } from '../../bs-library/constants/global'



export default function OrderSummary(props) {

    const orderSummaryVals = getOrderSummaryValues(props.cartItems);
    

    return (

        <div className="col-12 mt-1">
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
                        <li className="list-group-item d-flex justify-content-between align-items-center">Subtotal<span>${orderSummaryVals.subtotal.toFixed(2)}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Shipping<span>TBC</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Tax<span>TBC</span></li>
                    </ul>
                </div>

                <div className="card-footer py-2">
                    <ul className="list-group list-group-minimal">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-dark fs-18">Total<span>TBC</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}



function getOrderSummaryValues(items) {

    let vals = {
        subtotal: 0, tax: 0, total: 0
    };

    if (items != null && items?.length != 0) {
        items.forEach(i => {
            const itemTotalPrice = parseFloat(getCartItemDisplayPrice(i)) * parseInt(i.quantity);
            vals.subtotal += itemTotalPrice;
        });

        vals.tax = vals.subtotal * TAX_RATE;
        vals.total = vals.subtotal + vals.tax;
    }

    return vals;
}