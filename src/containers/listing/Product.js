import React from 'react';



function Product(props) {

    const productImages = props.product.imageUrls.map((url, i) => {
        return (<img src={url} key={i} alt="Image" />);
    });

    return (
        <div className="product">
            <figure className="product-image">
                <a href="#!">{productImages}</a>
            </figure>
            <div className="product-meta">
                <h3 className="product-title"><a href="#!">{props.product.title}</a></h3>
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