import React from 'react';
import { Link } from 'react-router-dom';
import BsAppSession from '../bs-library/helpers/BsAppSession';

function HeaderLight() {

    return (
        <header className="header header-light header-sticky">
            <div className="container">
                <div className="row">

                    <nav className="navbar navbar-expand-lg navbar-light">

                        <a href="index.html" className="navbar-brand order-1 order-lg-2"><img src="assets/images/logo-dark.svg" alt="Logo" /></a>


                        <button className="navbar-toggler order-2" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse order-3 order-lg-1" id="navbarMenu">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>

                                <li className="nav-item dropdown megamenu">
                                    <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown-4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown-4">
                                        <div className="row">
                                            <ul className="col-6 col-md-3 col-lg-2">
                                                <li><span className="megamenu-title">Home</span></li>
                                                <li><a className="dropdown-item" href="index.html">Home - classNameic</a></li>
                                                <li><a className="dropdown-item" href="index-carousel.html">Home - carousel</a></li>
                                                <li><a className="dropdown-item" href="index-categories.html">Home - categories</a></li>
                                                <li><Link className="dropdown-item" to="/">Home - modern</Link></li>
                                                <li><a className="dropdown-item" href="index-minimal.html">Home - minimal</a></li>
                                                <li><span className="megamenu-title">Shop</span></li>
                                                <li><Link className="dropdown-item" to="/listing">Listing - sidebar</Link></li>
                                                <li><a className="dropdown-item" href="listing-full.html">Listing - full width</a></li>
                                                <li><a className="dropdown-item" href="listing-masonry.html">Listing - masonry</a></li>
                                                <li><a className="dropdown-item" href="listing-modern.html">Listing - modern</a></li>
                                            </ul>

                                            <ul className="col-6 col-md-3 col-lg-2">
                                                <li><span className="megamenu-title">Product</span></li>
                                                <li><Link className="dropdown-item" to="/product">Product - classic</Link></li>
                                                <li><a className="dropdown-item" href="product-scroll.html">Product - scroll</a></li>
                                                <li><a className="dropdown-item" href="product-masonry.html">Product - masonry</a></li>
                                                <li><a className="dropdown-item" href="product-modern.html">Product - modern</a></li>
                                                <li><a className="dropdown-item" href="product-promo.html">Product - promo</a></li>
                                                <li><a className="dropdown-item" href="product-oos.html">Product - out of stock</a></li>
                                                <li><span className="megamenu-title">Order</span></li>
                                                <li><a className="dropdown-item" href="cart.html">Cart</a></li>
                                                <li><a className="dropdown-item" href="cart-full.html">Cart - full width</a></li>
                                                <li><a className="dropdown-item" href="checkout.html">Checkout</a></li>
                                            </ul>

                                            <ul className="col-6 col-md-3 col-lg-2">
                                                <li><span className="megamenu-title">Account</span></li>
                                                <li><a className="dropdown-item" href="portal.html">Log In</a></li>
                                                <li><a className="dropdown-item" href="profile.html">Profile</a></li>
                                                <li><a className="dropdown-item" href="profile-orders.html">Orders</a></li>
                                                <li><a className="dropdown-item" href="profile-addresses.html">Addresses</a></li>
                                                <li><a className="dropdown-item" href="profile-payments.html">Payments</a></li>
                                                <li><a className="dropdown-item" href="profile-wishlist.html">Wishlist</a></li>
                                                <li><span className="megamenu-title">Blog</span></li>
                                                <li><a className="dropdown-item" href="blog-cards.html">Blog - cards</a></li>
                                                <li><a className="dropdown-item" href="blog-posts.html">Blog - posts</a></li>
                                                <li><a className="dropdown-item" href="post.html">Post</a></li>
                                            </ul>

                                            <ul className="col-6 col-md-3 col-lg-2">
                                                <li><span className="megamenu-title">Pages</span></li>
                                                <li><a className="dropdown-item" href="about.html">About</a></li>
                                                <li><a className="dropdown-item" href="contact.html">Contact</a></li>
                                                <li><a className="dropdown-item" href="faq.html">FAQ</a></li>
                                                <li><a className="dropdown-item" href="text.html">Text Page</a></li>
                                                <li><a className="dropdown-item" href="404.html">404</a></li>
                                                <li><a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
                                                <li><span className="megamenu-title">Docs</span></li>
                                                <li><a className="dropdown-item" href="/documentation/index.html">Documentation</a></li>
                                                <li><a className="dropdown-item" href="/documentation/changelog.html">Changelog</a></li>
                                            </ul>

                                            <div className="col-lg-4">
                                                <div className="promo">
                                                    <span className="image image-overlay" style={{ backgroundImage: "url(assets/images/background-3.jpg)" }}></span>
                                                    <div className="promo-footer p-4 text-white">
                                                        <h3 className="mb-0">New Collection</h3>
                                                        <a href="#!" className="eyebrow underline text-white">Shop Now</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="collapse navbar-collapse order-4 order-lg-3" id="navbarMenu2">
                            <ul className="navbar-nav ml-auto">
                                {getProfileLinks()}
                                <li className="nav-item">
                                    <a data-toggle="modal" data-target="#search" className="nav-link"><i className="icon-search"></i></a>
                                </li>
                                <li className="nav-item cart">
                                    <a data-toggle="modal" data-target="#cart" className="nav-link"><span>Cart</span><span>2</span></a>
                                </li>
                            </ul>
                        </div>


                    </nav>
                </div>
            </div>
        </header>
    );
}



function getProfileLinks() {
    const isLoggedIn = BsAppSession.get("isLoggedIn");

    if (isLoggedIn == 1) {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown-10" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{BsAppSession.get("email")}</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown-10">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                    <li><Link className="dropdown-item" to="/addresses">Addresses</Link></li>
                    <li><Link className="dropdown-item" to="/payments">Payments</Link></li>
                </ul>

            </li>
        );
    }

    return (
        <li className="nav-item">
            <Link className="nav-link" to="/join">Log In</Link>
        </li>
    );
}


export default HeaderLight;