import React from 'react';



function Hero(props) {

    let content = props.content;
    if (!content || content.length === 0) {
        content = (<>New <b>Back to School 2019</b> Gadgets in Store</>);
    }

    return (
        <section className="hero hero-small">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 text-center">
                        <h1 className="mb-2">{content}</h1>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default Hero;