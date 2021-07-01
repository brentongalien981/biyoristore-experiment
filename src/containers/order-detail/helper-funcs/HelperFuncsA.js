import { PACKAGE_ITEM_TYPE_ID_SHOES, SHIRT_SIZE_ORDERS, SHOE_SIZE_ORDERS } from "../../product/constants/consts";
import * as orderConsts from "../constants/consts";



export const sortOrderItems = (orderItems = []) => {

    /**
     * ex:
     * sortedProducsArrangementReference = [
     *      'Kyrie Shoes, 16.0',
     *      'Kyrie Shoes, 17.5',
     *      'Kyrie Shoes, 18.0',
     *      'Kobe Jersey, M',
     *      'Kobe Jersey, XL'
     * ]
     */
    let sortedProducsArrangementReference = [];

    for (const oi of orderItems) {

        let arrangementName = '';

        if (oi.product.packageItemTypeId == PACKAGE_ITEM_TYPE_ID_SHOES) {
            arrangementName = oi.product.name + ',' + SHOE_SIZE_ORDERS[oi.sizeAvailability.size] + ',' + oi.sizeAvailability.id;
        } else {
            arrangementName = oi.product.name + ',' + SHIRT_SIZE_ORDERS[oi.sizeAvailability.size] + ',' + oi.sizeAvailability.id;
        }

        sortedProducsArrangementReference.push(arrangementName);
    }

    sortedProducsArrangementReference.sort();



    let sortedItems = [];

    for (const sortRef of sortedProducsArrangementReference) {
        const tokens = sortRef.split(',');
        const sortRefProductName = tokens[0];
        const sortRefProductSize = tokens[1];
        const sortRefSizeAvailabilityId = tokens[2];

        for (const oi of orderItems) {
            if (oi.product.name == sortRefProductName && oi.sizeAvailability.id == sortRefSizeAvailabilityId) {
                sortedItems.push(oi);
                break;
            }
        }
    }


    return sortedItems;
};


export const getSizeComponentLabel = (orderItem) => {
    const size = orderItem.sizeAvailability?.size ?? 'n/a';

    return 'size: ' + size;
};



export const getDisplayStatusForOrderStatus = (status) => {

    const c = status?.code;
    let displayedStatus = null;


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
            
            break;

        case orderConsts.CLOSED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_CLOSED;
            break;

        default:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_ORDER_NO_STATUS;
            break;
    }


    return displayedStatus;

};