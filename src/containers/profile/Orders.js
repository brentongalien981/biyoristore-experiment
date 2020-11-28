import React from 'react';
import OrderItem from './OrderItem';



function Orders(props) {

    const orderItems = [1, 2, 3];
    const orders = orderItems.map((o, i) => {
        return (<OrderItem key={i} />);
    });

    return (
        <div className="tab-pane fade" id="sidebar-1-2" role="tabpanel" aria-labelledby="sidebar-1-2">

            <div className="row">
                <div className="col-12">
                    <h3 className="mb-0">Orders</h3>
                    <span className="eyebrow">8 Items</span>
                </div>
            </div>


            <div className="row gutter-2">
                {orders}
            </div>


            {/* page-number-navigation */}
            <div className="row">
                <div className="col">
                    <ul className="pagination">
                        <li className="page-item active"><a className="page-link" href="#!">1 <span className="sr-only">(current)</span></a></li>
                        <li className="page-item" aria-current="page"><a className="page-link" href="#!">2</a></li>
                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                        <li className="page-item"><a className="page-link" href="#!">4</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
}



export default Orders;