import { ORDER_PROCESSING_PERIOD, PAYMENT_TO_FUNDS_PERIOD } from "../../../bs-library/constants/global";
import BsJLS from "../../../bs-library/helpers/BsJLS";
import { BLANK_ADDRESS } from "../constants/consts";



export const getPseudoSessionInputAddress = () => {

    const inputAddress = BsJLS.get('checkout.inputAddress') ?? BLANK_ADDRESS;

    return {
        firstName: (inputAddress.firstName == null || inputAddress.firstName.trim() == '') ? '' : inputAddress.firstName,
        lastName: (inputAddress.lastName == null || inputAddress.lastName.trim() == '') ? '' : inputAddress.lastName,
        street: (inputAddress.street == null || inputAddress.street.trim() == '') ? '' : inputAddress.street,
        city: (inputAddress.city == null || inputAddress.city.trim() == '') ? '' : inputAddress.city,
        province: (inputAddress.province == null || inputAddress.province.trim() == '') ? '' : inputAddress.province,
        country: (inputAddress.country == null || inputAddress.country.trim() == '') ? '' : inputAddress.country,
        postalCode: (inputAddress.postalCode == null || inputAddress.postalCode.trim() == '') ? '' : inputAddress.postalCode,
        email: (inputAddress.email == null || inputAddress.email.trim() == '') ? '' : inputAddress.email,
        phone: (inputAddress.phone == null || inputAddress.phone.trim() == '') ? '' : inputAddress.phone,
    };
};



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



export const checkDestinationCountry = (address) => {

    const country = address.country.toLowerCase();

    if (country == 'us' ||
        country == 'usa' ||
        country == 'united states' ||
        country == 'united states of america' ||
        country == 'united states america' ||
        country == 'america' ||
        country == 'ca' ||
        country == 'canada'
    ) {
        return true;
    }


    return false;
};