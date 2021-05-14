import React from 'react';
import SpinnerLoader from '../../components/loader/SpinnerLoader/SpinnerLoader';
import Product from '../listing/Product';



function SuggestedProducts(props) {

    const relatedProducts = props.relatedProducts.map((p, i) => {
        return (<Product product={p} key={i} onProductClicked={props.onProductClicked} />);
    });


    let mainSection = (
        <div className="col">
            <div className="tab-content" id="myTabContent">

                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="owl-carousel owl-carousel-arrows visible" data-items="[4,4,2,1]" data-margin="10" data-loop="true" data-dots="true" data-nav="true">
                        {relatedProducts}

                    </div>
                </div>

            </div>
        </div>
    );


    if (props.isReadingProduct) {
        mainSection = (
            <div className="row gutter-2 gutter-lg-4 animate__animated animate__fadeIn">
                <SpinnerLoader size='xl' />
            </div>
        );
    }


    return (
        <section className="no-overflow">
            <div className="container">
                <div className="row">


                    <div className="col-12 mb-3">
                        <ul className="nav nav-tabs lavalamp" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Related Products</a>
                            </li>
                        </ul>
                    </div>


                    {mainSection}

                </div>
            </div>
        </section>
    );
}



export default SuggestedProducts;