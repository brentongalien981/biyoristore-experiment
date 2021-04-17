import React, { useContext } from 'react';
import MiniImageLoader from '../../components/loader/MiniImageLoader/MiniImageLoader';
import ProductInDetailsContext from '../../contexts/product/ProductInDetailsContext';



function ProductActions(props) {

    // React's thing for using contexts.
    const context = useContext(ProductInDetailsContext);

    let addToCartBtnSection = (
        <a href="#!" className="btn btn-block btn-lg btn-primary" onClick={(e) => context.onAddToCart(e, props.product)}>Add to Cart</a>
    );
    
    if (props.isAddingItemToCart) {
        addToCartBtnSection = (
            <MiniImageLoader />
        );
    }

    return (
        <div className="row">
            <div className="col-md-8">
                {addToCartBtnSection}
            </div>
            <div className="col-12 mt-1">
                <ul className="nav nav-actions">

                    {/* <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => alert("xxx")}>Add to wishlist</a>
                    </li> */}

                </ul>
            </div>
        </div>
    );
}



export default ProductActions;