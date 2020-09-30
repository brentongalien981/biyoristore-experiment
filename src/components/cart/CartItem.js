import React from 'react';



function CartItem(props) {
    return (
        <div className="col-12">
            <div className="cart-item cart-item-sm">
                <div className="row align-items-center">
                    <div className="col-lg-9">
                        <div className="media media-product">
                            <a href="#!"><img src="assets/images/demo/product-3.jpg" alt="Image" /></a>
                            <div className="media-body">
                                <h5 className="media-title">{props.item.name}</h5>
                                {/* <span className="media-subtitle">Black, Steel</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-center text-lg-right">
                        <span className="cart-item-price">${props.item.price}</span>
                    </div>
                    <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                </div>
            </div>
        </div>
    );
}



export default CartItem;