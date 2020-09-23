import React from 'react';
import PersonalData from './PersonalData';
import ProfileBanner from './ProfileBanner';
import ProfileSideBar from './ProfileSideBar';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/profile';
import Bs from '../../bs-library/helpers/Bs';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        };

        if (BsAppSession.get("isLoggedIn") == 0) { this.props.history.push("/"); }
    }



    componentDidMount() {
        this.props.readProfile(BsAppSession.get("userId"));
    }



    componentDidUpdate() {
        if (this.props.shouldDisplayProfile) { 
            this.setState({
                profile: this.props.profile
            });

            this.props.onProfileDisplayedSuccess();
        }
    }



    onPersonalDataChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedProfile = this.state.profile;
        updatedProfile[name] = value;

        this.setState({ profile: updatedProfile });
    }



    saveProfile = (e) => {
        e.preventDefault();
        this.props.saveProfile(this.state.profile);
    };



    render() {
        return (
            <>
                <ProfileBanner profile={this.state.profile} />

                <section className="pt-5">
                    <div className="container">
                        <div className="row gutter-4 justify-content-between">

                            <ProfileSideBar />

                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col">
                                        <div className="tab-content" id="myTabContent">
                                            <PersonalData profile={this.state.profile} onPersonalDataChanged={this.onPersonalDataChanged} saveProfile={this.saveProfile} />

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
        shouldDisplayProfile: state.profile.shouldDisplayProfile,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProfile: (userId) => dispatch(actions.readProfile(userId)),
        onProfileDisplayedSuccess: () => dispatch(actions.onProfileDisplayedSuccess()),
        saveProfile: (profile) => dispatch(actions.saveProfile(profile)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));