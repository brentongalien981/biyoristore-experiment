import { COMPANY_CUSTOMER_SERVICE_EMAIL } from "../../../bs-library/constants/global";

export const PAYMENT_FINALIZATION_NAV_BLOCKER_MSG = 'We are processing your payment. Hold on please...\n' + 'If you wanna cancel your order, please contact customer service at \n' + COMPANY_CUSTOMER_SERVICE_EMAIL;


export const ORDER_STATUSES = {
    PAYMENT_METHOD_NOT_CHARGED: -7001,
    PAYMENT_METHOD_CHARGED: 7002
};