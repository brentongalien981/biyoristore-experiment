import React from 'react';
import BreadcrumbsLight from '../../theme-components/BreadcrumbsLight';
import ProductMainSection from './ProductMainSection';
import ProductExtraInfo from './ProductExtraInfo';
import SuggestedProducts from './SuggestedProducts';
import ProductReviews from './ProductReviews';
import CreateReview from './CreateReview';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import { connect } from 'react-redux';



class ProductInDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: componentDidMount()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);
        Bs.log("this.props.message ==> " + this.props.message);
    }



    render() {
        return (
            <>
                <BreadcrumbsLight />
                <ProductMainSection />
                <ProductExtraInfo />
                <SuggestedProducts products={this.props.relatedProducts} />
                <ProductReviews reviews={this.props.reviews} />
                <CreateReview />
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        message: state.productInDetails.message,
        relatedProducts: state.productInDetails.relatedProducts,
        reviews: state.productInDetails.reviews,
    };
};



export default connect(mapStateToProps, null)(withRouter(ProductInDetails));