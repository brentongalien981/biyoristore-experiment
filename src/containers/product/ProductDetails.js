import React from 'react';
import ProductColorFilter from './ProductColorFilter';
import ProductActions from './ProductActions';



function ProductDetails(props) {

    const p = props.product;
    const sellPrice = p.mostEfficientSeller?.productSeller.sell_price;
    const discountSellPrice = p.mostEfficientSeller?.productSeller.discount_sell_price;

    let priceSectionElement = (<span className="item-price">${sellPrice}</span>);
    if (parseFloat(discountSellPrice)) {
        priceSectionElement = (<span className="item-price"><s className="text-muted">${discountSellPrice}</s> ${sellPrice}</span>);
    }


    return (
        <div className="col-lg-5 mb-5 mb-lg-0">
            {/* product main details */}
            <div className="row">
                <div className="col-12">
                    <span className="item-brand">{p?.brand?.name}</span>
                    <h1 className="item-title">{p?.name}</h1>
                    {priceSectionElement}
                </div>
            </div>


            {/* product description */}
            <div className="row">
                <div className="col-12">
                    <p>{p?.description}</p>
                </div>
            </div>

            {/* <ProductColorFilter /> */}
            <ProductActions product={p} />
        </div>
    );
}



export default ProductDetails;