import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';



function OrderTableItem(props) {

    const productPhotoUrl = BsCore.pubPhotoUrl + props.item.product.productPhotoUrls[0].url;
    const itemTotalPrice = parseFloat(props.item.price) * parseInt(props.item.quantity);
    const quantity = parseInt(props.item.quantity);

    return (
        <div className="cart-item">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="media media-product">
                        <a href="#!"><img src={productPhotoUrl} alt="Image" /></a>
                        <div className="media-body">
                            <h5 className="media-title">{props.item.product.name}</h5>
                            <span className="small">{props.item.product.brand.name}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <span className="cart-item-price">${parseFloat(props.item.price).toFixed(2)}</span>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <div className="counter">
                        {/* <span className="counter-minus icon-minus" field='qty-1' onClick={() => props.onSetCartItemCount(props.item.id, quantity-1, props.index)}></span> */}
                        <input type='text' name='qty-1' className="counter-value" value={quantity} min="1" max="" disabled />
                        {/* <span className="counter-plus icon-plus" field='qty-1' onClick={() => props.onSetCartItemCount(props.item.id, quantity+1, props.index)}></span> */}
                    </div>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <span className="cart-item-price">${itemTotalPrice.toFixed(2)}</span>
                </div>

                {/* <a href="#!" className="cart-item-close" onClick={(e) => props.onRemoveCartItem(e, props.item.id, props.index)}><i className="icon-x"></i></a> */}
            </div>
        </div>
    );
}



export default OrderTableItem;