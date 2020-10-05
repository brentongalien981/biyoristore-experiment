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

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Share this product</a>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="#" onClick={() => alert("TODO")}>Facebook</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" onClick={() => alert("TODO")}>Twitter</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}



export default ProductActions;