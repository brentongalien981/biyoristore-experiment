import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';
import Order from './Order';



function Orders(props) {

    const orders = props.orders.map((o, i) => {
        return (<Order key={i} order={o} />);
    });


    const loader = (props.isReadingOrders ? <div className='row'><WaitLoader size='md' /> </div>: null);


    return (
        <div className="tab-pane fade" id="sidebar-1-2" role="tabpanel" aria-labelledby="sidebar-1-2">

            <div className="row">
                <div className="col-12">
                    <h3 className="mb-0">Orders</h3>
                    <span className="eyebrow">{props.ordersMetaData?.totalNumOfItems} Items</span>
                </div>
            </div>


            <div className="row gutter-2">
                {orders}
            </div>

            {loader}


            {/* page-number-navigation */}
            {getPageNumNav(props.ordersMetaData, props.onOrderPageNumClick, props.selectedPageNum)}
        </div>
    );
}



function getPageNumNav(ordersMetaData, onOrderPageNumClick, selectedPageNum) {

    const numOfOrderPages = Math.ceil(parseFloat(ordersMetaData?.totalNumOfItems) / ordersMetaData?.numOfItemsPerPage);
    let pageNumComponent = [];

    for (let i = 0; i < numOfOrderPages; i++) {
        const pageNum = i + 1;

        if (selectedPageNum === pageNum) { pageNumComponent.push(<li key={i} className="page-item active"><a className="page-link" href="#" onClick={(e) => { onOrderPageNumClick(e, pageNum) }}>{pageNum}<span className="sr-only">(current)</span></a></li>); }
        else { pageNumComponent.push(<li key={i} className="page-item"><a className="page-link" href="#" onClick={(e) => { onOrderPageNumClick(e, pageNum) }}>{pageNum}</a></li>); }

    }

    return (
        <div className="row">
            <div className="col">
                <ul className="pagination">
                    {pageNumComponent}
                </ul>
            </div>
        </div>
    );
}



export default Orders;