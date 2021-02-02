import React from 'react';
import Product from '../listing/Product';



function SuggestedProducts(props) {

    const relatedProducts = props.relatedProducts.map((p, i) => {
        return (<Product product={p} key={i} onProductClicked={props.onProductClicked} />);
    });

    
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


                    <div className="col">
                        <div className="tab-content" id="myTabContent">


                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="owl-carousel owl-carousel-arrows visible" data-items="[4,4,2,1]" data-margin="10" data-loop="true" data-dots="true" data-nav="true">
                                    {relatedProducts}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}



export default SuggestedProducts;