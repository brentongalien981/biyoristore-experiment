import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';



function Product(props) {

    const productImages = props.product.productPhotoUrls.map((productPhotoUrl, i) => {
        const url = BsCore.pubPhotoUrl + productPhotoUrl.url;
        return (<img src={url} key={i} alt="Image" />);
    });

    return (
        <div className="product" onClick={() => props.onProductClicked(props.product.id)}>
            <figure className="product-image">
                <a href="#!">{productImages}</a>
            </figure>
            <div className="product-meta">
                <h3 className="product-title"><a href="#!">{props.product.name}</a></h3>
                <div className="product-price">
                    <span>{"$" + props.product.price}</span>
                    <span className="product-action">
                        <a href="#!">Add to cart</a>
                    </span>
                </div>
                <a href="#!" className="product-like"></a>
            </div>
        </div>
    );
}



export default Product;