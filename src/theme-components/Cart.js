import React from 'react';



function Cart() {
    return (
        <div className="modal fade sidebar" id="cart" tabIndex="-1" role="dialog" aria-labelledby="cartLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cartLabel">Cart</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="row gutter-3">
                            <div className="col-12">
                                <div className="cart-item cart-item-sm">
                                    <div className="row align-items-center">
                                        <div className="col-lg-9">
                                            <div className="media media-product">
                                                <a href="#!"><img src="assets/images/demo/product-3.jpg" alt="Image" /></a>
                                                <div className="media-body">
                                                    <h5 className="media-title">Black IC Pendant Light</h5>
                                                    <span className="media-subtitle">Black, Steel</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 text-center text-lg-right">
                                            <span className="cart-item-price">$90</span>
                                        </div>
                                        <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="cart-item cart-item-sm">
                                    <div className="row align-items-center">
                                        <div className="col-lg-9">
                                            <div className="media media-product">
                                                <a href="#!"><img src="assets/images/demo/product-4.jpg" alt="Image" /></a>
                                                <div className="media-body">
                                                    <h5 className="media-title">Red Analog Magazine Rack</h5>
                                                    <span className="media-subtitle">Red</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 text-center text-lg-right">
                                            <span className="cart-item-price">$120</span>
                                        </div>
                                        <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="cart-item cart-item-sm">
                                    <div className="row align-items-center">
                                        <div className="col-lg-9">
                                            <div className="media media-product">
                                                <a href="#!"><img src="assets/images/demo/product-24.jpg" alt="Image" /></a>
                                                <div className="media-body">
                                                    <h5 className="media-title">Closca Helmet</h5>
                                                    <span className="media-subtitle">Black</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 text-center text-lg-right">
                                            <span className="cart-item-price">$132</span>
                                        </div>
                                        <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <div className="container-fluid">
                            <div className="row gutter-0">
                                <div className="col d-none d-md-block">
                                    <a href="cart.html" className="btn btn-lg btn-block btn-secondary">View Cart</a>
                                </div>
                                <div className="col">
                                    <a href="checkout.html" className="btn btn-lg btn-block btn-primary">Checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Cart;