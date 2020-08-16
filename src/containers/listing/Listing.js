import React from 'react';
import Breadcrumbs from '../../theme-components/Breadcrumbs';
import FilterByCategories from './FilterByCategories';
import FilterByBrand from './FilterByBrand';
import FilterBySize from './FilterBySize';
import FilterByColor from './FilterByColor';
import FilterByPrice from './FilterByPrice';
import ListingHeader from './ListingHeader';
import Product from './Product';
import Pagination from './Pagination';

class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    title: "Fawn Wool / Natural Mammoth Chair",
                    price: "2268",
                    imageUrls: [
                        "assets/images/demo/product-1.jpg",
                        "assets/images/demo/product-1-2.jpg"
                    ]
                },
                {
                    title: "Dark Stained NY11 Dining Chair",
                    price: "504",
                    imageUrls: [
                        "assets/images/demo/product-2.jpg",
                        "assets/images/demo/product-2-2.jpg",
                        "assets/images/demo/product-2-3.jpg"
                    ]
                },
                {
                    title: "Black IC Pendant Light",
                    price: "410",
                    imageUrls: [
                        "assets/images/demo/product-3.jpg",
                        "assets/images/demo/product-3-2.jpg"
                    ]
                },
                {
                    title: "Black Closca Helmet",
                    price: "132",
                    imageUrls: [
                        "assets/images/demo/product-24.jpg",
                        "assets/images/demo/product-24-2.jpg"
                    ]
                },
                {
                    title: "Gravel Black Sigg Water Bottle",
                    price: "23",
                    imageUrls: [
                        "assets/images/demo/product-25.jpg",
                        "assets/images/demo/product-25-2.jpg"
                    ]
                },
                {
                    title: "Red Analog Magazine Rack",
                    price: "120",
                    imageUrls: [
                        "assets/images/demo/product-4.jpg",
                        "assets/images/demo/product-4-2.jpg"
                    ]
                },
                {
                    title: "Black Piani Table Lamp",
                    price: "290",
                    imageUrls: [
                        "assets/images/demo/product-5.jpg",
                        "assets/images/demo/product-5-2.jpg"
                    ]
                },
                {
                    title: "Grey Pendant Bell Lamp",
                    price: "258",
                    imageUrls: [
                        "assets/images/demo/product-6.jpg",
                        "assets/images/demo/product-6-2.jpg"
                    ]
                }
            ]
        };
    }



    render() {

        const products = this.state.products.map((p, i) => {
            return (<Product product={p} key={i} />);
        });

        return (
            <>
                <Breadcrumbs />

                <section className="pt-6">
                    <div className="container">

                        <ListingHeader />

                        <div className="row gutter-4">

                            {/* sidebar */}
                            <aside className="col-lg-3 sidebar">
                                <FilterByCategories />
                                <FilterByBrand />
                                <FilterBySize />
                                <FilterByColor />
                                <FilterByPrice />
                            </aside>

                            {/* content */}
                            <div className="col-lg-9">
                                <div className="row gutter-2 gutter-lg-3">{products}</div>
                                <Pagination />
                            </div>

                        </div>
                    </div>
                </section>
            </>
        );
    }
}



export default Listing;