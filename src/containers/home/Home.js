import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/home';
import Bs from '../../bs-library/helpers/Bs';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import WaitLoader from '../../components/loader/WaitLoader';
import Hero from '../../theme-components/Hero';
import Separator from '../../theme-components/Separator';
import DemoLoginOptionsModal from './DemoLoginOptionsModal';
import FeaturedBrand from './FeaturedBrand';

class Home extends React.Component {

    state = {
        isReadingFeaturedBrands: false
    };

    render() {

        const featuredBrands = this.getFeaturedBrands();

        return (
            <>
                {/* <Hero content="Your Favourite Brands" /> */}
                {featuredBrands}
                {/* <Separator /> */}
                {/* <DemoLoginOptionsModal
                    onLogin={this.onLoginAsDemoUser}
                    onDismiss={this.onDismiss}
                /> */}
            </>
        );
    }



    componentDidMount() {
        this.setState({ isReadingFeaturedBrands: true });


        // BMD-ON-STAGING, BMD-ON-DEPLOYMENT
        const modalBtn = document.querySelector("#demoLoginOptionsModalBtn");
        if (modalBtn) { modalBtn.click(); }


        this.props.readFeaturedProducts({
            doCallBackFunc: () => {
                this.setState({ isReadingFeaturedBrands: false });
            }
        });
    }



    onDismiss() {
        BsAppSession.set('hasChosenDemoLoginOptions', 1);
    }



    onLoginAsDemoUser() {
        BsAppSession.set('hasChosenDemoLoginOptions', 1);

        let redirectLink = Bs.getAppBackendUrl() + '/bmd-socialite/login-with-auth-provider';
        redirectLink += '?provider=google';
        redirectLink += '&stayLoggedIn=0';

        window.location.replace(redirectLink);
    }



    getFeaturedBrands() {

        let brands = this.props.featuredBrands.map((b, i) => {
            return (
                <FeaturedBrand key={i} brand={b} />
            );
        });


        if (this.state.isReadingFeaturedBrands) {
            brands = <WaitLoader size="lg" />
        }



        return (
            <div className="hero pb-10">

                {this.getPageHeader()}

                <div className="container">
                    <div className="row gutter-1">
                        {brands}
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <Link to="/products" className="btn btn-outline-secondary">VIEW LISTINGS</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    getPageHeader() {
        return (
            <div className="container pb-6">
                <div className="row">
                    <div className="col">
                        <h3 className="">All Authentic</h3>
                        <h3 className="">All Verified</h3>
                        <h3 className="">Never Fake</h3>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        featuredBrands: state.home.featuredBrands
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readFeaturedProducts: (data) => dispatch(actions.readFeaturedProducts(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));