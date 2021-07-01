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
        case orderConsts.PAYMENT_METHOD_NOT_CHARGED:
        case orderConsts.INVALID_CART:
        case orderConsts.CART_HAS_NO_ITEM:
        case orderConsts.INVALID_PAYMENT_METHOD:
        case orderConsts.ORDER_FINALIZATION_FAILED:
        case orderConsts.ORDER_FINALIZATION_EXCEPTION:
        case orderConsts.ORDER_FINALIZATION_INCOMPLETE:
        case orderConsts.POSSIBLE_DOUBLE_PAYMENT:
        case orderConsts.MISSING_STRIPE_PAYMENT_INTENT_LINK:
        case orderConsts.CUSTOMER_HAS_TO_BE_REFUNDED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_ERROR;
            statusColorClassName = 'order-status canceled';
            break;

        case orderConsts.WAITING_FOR_PAYMENT:
        case orderConsts.PAYMENT_METHOD_VALIDATED:
        case orderConsts.STRIPE_PAYMENT_INTENT_CREATED:
        case orderConsts.START_OF_FINALIZING_ORDER_WITH_PREDEFINED_PAYMENT:
        case orderConsts.DB_CART_CREATED:
        case orderConsts.CACHE_CART_UPDATED_TO_LATEST_VERSION:
        case orderConsts.DB_CART_ITEMS_CREATED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_PAYMENT_PROCESSING;
            break;

        case orderConsts.PAYMENT_METHOD_CHARGED:
        case orderConsts.START_OF_FINALIZING_ORDER:
        case orderConsts.VALID_CART:
        case orderConsts.CART_HAS_ITEM:
        case orderConsts.CART_CHECKEDOUT_OK:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_PAYMENT_RECEIVED;
            break;

        case orderConsts.ORDER_CREATED:
        case orderConsts.ORDER_ITEMS_CREATED:
        case orderConsts.INVENTORY_QUANTITIES_UPDATED:
        case orderConsts.INVENTORY_ORDER_LIMITS_UPDATED:
        case orderConsts.CACHE_CART_RESET_OK:
        case orderConsts.ORDER_CONFIRMED:
        case orderConsts.ORDER_DETAILS_EMAILED_TO_USER:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_CONFIRMED;
            break;

        case orderConsts.PROCESSING_FOR_SHIPMENT:
        case orderConsts.BEING_SHIPPED:
        case orderConsts.EVALUATED_INCOMPLETELY_FOR_PURCHASE:
        case orderConsts.PURCHASE_INCOMPLETELY_RECEIVED:
        case orderConsts.BEING_EVALUATED_FOR_PURCHASE:
        case orderConsts.TO_BE_PURCHASED:
        case orderConsts.PURCHASED:
        case orderConsts.TO_BE_PURCHASE_RECEIVED:
        case orderConsts.PURCHASE_RECEIVED:
        case orderConsts.IN_STOCK:
        case orderConsts.TO_BE_PACKAGED:
        case orderConsts.PACKAGED:
        case orderConsts.TO_BE_DISPATCHED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_PROCESSING;
            break;

        case orderConsts.DISPATCHED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_DISPATCHED;
            break;

        case orderConsts.DELIVERED:
        case orderConsts.FINALIZED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_DELIVERED;
            statusColorClassName = 'order-status sent';
            break;

        case orderConsts.CANCELLED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_CANCELLED;
            break;

        case orderConsts.ORDER_APPLIED_FOR_REFUND:
        case orderConsts.ORDER_TO_BE_PICKED_UP_BY_CARRIER_FOR_REFUND:
        case orderConsts.ORDER_BEING_RETURNED_FOR_REFUND:
        case orderConsts.RETURNED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_BEING_RETURNED;
            break;

        case orderConsts.PROCESSING_FOR_REFUND:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_BEING_REFUNDED;
            break;

        case orderConsts.REFUNDED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_REFUNDED;
            statusColorClassName = 'order-status sent';
            break;

        case orderConsts.CLOSED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_CLOSED;
            break;

        default:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_NO_STATUS;
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

        const tooltip = item.product.name + ' size: ' + item.sizeAvailability?.size + ' x' + item.quantity;


        return (
            <li key={i}>
                <Link to={productLink} title={tooltip} data-toggle="tooltip" data-placement="top">
                    <img src={firstPhotoUrl} alt={tooltip} />
                </Link>
            </li>
        );
    });

    return itemsComponent;
}




export default Order;