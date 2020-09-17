import React from 'react';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import BsCore from '../../bs-library/helpers/BsCore';



class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImageUrl: BsCore.pubPhotoUrl + "background-8.jpg"
        };
    }

    render() {

        const styleAttribVal = {
            backgroundImage: "url(" + this.state.backgroundImageUrl + ")"
        };

        return (
            <section className="py-md-0">
                <div className="image image-overlay" style={styleAttribVal}></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-md-100">
                        <div className="col-md-10 col-lg-5">
                            <div className="accordion accordion-portal" id="accordionExample">
                                <SignIn />
                                <CreateAccount />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}



export default Join;