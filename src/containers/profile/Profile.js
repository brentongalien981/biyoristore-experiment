import React from 'react';
import PersonalData from './PersonalData';
import ProfileBanner from './ProfileBanner';
import ProfileSideBar from './ProfileSideBar';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/profile';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        if (BsAppSession.get("isLoggedIn") == 0) { this.props.history.push("/"); }
    }



    componentDidMount() {
        this.props.readProfile(BsAppSession.get("userId"));
    }



    render() {
        return (
            <>
                <ProfileBanner profile={this.props.profile} />

                <section className="pt-5">
                    <div className="container">
                        <div className="row gutter-4 justify-content-between">

                            <ProfileSideBar />

                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col">
                                        <div className="tab-content" id="myTabContent">
                                            <PersonalData profile={this.props.profile} />

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProfile: (userId) => dispatch(actions.readProfile(userId))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));