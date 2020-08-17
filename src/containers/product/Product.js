import React from 'react';
import BreadcrumbsLight from '../../theme-components/BreadcrumbsLight';
import ProductMainSection from './ProductMainSection';
import ProductExtraInfo from './ProductExtraInfo';



class Product extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }



    render() {
        return (
            <>
                <BreadcrumbsLight />
                <ProductMainSection />
                <ProductExtraInfo />
            </>
        );
    }
}



export default Product;