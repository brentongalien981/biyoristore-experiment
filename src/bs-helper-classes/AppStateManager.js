import React from 'react';
import { connect } from 'react-redux';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';
import * as actions from '../actions/appStateManager';
import BsJLS from '../bs-library/helpers/BsJLS';
import Bs from '../bs-library/helpers/Bs';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';



class AppStateManager extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */
    checkBmdAuthValidity() {

        if (!BsAppLocalStorage.isLoggedIn()) { return; }

        // TODO:DELETE
        const currentAuth = BsJLS.get('auth.currentAccount');
        Bs.log('currentAuth ==> ...');
        Bs.log(currentAuth);

        if (currentAuth
            && currentAuth.stayLoggedIn == 1) {
            const data = {
                ...currentAuth,
            };

            this.props.checkBmdAuthValidity(data);
        }

    }



    /** MAIN FUNCS */
    componentDidMount() {

        this.checkBmdAuthValidity();

        window.addEventListener("beforeunload", (e) => {

            // TODO: Update user's bmd-auth cache-record.
        });

        BsJLSOLM.init();
    }



    render() {
        return null;
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapDispatchToProps = (dispatch) => {
    return {
        checkBmdAuthValidity: (data) => dispatch(actions.checkBmdAuthValidity(data)),
        // queueAlert: (obj) => dispatch(queueAlert(obj)),
    };
};



export default connect(null, mapDispatchToProps)(AppStateManager);