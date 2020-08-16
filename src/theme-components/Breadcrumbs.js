import React from 'react';
import { Link } from 'react-router-dom';



function Breadcrumbs() {

    return (
        <section className="breadcrumbs separator-bottom">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Listing</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default Breadcrumbs;