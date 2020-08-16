import React from 'react';



function FilterByCategories() {

    return (
        <div className="widget">
            <span className="widget-collapse d-lg-none" data-toggle="collapse" data-target="#collapse-1" aria-expanded="false" aria-controls="collapse-1" role="button">Filter by Category</span>
            <div className="d-lg-block collapse" id="collapse-1">
                <span className="widget-title">Categories</span>
                <div className="widget-content">

                    <ul id="page-nav" className="nav flex-column nav-category">

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#menu-2" role="button" aria-expanded="false" aria-controls="menu-2">Women</a>
                            <div className="collapse" id="menu-2" data-parent="#page-nav">
                                <div>
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#!">New In</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#!">Clothing</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#!">Shoes</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#!">Accessories</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#!">Face + Body</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#!">Outlet</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}



export default FilterByCategories;