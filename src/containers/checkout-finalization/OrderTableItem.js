import React from 'react';
import { Link } from 'react-router-dom';
import BsCore from '../../bs-library/helpers/BsCore';



function OrderTableItem(props) {

    const productPhotoUrl = BsCore.pubPhotoUrl + props.item.product.productPhotoUrls[0].url;
    let itemMostEfficientPrice = props.item.product.mostEfficientSeller.productSeller.discount_sell_price ?? props.item.product.mostEfficientSeller.productSeller.sell_price;
    itemMostEfficientPrice = parseFloat(itemMostEfficientPrice);
    const itemTotalPrice = itemMostEfficientPrice * parseInt(props.item.quantity);
    const quantity = parseInt(props.item.quantity);
    const productLink = "/product?productId=" + props.item.product.id;

    return (
        <div className="cart-item">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="media media-product">
                        <Link to={productLink}><img src={productPhotoUrl} alt="Image" /></Link>
                        <div className="media-body">
                            <h5 className="media-title"><Link to={productLink} style={{ color: "black" }}>{props.item.product.name}</Link></h5>
                            <span className="small">{props.item.product.brand.name}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <span className="cart-item-price">${itemMostEfficientPrice.toFixed(2)}</span>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <div className="counter">
                        <input type='text' name='qty-1' className="counter-value" value={quantity} min="1" max="" disabled />
                    </div>
                </div>
                <div className="col-4 col-lg-2 text-center">
                    <span className="cart-item-price">${itemTotalPrice.toFixed(2)}</span>
                </div>

            </div>
        </div>
    );
}



export default OrderTableItem;