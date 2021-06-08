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
        case orderConsts.DELIVERED:
        case orderConsts.FINALIZED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_DELIVERED;
            break;
        case orderConsts.CANCELLED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_CANCELLED;
            break;
        case orderConsts.CLOSED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_CLOSED;
            break;
        case orderConsts.REFUNDED:
            displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_REFUNDED;
            break;
        default:
            if (c >= orderConsts.ORDER_CREATED && c < orderConsts.DELIVERED) { displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_BEING_PROCESSED; }
            else if (c >= orderConsts.ORDER_APPLIED_FOR_REFUND && c < orderConsts.REFUNDED) { displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_BEING_REFUNDED; }
            else { displayedStatus = orderConsts.ORDER_DISPLAY_STATUS_CLOSED; }
            break;
    }


    return displayedStatus;

};