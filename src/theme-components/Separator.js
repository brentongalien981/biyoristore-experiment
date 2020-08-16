import React from 'react';



function Separator() {
    return (
        <section className="separator-bottom">
            <div className="container">
                <div className="row gutter-4">
                    <div className="col-md-4">
                        <div className="text-center px-2">
                            <i className="text-dark icon-Money---Alt fs-40 mb-2"></i>
                            <h4 className="eyebrow d-block text-dark">Moneyback Guarantee</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center px-2">
                            <i className="text-dark icon-Airplane fs-40 mb-2"></i>
                            <h4 className="eyebrow d-block text-dark">Free Delivery</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center px-2">
                            <i className="text-dark icon-Guard fs-40 mb-2"></i>
                            <h4 className="eyebrow d-block text-dark">International Warranty</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default Separator;