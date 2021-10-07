import React from 'react';
import { Link } from 'react-router-dom';



function Footer() {
    return (
        <footer className="bg-dark text-white py-0">
            {/* <input id="shouldRelaunchVendorScript" type="hidden" value="0" /> */}
            <button id="shouldRelaunchVendorScript" style={{ display: "none" }}>0</button>
            <div className="container">
                <div className="row separated">

                    <div className="col-lg-6 py-10">

                        {/* <div className="row">
                            <div className="col-md-8">
                                <p>Thanks to <a href="https://www.opumo.com" className="underline">Opumo</a> for the images used in this demo theme. Head over to <a href="https://www.opumo.com" className="underline">their store</a> to get these products.</p>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-md-10">
                                <h4 className="eyebrow mb-2">Links</h4>
                                <ul className="list-group list-group-columns">
                                    {/* <li className="list-group-item"><a href="about.html">About</a></li> */}
                                    {/* <li className="list-group-item"><a href="contact.html">Contact Us</a></li> */}
                                    {/* <li className="list-group-item"><a href="faq.html">FAQ</a></li> */}
                                    {/* <li className="list-group-item"><a href="blog.html">Blog</a></li> */}                                    
                                    <li className="list-group-item"><Link to="/privacy-policy">Privacy Policy</Link></li>
                                    <li className="list-group-item"><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
                                    <li className="list-group-item"><Link to="/refund-policy">Refund Policy</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>



                    <div className="col-lg-6 py-10">

                        {/* <div className="row justify-content-end">
                            <div className="col-lg-10">
                                <h4 className="eyebrow mb-2">Subscribe</h4>
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Subscribe" aria-describedby="button-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-white" type="button" id="button-addon2">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="row justify-content-end">
                            <div className="col-lg-10">
                                <h4 className="eyebrow mb-2">Follow us</h4>
                                <nav className="nav nav-icons">
                                    <a className="nav-link" href="#!"><i className="icon-facebook-o"></i></a>
                                    <a className="nav-link" href="#!"><i className="icon-twitter-o"></i></a>
                                    <a className="nav-link" href="#!"><i className="icon-youtube-o"></i></a>
                                </nav>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </footer>
    );
}



export default Footer;