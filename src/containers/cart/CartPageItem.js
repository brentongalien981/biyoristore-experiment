import React from 'react';
import { Link } from 'react-router-dom';
import BsCore from '../../bs-library/helpers/BsCore';
import { getSizeComponentLabel } from '../../components/cart/helper-funcs/HelperFuncsA';
import SpinnerLoader from '../../components/loader/SpinnerLoader/SpinnerLoader';



function CartPageItem(props) {

    const productPhotoUrl = BsCore.pubPhotoUrl + props.item.product.productPhotoUrls[0].url;

    const mostEfficientSeller = props.item.product.mostEfficientSeller;
    const discountPrice = parseFloat(mostEfficientSeller.productSeller.discount_sell_price) ? parseFloat(mostEfficientSeller.productSeller.discount_sell_price) : 0;
    const regularPrice = parseFloat(mostEfficientSeller.productSeller.sell_price) ? parseFloat(mostEfficientSeller.productSeller.sell_price) : 0;
    const displayPrice = ((discountPrice != 0 && discountPrice < regularPrice) ? discountPrice : regularPrice);

    const quantity = parseInt(props.item.quantity);
    const itemTotalPrice = displayPrice * quantity;    


    return (
        <div className="cart-item">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="media media-product">
                        <a href="#!" onClick={(e) => props.onProductClick(e, props.item.product.id)}><img src={productPhotoUrl} alt="Image" /></a>
                        <div className="media-body">
                            <a href="#!" className="media-title" onClick={(e) => props.onProductClick(e, props.item.product.id)}>{props.item.product.name}</a>
                            <br />
                            <span className="small"><Link to={'/products?brands=' + props.item.product.brand.id}>{props.item.product.brand.name}</Link></span>
                            <br />
                            <span className="small">{getSizeComponentLabel(props.item)}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <span className="cart-item-price">${displayPrice.toFixed(2)}</span>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <div className="counter">
                        <span className="counter-minus icon-minus" field='qty-1' onClick={() => props.onSetCartItemCount(props.item.sellerProductId, props.item.sizeAvailabilityId, quantity - 1, props.index)}></span>
                        {getItemQtyComponent(props, quantity)}
                        <span className="counter-plus icon-plus" field='qty-1' onClick={() => props.onSetCartItemCount(props.item.sellerProductId, props.item.sizeAvailabilityId, quantity + 1, props.index)}></span>
                    </div>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <span className="cart-item-price">${itemTotalPrice.toFixed(2)}</span>
                </div>

                <a href="#!" className="cart-item-close" onClick={(e) => props.onRemoveCartItem(e, props.item.sellerProductId, props.item.sizeAvailabilityId)}><i className="icon-x"></i></a>
            </div>
        </div>
    );
}



function getItemQtyComponent(props, quantity) {
    let itemQtyComponent = (<input type='text' name='qty-1' className="counter-value" value={quantity} min="1" max="" disabled />);

    if (props.isSettingCartItemCount && props.currentlyEditingCartItemIndex == props.index) {
        itemQtyComponent = (<SpinnerLoader size='lg' />);
    }

    return itemQtyComponent;
}



export default CartPageItem;