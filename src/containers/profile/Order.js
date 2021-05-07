import React from 'react';
import { Link } from 'react-router-dom';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import * as orderConsts from '../order-detail/constants/consts';



function Order(props) {

    const orderLink = "/order?id=" + props.order.id;

    return (
        <div className="col-12">
            <div className="order">
                <div className="row align-items-center">

                    <div className="col-lg-4">
                        <h3 className="order-number">Order {getShortenedOrderId(props.order.id)}</h3>
                        <Link to={orderLink} className="action eyebrow underline">View Order</Link>
                    </div>

                    <div className="col-lg-4">
                        {getOrderStatusNode(props.order.status)}
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



function getOrderStatusNode(status) {

    const c = status?.code;
    let displayedStatus = null;
    let statusColorClassName = 'order-status';


    switch (c) {
        case orderConsts.DELIVERED:
        case orderConsts.FINALIZED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_DELIVERED;
            statusColorClassName = 'order-status sent';
            break;
        case orderConsts.CANCELLED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_CANCELLED;
            statusColorClassName = 'order-status canceled';
            break;
        case orderConsts.CLOSED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_CLOSED;
            break;
        case orderConsts.REFUNDED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_REFUNDED;
            statusColorClassName = 'order-status sent';
            break;
        default:
            if (c >= orderConsts.ORDER_CREATED && c < orderConsts.DELIVERED) { displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_BEING_PROCESSED; }
            else if (c >= orderConsts.ORDER_APPLIED_FOR_REFUND && c < orderConsts.REFUNDED) { displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_BEING_REFUNDED; }
            else { displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_CLOSED; }
            break;
    }


    return (<span className={statusColorClassName}>{displayedStatus?.displayMsg}</span>);

}



function getShortenedOrderId(orderId) {
    return orderId.substring(orderId.length - 8);
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