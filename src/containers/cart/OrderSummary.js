import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



function OrderSummary(props) {

    const orderSummaryVals = getOrderSummaryValues(props.items, props.shouldCalculateForOrderPage);

    let checkoutBtn = null;
    if (!props.withNoCheckoutBtn) { checkoutBtn = (<a href="#" className="btn btn-lg btn-primary btn-block mt-1" onClick={props.onCheckout}>Checkout</a>); }

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

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Shipping<span>Free</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Tax<span>${orderSummaryVals.tax.toFixed(2)}</span>
                        </li>
                    </ul>
                </div>

                <div className="card-footer py-2">
                    <ul className="list-group list-group-minimal">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-dark fs-18">
                            Total<span>${orderSummaryVals.total.toFixed(2)}</span>
                        </li>
                    </ul>
                </div>

            </div>

            {checkoutBtn}
        </div>
    );
}



function getOrderSummaryValues(items, shouldCalculateForOrderPage) {

    let vals = {
        subtotal: 0, tax: 0, total: 0
    };

    if (items != null && items?.length != 0) { 
        items.forEach(i => {
            let itemTotalPrice = 0;
            if (!shouldCalculateForOrderPage) { itemTotalPrice = parseFloat(i.product.price) * parseInt(i.quantity); }
            else { itemTotalPrice = parseFloat(i.price) * parseInt(i.quantity); }
            
            vals.subtotal += itemTotalPrice;
        });
    
        vals.tax = vals.subtotal * 0.13;
        vals.total = vals.subtotal + vals.tax;
    }

    return vals;
}



export default OrderSummary;