import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';
import { connect } from 'react-redux';
import Bs from '../../bs-library/helpers/Bs';
import { onProductLiked, onProductClicked } from '../../actions/products';
import { onAddToCart } from '../../actions/cart';
import { withRouter } from 'react-router-dom';



function Product(props) {

    const productImages = props.product.productPhotoUrls.map((productPhotoUrl, i) => {
        const url = BsCore.pubPhotoUrl + productPhotoUrl.url;
        return (<img src={url} key={i} alt="Image" />);
    });

    const discountSellPrice = props.product.mostEfficientSeller.productSeller.discount_sell_price;
    const sellPrice = props.product.mostEfficientSeller.productSeller.sell_price;

    let priceComponent = (<span>{"$" + parseFloat(sellPrice).toFixed(2)}</span>);

    if (discountSellPrice) {
        const discountPriceStyle = { marginRight: "15%" };
        priceComponent = (<span><s style={discountPriceStyle} className="text-muted">{"$" + parseFloat(sellPrice).toFixed(2)}</s>{" $" + parseFloat(discountSellPrice).toFixed(2)}</span>);
    }



    return (
        <div className="product" onClick={(e) => props.onProductClicked(e, props, props.product)}>
            <figure className="product-image">
                <a href="#!">{productImages}</a>
            </figure>
            <div className="product-meta">
                <h3 className="product-title"><a href="#!" title={props.product.name}>{props.product.name}</a></h3>
                <div className="product-price">
                    {priceComponent}
                    {/* <span className="product-action"><a href="#!" onClick={(e) => props.onAddToCart(e, props.product)}>Add to cart</a></span> */}
                </div>
                {/* <a href="#!" className="product-like" onClick={(e) => props.onProductLiked(e)}></a> */}
            </div>
        </div>
    );
}



const mapDispatchToProps = (dispatch) => {
    return {
        onProductLiked: (e) => dispatch(onProductLiked(e)),
        // onAddToCart: (e, productId) => dispatch(onAddToCart(e, productId))
    };
};



export default connect(null, mapDispatchToProps)(withRouter(Product));