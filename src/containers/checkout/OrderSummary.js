import React from 'react';



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
                        <li className="list-group-item d-flex justify-content-between align-items-center">Subtotal<span>${orderSummaryVals.subtotal}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Shipping<span>Free</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Tax<span>${orderSummaryVals.tax}</span></li>
                    </ul>
                </div>

                <div className="card-footer py-2">
                    <ul className="list-group list-group-minimal">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-dark fs-18">Total<span>${orderSummaryVals.total}</span>
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
            const itemTotalPrice = parseFloat(i.product.price) * parseInt(i.quantity);
            vals.subtotal += itemTotalPrice;
        });

        vals.tax = vals.subtotal * 0.13;
        vals.total = vals.subtotal + vals.tax;
    }

    return vals;
}