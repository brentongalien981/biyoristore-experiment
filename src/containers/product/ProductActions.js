import React, { useContext } from 'react';
import ProductInDetailsContext from '../../contexts/product/ProductInDetailsContext';



function ProductActions(props) {

    // React's thing for using contexts.
    const context = useContext(ProductInDetailsContext);

    return (
        <div className="row">
            <div className="col-md-8">
                <a href="#!" className="btn btn-block btn-lg btn-primary" onClick={(e) => context.onAddToCart(e, props.product)}>Add to Cart</a>
            </div>
            <div className="col-12 mt-1">
                <ul className="nav nav-actions">

                    {/* <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => alert("TODO")}>Add to wishlist</a>
                    </li> */}

                </ul>
            </div>
        </div>
    );
}



export default ProductActions;