import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';
import { getSizeComponentLabel } from './helper-funcs/HelperFuncsA';



function CartItem(props) {

    const productPhotoUrl = BsCore.pubPhotoUrl + props.item.product.productPhotoUrls[0].url;
    const mostEfficientSeller = props.item.product.mostEfficientSeller;
    const discountPrice = parseFloat(mostEfficientSeller.productSeller.discount_sell_price) ? parseFloat(mostEfficientSeller.productSeller.discount_sell_price) : 0;
    const regularPrice = parseFloat(mostEfficientSeller.productSeller.sell_price) ? parseFloat(mostEfficientSeller.productSeller.sell_price) : 0;
    const displayPrice = ((discountPrice != 0 && discountPrice < regularPrice) ? discountPrice : regularPrice);

    return (
        <div className="col-12">
            <div className="cart-item cart-item-sm">
                <div className="row align-items-center">
                    <div className="col-lg-9">
                        <div className="media media-product">
                            <a href="#!" onClick={(e) => props.onProductClick(e, props.item.product.id)}><img src={productPhotoUrl} alt="Image" /></a>
                            <div className="media-body">
                                <a href="#!" className="media-title" onClick={(e) => props.onProductClick(e, props.item.product.id)}>{props.item.product.name}</a>
                                <br />
                                {/* <span className="media-subtitle">xxx</span> */}
                                <span className="small">{getSizeComponentLabel(props.item)}</span>
                                <br />
                                <span className="small">x{props.item.quantity}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-center text-lg-right">
                        <span className="cart-item-price">${displayPrice.toFixed(2)}</span>
                    </div>
                    <a href="#" className="cart-item-close" onClick={(e) => props.onRemoveCartItem(e, props.item.sellerProductId, props.item.sizeAvailabilityId)}><i className="icon-x"></i></a>
                </div>
            </div>
        </div>
    );
}



export default CartItem;