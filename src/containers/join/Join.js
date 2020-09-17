import React from 'react';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import BsCore from '../../bs-library/helpers/BsCore';
import { connect } from 'react-redux';
import * as actions from '../../actions/join';



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
                                <CreateAccount 
                                    onEmailChanged={this.props.onEmailChangedForCreateAccount}
                                    onRegister={this.props.onRegister} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: () => dispatch(actions.onRegister()),
        onEmailChangedForCreateAccount: () => dispatch(actions.onEmailChangedForCreateAccount()),
    };
};



export default connect(null, mapDispatchToProps)(Join);