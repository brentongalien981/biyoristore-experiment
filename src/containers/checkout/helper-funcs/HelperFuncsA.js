import { ORDER_PROCESSING_PERIOD, PAYMENT_TO_FUNDS_PERIOD } from "../../../bs-library/constants/global";

export const getProjectedTotalDeliveryDays = (cartItems, shipmentRateObj) => {
    
    return getNumOfSlowestRestockDay(cartItems) + parseInt(shipmentRateObj.delivery_days) + ORDER_PROCESSING_PERIOD + PAYMENT_TO_FUNDS_PERIOD;
};



export const getNumOfSlowestRestockDay = (cartItems) => {

    // of all the order-items, get the product-seller that has the slowest restock-time
    let slowestRestockDays = 0;

    for (const i of cartItems) {

        const numOfDaysToRestockItem = i.product.mostEfficientSeller.productSeller.restock_days;

        if (numOfDaysToRestockItem >= slowestRestockDays) {
            slowestRestockDays = numOfDaysToRestockItem;
        }
    }

    return slowestRestockDays;
};