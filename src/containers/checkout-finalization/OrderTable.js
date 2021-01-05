import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../cart/OrderSummary';
import OrderTableItem from './OrderTableItem';



function OrderTable(props) {

    const numOrderItems = props.orderItems.length ?? 0;
    const items = props.orderItems?.map((item, i) => {

        const isLastItemAttrib = (i + 1 === numOrderItems) ? { isLastItem: true } : {};
        return (
            <OrderTableItem item={item} key={i} {...isLastItemAttrib} />
        );
    });



    return (
        <section className="pt-0 pb-10">
            <div className="container">

                {/* table-header */}
                <div className="row mb-1 d-none d-lg-flex">
                    <div className="col-lg-8">
                        <div className="row pr-6">
                            <div className="col-lg-6"><span className="eyebrow">Product</span></div>
                            <div className="col-lg-2 text-center"><span className="eyebrow">Price</span></div>
                            <div className="col-lg-2 text-center"><span className="eyebrow">Quantity</span></div>
                            <div className="col-lg-2 text-center"><span className="eyebrow">Total</span></div>
                        </div>
                    </div>
                </div>


                <div className="row gutter-2 gutter-lg-4 justify-content-end">

                    {/* cart items */}
                    <div className="col-lg-8 cart-item-list">
                        {items}
                        <Link to="/cart" className="btn btn-warning mt-1">Edit Cart</Link>
                    </div>


                    <OrderSummary
                        items={props.orderItems}
                        shipmentRate={props.shipmentRate}
                        withNoCheckoutBtn
                        withPayBtn
                        onPay={props.onPay}
                        shouldCalculateForCheckoutFinalizationPage />
                </div>


            </div>
        </section>
    );
}



export default OrderTable;