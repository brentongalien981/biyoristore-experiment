import React from 'react';
import { connect } from 'react-redux';
// import ShippingInfo from './ShippingInfo';
import * as actions from '../../actions/order';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import PaymentInfo from './PaymentInfo';
import OrderTable from './OrderTable';
import OrderInfo from './OrderInfo';



class Order extends React.Component {

    /* PROPERTIES */
    state = {
        isDoingShowOrderProcess: false,
        isRequestingForReturn: false
    };



    /* HELPER FUNCS */



    /* MAIN FUNCS */
    componentDidMount() {
        this.showOrder();
    }



    render() {

        let orderTableSection = (
            <>
                <div className="container pt-8 pb-2">
                    <h4>Items</h4>
                </div>
                <OrderTable order={this.props.order} />
            </>
        );

        if (this.state.isDoingShowOrderProcess || this.props.order.id == -1) {
            orderTableSection = (
                <div className="container pt-8 pb-2"></div>
            );
        }


        return (
            <>
                {/* page header */}
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Order Info</h1>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="container">
                    <div className="row justify-content-center">
                        <OrderInfo 
                            order={this.props.order} 
                            paymentInfo={this.props.paymentInfo} 
                            shipmentTrackerUrl={this.props.shipmentTrackerUrl}
                            isDoingShowOrderProcess={this.state.isDoingShowOrderProcess} 
                            isRequestingForReturn={this.state.isRequestingForReturn}
                            onRequestForReturn={this.onRequestForReturn}
                        />
                        {/* <PaymentInfo paymentInfo={this.props.paymentInfo} /> */}
                    </div>
                </div>

                {orderTableSection}
            </>
        );
    }



    /* EVENT FUNCS */
    // BMD-TODO
    onRequestForReturn = () => {
        
        if (this.state.isDoingShowOrderProcess) { return; }
        if (this.state.isRequestingForReturn) { return; }

        // this.props.history.push('/create-order-return');

        this.setState({ isRequestingForReturn: true });


        const data = {
            params: {
                orderId: this.props.order.id
            },                        
            doCallBackFunc: () => {
                this.setState({ isRequestingForReturn: false });
            }
        };


        this.props.requestForReturn(data);

    };




    showOrder = () => {

        if (this.state.isDoingShowOrderProcess) { return; }

        const urlParams = this.props.location.search;
        const acceptedParams = ["id"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);


        if (parsedUrlParams.id) {

            this.setState({ isDoingShowOrderProcess: true });

            const data = {
                orderId: parsedUrlParams.id,
                doCallBackFunc: () => {
                    this.setState({ isDoingShowOrderProcess: false });
                }
            };
            this.props.showOrder(data);
        }
    };
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        paymentInfo: state.order.paymentInfo,
        order: state.order.order,
        shipmentTrackerUrl: state.order.shipmentTrackerUrl        
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        showOrder: (data) => dispatch(actions.showOrder(data)),
        requestForReturn: (data) => dispatch(actions.requestForReturn(data))        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));