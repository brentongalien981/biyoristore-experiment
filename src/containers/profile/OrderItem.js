import React from 'react';



function OrderItem(props) {

    return (
        <div className="col-12">
            <div className="order">
                <div className="row align-items-center">

                    <div className="col-lg-4">
                        <h3 className="order-number">Order 524312</h3>
                        <a href="#!" className="action eyebrow underline">View Order</a>
                    </div>

                    <div className="col-lg-4">
                        <span className="order-status">In Progress</span>
                    </div>

                    <div className="col-lg-4">
                        <ul className="order-preview justify-content-end">
                            <li>
                                <a href="product-1.html" title="Black Low Curve Iceman Trimix Sneakers" data-toggle="tooltip" data-placement="top">
                                    <img src="assets/images/demo/product-11.jpg" alt="Black Low Curve Iceman Trimix Sneakers" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}



export default OrderItem;