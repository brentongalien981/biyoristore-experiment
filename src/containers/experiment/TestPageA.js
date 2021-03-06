import React from 'react';
import { withRouter } from 'react-router-dom';

class TestPageA extends React.Component {

    componentDidMount() {

    }



    goTo = (page) => {
        const link = 'test-page-' + page;
        // this.props.history.push(link);
        this.props.history.replace(link);
    };



    render() {
        return (
            <div style={{ marginTop: '100px' }}>
                <h2>FILE: TestPageA.js</h2>
                <div style={{ marginTop: '300px' }}></div>
                <button onClick={() => this.goTo('a')}>go-to-A</button>
                <button onClick={() => this.goTo('b')}>go-to-B</button>
                <button onClick={() => this.goTo('c')}>go-to-C</button>
            </div>
        );
    }
}



export default withRouter(TestPageA);


