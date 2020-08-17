import React from 'react';



function ProductActions() {
    return (
        <div className="row">
            <div className="col-md-8">
                <a href="#!" className="btn btn-block btn-lg btn-primary">Add to Cart</a>
            </div>
            <div className="col-12 mt-1">
                <ul className="nav nav-actions">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Add to wishlist</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Share this product</a>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="#">Facebook</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Twitter</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}



export default ProductActions;