import React from 'react';
import { withRouter } from 'react-router-dom';

class BmdSocialiteSignupResult extends React.Component {

    componentDidMount() {

        // TODO: Check bmd-legit-signup-code.


        // Bs.log('this.props.history ==> ...');
        // Bs.log(this.props.history);

        // const urlParams = this.props.history.location.search;
        // const acceptedParamKeys = [
        //     'accessToken',
        //     'refreshToken',
        //     'expiresIn',
        //     'authProviderId',
        // ];

        // const parsedParams = Bs.getParsedQueryParams(urlParams, acceptedParamKeys);

        // Bs.log('parsedParams ==> ...');
        // Bs.log(parsedParams);

        // BsAppStorage.set('accessToken', parsedParams['accessToken']);
        // BsAppStorage.set('authProviderId', parsedParams['authProviderId']);
    }



    render() {
        return (
            <div>
                <h2>TODO:FILE: BmdSocialiteSignupResult.js</h2>
            </div>
        );
    }
}



export default withRouter(BmdSocialiteSignupResult);


