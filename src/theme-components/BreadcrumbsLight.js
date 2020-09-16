import React from 'react';
import { Link } from 'react-router-dom';



function BreadcrumbsLight(props) {

    const numOfLinks = props.breadCrumbLinks.length;
    
    const links = props.breadCrumbLinks.map((l, i) => {
        if (i == numOfLinks - 1) { return (<li className="breadcrumb-item active" aria-current="page">{l.name}</li>); }
        else return <li className="breadcrumb-item"><Link to={l.url}>{l.name}</Link></li>;
    });

    return (
        <section className="breadcrumbs bg-light">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                {links}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default BreadcrumbsLight;