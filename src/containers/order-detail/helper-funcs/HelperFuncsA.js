import * as orderConsts from "../constants/consts";

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