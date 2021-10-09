import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/home';
import WaitLoader from '../../components/loader/WaitLoader';
import Hero from '../../theme-components/Hero';
import Separator from '../../theme-components/Separator';
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
                <Separator />
            </>
        );
    }



    componentDidMount() {
        this.setState({ isReadingFeaturedBrands: true });

        this.props.readFeaturedProducts({
            doCallBackFunc: () => {
                this.setState({ isReadingFeaturedBrands: false });
            }
        });
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