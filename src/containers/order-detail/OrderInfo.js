import React from 'react';
import MiniImageLoader from '../../components/loader/MiniImageLoader/MiniImageLoader';
import WaitLoader from '../../components/loader/WaitLoader';
import { getDisplayStatusForOrderStatus } from './helper-funcs/HelperFuncsA';



function OrderInfo(props) {

    const o = props.order;
    const p = props.paymentInfo;


    let mainContent = (
        <div className="row">

            <div className="col-6 col-md-3 mb-3">
                <h5 className="eyebrow text-muted">Status</h5>
                <p className="card-text">
                    Order-ID: {o.id}<br />
                    Status: {getDisplayStatusForOrderStatus(o.status).displayMsg}<br />
                    Placed {o.createdAt}
                </p>
            </div>

            <div className="col-6 col-md-3 mb-3">
                <h5 className="eyebrow text-muted">To</h5>
                <p className="card-text">
                    {o.firstName + ' ' + o.lastName}<br />
                    {o.email}<br />
                    {o.phone}
                </p>
            </div>

            <div className="col-6 col-md-3">
                <h5 className="eyebrow text-muted">Where</h5>
                <p className="card-text">
                    {o.street}<br />{o.city}, {o.province}<br />{o.country}, {o.postalCode}
                </p>
            </div>


            <div className="col-6 col-md-3">
                <h5 className="eyebrow text-muted">When</h5>
                <p className="card-text">
                    Arrives in {o.earliestDeliveryDays + '-' + o.latestDeliveryDays} Business Days<br />
                    Latest Delivery Date: {o.latestDeliveryDate}
                </p>
            </div>


            <div className="col-6 col-md-3">
                <h5 className="eyebrow text-muted">Payment Method</h5>
                <p className="card-text"><b>{p.card?.brand}</b> ends in {p.card?.last4} Exp: {p.card?.exp_month}/{p.card?.exp_year}</p>
            </div>
        </div>
    );


    if (props.isDoingShowOrderProcess) {
        mainContent = (<WaitLoader size='lg' />);
    } else if (o.id === -1) {
        return (<h4>Order not found</h4>);
    }



    let requestForReturnBtn = <button className="btn btn-light" onClick={props.onRequestForReturn}>Request for Return</button>;

    if (props.isRequestingForReturn) {
        requestForReturnBtn = (<MiniImageLoader />);
    }


    const cardFooterStyle = { backgroundColor: 'white' };



    return (
        <div className="col-md-12">
            <div className="card card-data">

                <div className="card-header card-header-options">
                    <div className="row align-items-center">
                        <div className="col py-2">
                            <h3 className="card-title">Details</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    {mainContent}
                </div>

                <div className="card-footer" style={cardFooterStyle}>
                    {requestForReturnBtn}
                </div>

            </div>
        </div>
    );
}



export default OrderInfo;