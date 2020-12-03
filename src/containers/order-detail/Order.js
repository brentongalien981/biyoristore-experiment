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



    /* HELPER FUNCS */



    /* MAIN FUNCS */
    componentDidMount() {
        //ish
        const urlParams = this.props.location.search;
        const acceptedParams = ["id"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);


        if (parsedUrlParams.id) {
            const objs = { orderId: parsedUrlParams.id };
            this.props.showOrder(objs);
        }
    }



    render() {
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
                        <OrderInfo order={this.props.order} paymentInfo={this.props.paymentInfo} />
                        {/* <PaymentInfo paymentInfo={this.props.paymentInfo} /> */}
                    </div>
                </div>

                
                <div className="container pt-8 pb-2">
                    <h4>Items</h4>
                </div>
                <OrderTable orderItems={this.props.order.orderItems} />
            </>
        );
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        paymentInfo: state.order.paymentInfo,
        order: state.order.order,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        showOrder: (objs) => dispatch(actions.showOrder(objs)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));