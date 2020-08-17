import React from 'react';
import { Link } from 'react-router-dom';



function BreadcrumbsLight() {

    return (
        <section className="breadcrumbs bg-light">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="listing">Listing</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default BreadcrumbsLight;