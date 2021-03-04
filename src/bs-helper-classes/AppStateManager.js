import React from 'react';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';



class AppStateManager extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentWillUnmount() {
        // alert('TODO: In CLASS: AppStateManager, METHOD: componentWillUnmount(). Do something about the cart.');
    }



    componentDidMount() {
        BsJLSOLM.init();
    }



    render() {
        return null;
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */



export default AppStateManager;