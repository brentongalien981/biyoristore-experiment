import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';



class TestLoaderContainer extends React.Component {

    /* PROPERTIES */



    /* HELPER FUNCS */



    /* MAIN FUNCS */
    render() {
        const style = {
            marginTop: "200px"
        };
        return (
            <div style={style}>
                <h1>FILE: TestLoaderContainer.js</h1>
                <WaitLoader msg="wait for something great..." size="sm" />
            </div>
            
        );
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */



export default TestLoaderContainer;