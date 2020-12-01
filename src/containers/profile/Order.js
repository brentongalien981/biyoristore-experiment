import React from 'react';
import { Link } from 'react-router-dom';
import BsCore2 from '../../bs-library/helpers/BsCore2';



function Order(props) {

    const orderLink = "/order?id=" + props.order.id;

    return (
        <div className="col-12">
            <div className="order">
                <div className="row align-items-center">

                    <div className="col-lg-4">
                        <h3 className="order-number">Order# {props.order.id}</h3>
                        <Link to={orderLink} className="action eyebrow underline">View Order</Link>
                    </div>

                    <div className="col-lg-4">
                        <span className="order-status">{props.order.status.readable_name}</span>
                    </div>

                    <div className="col-lg-4">
                        <ul className="order-preview justify-content-end">
                            {getOrderItems(props.order.orderItems)}
                        </ul>
                </div>

            </div>
        </div>
        </div >
    );
}



function getOrderItems(items) {
    const itemsComponent = items.map((item, i) => {

        const productLink = "/product?productId=" + item.product.id;
        const firstPhotoUrl = BsCore2.pubPhotoUrl + item.product.productPhotoUrls[0].url;


        return (
            <li key={i}>
                <Link to={productLink} title={item.product.name} data-toggle="tooltip" data-placement="top">
                    <img src={firstPhotoUrl} alt={item.product.name} />
                </Link>
            </li>
        );
    });

    return itemsComponent;
}




export default Order;