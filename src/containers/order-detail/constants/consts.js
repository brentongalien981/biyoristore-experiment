// BMD-ON-STAGING: Make sure these values or symmetrical on the backend consts.
export const ORDER_CREATED = 8006;
export const DELIVERED = 8015;
export const FINALIZED = 8016;
export const CANCELLED = 666001;
export const ORDER_APPLIED_FOR_REFUND = 666002;
export const REFUNDED = 666007;
export const CLOSED = 666008;

// BMD-FOR-DEBUG
// DB::table('order_statuses')->insert(['code' => 8006, 'name' => 'ORDER_CREATED', 'readable_name' => 'Order Created']);
// DB::table('order_statuses')->insert(['code' => 8007, 'name' => 'ORDER_ITEMS_CREATED', 'readable_name' => 'Order Items Created']);
// DB::table('order_statuses')->insert(['code' => 8008, 'name' => 'INVENTORY_QUANTITIES_UPDATED', 'readable_name' => 'Inventory Quantities Updated']);
// DB::table('order_statuses')->insert(['code' => 8009, 'name' => 'INVENTORY_ORDER_LIMITS_UPDATED', 'readable_name' => 'Inventory Order Limits Updated']);
// DB::table('order_statuses')->insert(['code' => 8010, 'name' => 'CACHE_CART_RESET_OK', 'readable_name' => 'Cache Cart Has Been Reset OK']);
// DB::table('order_statuses')->insert(['code' => 8011, 'name' => 'ORDER_BEING_PROCESSED', 'readable_name' => 'Order Being Processed']);
// DB::table('order_statuses')->insert(['code' => 8012, 'name' => 'ORDER_DETAILS_EMAILED_TO_USER', 'readable_name' => 'Order Details Emailed To User']);


// DB::table('order_statuses')->insert(['code' => 8013, 'name' => 'PROCESSING_FOR_SHIPMENT', 'readable_name' => 'Processing for Shipment']);
// DB::table('order_statuses')->insert(['code' => 8014, 'name' => 'BEING_SHIPPED', 'readable_name' => 'Order Being Shipped']);
// DB::table('order_statuses')->insert(['code' => 8015, 'name' => 'DELIVERED', 'readable_name' => 'Order Delivered']);
// DB::table('order_statuses')->insert(['code' => 8016, 'name' => 'FINALIZED', 'readable_name' => 'Finalized']);


// DB::table('order_statuses')->insert(['code' => 666001, 'name' => 'CANCELLED', 'readable_name' => 'Order Cancelled']);
// DB::table('order_statuses')->insert(['code' => 666002, 'name' => 'ORDER_APPLIED_FOR_REFUND', 'readable_name' => 'Order Applied For Refund']);
// DB::table('order_statuses')->insert(['code' => 666003, 'name' => 'ORDER_TO_BE_PICKED_UP_BY_CARRIER_FOR_REFUND', 'readable_name' => 'Ordrer to be Picked-up by Carrier for Refund']);
// DB::table('order_statuses')->insert(['code' => 666004, 'name' => 'ORDER_BEING_RETURNED_FOR_REFUND', 'readable_name' => 'Order Being Returned for Refund']);
// DB::table('order_statuses')->insert(['code' => 666005, 'name' => 'RETURNED', 'readable_name' => 'Order Returned']);
// DB::table('order_statuses')->insert(['code' => 666006, 'name' => 'PROCESSING_FOR_REFUND', 'readable_name' => 'Processing for Refund']);
// DB::table('order_statuses')->insert(['code' => 666007, 'name' => 'REFUNDED', 'readable_name' => 'Refunded']);
// DB::table('order_statuses')->insert(['code' => 666008, 'name' => 'CLOSED', 'readable_name' => 'Closed']);


export const ORDER_DISPLAY_STATUS_CANCELLED = { code: 'ORDER-CONST-666001', displayMsg: 'Cancelled' };
export const ORDER_DISPLAY_STATUS_CLOSED = { code: 'ORDER-CONST-666008', displayMsg: 'Closed' };
export const ORDER_DISPLAY_STATUS_BEING_PROCESSED = { code: 'ORDER-CONST-8000', displayMsg: 'Being Processed' };
export const ORDER_DISPLAY_STATUS_DELIVERED = { code: 'ORDER-CONST-8015', displayMsg: 'Delivered' };
export const ORDER_DISPLAY_STATUS_BEING_REFUNDED = { code: 'ORDER-CONST-666002', displayMsg: 'Evaluating for Refund' };
export const ORDER_DISPLAY_STATUS_REFUNDED = { code: 'ORDER-CONST-666007', displayMsg: 'Refunded' };