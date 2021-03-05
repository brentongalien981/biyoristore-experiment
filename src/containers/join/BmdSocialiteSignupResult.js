import React from 'react';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';

class BmdSocialiteSignupResult extends React.Component {

    componentDidMount() {

        // TODO: Check bmd-legit-signup-code.


        const urlParams = this.props.history.location.search;
        const acceptedParamKeys = [
            'accessToken',
            'refreshToken',
            'expiresIn',
            'authProviderId',
            'customError',
            'exception'
        ];

        const parsedParams = Bs.getParsedQueryParams(urlParams, acceptedParamKeys);

        Bs.log('parsedParams ==> ...');
        Bs.log(parsedParams);

        // BsAppStorage.set('accessToken', parsedParams['accessToken']);
        // BsAppStorage.set('authProviderId', parsedParams['authProviderId']);
    }



    render() {
        return (
            <div style={{ marginTop: '100px' }}>
                <h2>TODO:FILE: BmdSocialiteSignupResult.js</h2>
                <div style={{ marginTop: '500px' }}></div>
            </div>
        );
    }
}



export default withRouter(BmdSocialiteSignupResult);


