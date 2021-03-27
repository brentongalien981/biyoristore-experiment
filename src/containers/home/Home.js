import React from 'react';
import Hero from '../../theme-components/Hero';
import Separator from '../../theme-components/Separator';
import BsCore from '../../bs-library/helpers/BsCore';
import Bs from '../../bs-library/helpers/Bs';
import FeaturedModernProduct from '../../components/product/FeaturedModernProduct';
import FeaturedProductCategory from '../../components/product-category/FeaturedProductCategory';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }


    render() {

        const content = "May 15 is a good date...";
        const featuredProductCategories = this.getFeaturedProductCategories();

        return (
            <>
                <Hero content={content} />
                {featuredProductCategories}
                <Separator />
            </>
        );
    }



    componentDidMount() {

        BsCore.ajaxCrud({
            url: '/products/featured',
            params: {},
            callBackFunc: (requestData, json) => {
                Bs.log("#####################");
                Bs.log("json.objs ==> " + json.objs);
                Bs.log("json.isResultOk ==> " + json.isResultOk);
                Bs.log("products ==> " + json.objs);
                this.setState({
                    categories: [...json.objs]
                });
            }
        });
    }



    getFeaturedProductCategories() {

        const categories = this.state.categories.map((c, i) => {
            return (
                <FeaturedProductCategory key={i} category={c} />
            );
        });



        return (
            <div className="hero pb-10">
                <div className="container">
                    <div className="row gutter-1">
                        {categories}
                    </div>
                </div>
            </div>
        );
    }
}



export default Home;