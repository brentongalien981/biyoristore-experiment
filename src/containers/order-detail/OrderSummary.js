import React from 'react';



function OrderSummary(props) {

    let subtotal = parseFloat(props.order?.chargedSubtotal) ?? 0.00;
    let shippingFee = parseFloat(props.order?.chargedShippingFee) ?? 0.00;
    let tax = parseFloat(props.order?.chargedTax) ?? 0.00;
    let total = subtotal + shippingFee + tax;


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
                            Subtotal<span>${subtotal.toFixed(2)}</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Shipping<span>${shippingFee.toFixed(2)}</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Tax<span>${tax.toFixed(2)}</span>
                        </li>
                    </ul>
                </div>

                <div className="card-footer py-2">
                    <ul className="list-group list-group-minimal">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-dark fs-18">
                            Total<span>${total.toFixed(2)}</span>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default OrderSummary;