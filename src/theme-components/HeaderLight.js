import React from 'react';
import { Link } from 'react-router-dom';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BsAppSession from '../bs-library/helpers/BsAppSession';

function HeaderLight(props) {

    return (
        <header className="header header-light header-sticky">
            <div className="container">
                <div className="row">

                    <nav className="navbar navbar-expand-lg navbar-light">

                        {/* <a href="index.html" className="navbar-brand order-1 order-lg-2"><img src="assets/images/logo-dark.svg" alt="Logo" /></a> */}
                        <Link to="/" className="navbar-brand order-1 order-lg-2"><img src="assets/images/logos/PenguinJamLogoColored.png" width="60px" alt="Logo" /></Link>


                        <button className="navbar-toggler order-2" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse order-3 order-lg-1" id="navbarMenu">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                            </ul>
                        </div>

                        <div className="collapse navbar-collapse order-4 order-lg-3" id="navbarMenu2">
                            <ul className="navbar-nav ml-auto">
                                {getProfileLinks(props)}
                                <li className="nav-item">
                                    <a data-toggle="modal" data-target="#search" className="nav-link"><i className="icon-search"></i></a>
                                </li>
                                <li className="nav-item cart">
                                    <a data-toggle="modal" data-target="#cart" className="nav-link"><span>Cart</span><span>{props.cartItemsCount}</span></a>
                                </li>
                            </ul>
                        </div>


                    </nav>
                </div>
            </div>
        </header>
    );
}



function getProfileLinks(props) {
    const isLoggedIn = BsAppLocalStorage.get("isLoggedIn");

    if (isLoggedIn == 1) {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown-10" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{BsAppLocalStorage.get("email")}</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown-10">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => props.onLogout(e)}>Log out</a></li>
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