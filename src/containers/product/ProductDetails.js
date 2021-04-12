import React from 'react';
import ProductColorFilter from './ProductColorFilter';
import ProductActions from './ProductActions';
import ProductSizeFilter from './ProductSizeFilter';



function ProductDetails(props) {

    const p = props.product;
    const sellPrice = p.mostEfficientSeller?.productSeller.sell_price;
    const discountSellPrice = p.mostEfficientSeller?.productSeller.discount_sell_price;

    let priceSectionElement = (<span className="item-price">${sellPrice}</span>);
    if (parseFloat(discountSellPrice)) {
        priceSectionElement = (<span className="item-price"><s className="text-muted">${discountSellPrice}</s> ${sellPrice}</span>);
    }

    let outOfStockComponent = null;
    if (isProductOutOfStock(p)) {
        outOfStockComponent = (<span className="item-price text-red">Out of stock</span>);
    }


    return (
        <div className="col-lg-5 mb-5 mb-lg-0">
            {/* product main details */}
            <div className="row">
                <div className="col-12">
                    <span id="ShownProductBrandName" className="item-brand">{p?.brand?.name}</span>
                    <h1 id="ShownProductName" className="item-title">{p?.name}</h1>
                    {priceSectionElement}
                    <br />
                    {outOfStockComponent}
                </div>
            </div>

            <div className="row mb-4">
                <ProductSizeFilter product={p} />
            </div>
            <ProductActions product={p} isAddingItemToCart={props.isAddingItemToCart} />
        </div>
    );
}



function isProductOutOfStock(product) {
    let returnVal = true;

    switch (product.packageItemTypeId) {
        case 1: // shirt
        case 2: // jersey
        case 3: // shorts
        case 4: // hoodie
        case 5: // shoes
            const sizeAvailabilities = product.mostEfficientSeller?.sizeAvailabilities ?? [];
            for (const sizeAvailability of sizeAvailabilities) {
                if (sizeAvailability.quantity > 0) { 
                    returnVal = false; 
                    break;
                }
            }
            
            break;
        case 6: // pctowercase
            const quantity = product.mostEfficientSeller?.productSeller?.quantity;
            if (quantity && quantity > 0) { returnVal = false; }
            break;
    }

    return returnVal;
}



export default ProductDetails;