import React from 'react';
import OrderSummary from './OrderSummary';
import OrderTableItem from './OrderTableItem';



function OrderTable(props) {

    const items = props.order?.orderItems?.map((item, i) => {
        return (
            <OrderTableItem item={item} key={i} />
        );
    });



    return (
        <section className="pt-0">
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
                    </div>

                    {/* BMD-ISH */}
                    <OrderSummary order={props.order} />
                </div>

            </div>
        </section>
    );
}



export default OrderTable;