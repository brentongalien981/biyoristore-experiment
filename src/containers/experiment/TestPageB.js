import React from 'react';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import BsJLS from '../../bs-library/helpers/BsJLS';
import BsJLSOLM from '../../bs-library/helpers/BsJLSOLM';

class TestPageB extends React.Component {

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
                <h2>FILE: TestPageB.js</h2>
                <div style={{ marginTop: '50px' }}></div>
                <button onClick={() => this.goTo('a')}>go-to-A</button>
                <button onClick={() => this.goTo('b')}>go-to-B</button>
                <button onClick={() => this.goTo('c')}>go-to-C</button>

                <hr />
                <div style={{ marginTop: '50px' }}></div>

                <div>
                    <div>
                        <h2>Test BsJLS</h2>
                        <button>show BsJLS</button>
                    </div>
                </div>


                <hr />
                <div style={{ marginTop: '50px' }}></div>

                <div>
                    <div>
                        <h2>Test BsJLSOLM</h2>
                        <button onClick={this.showBsJLSOLMObjs}>show BsJLSOLM-objs</button>
                        <button onClick={this.showBsJLSOLMSearchQueryObjs}>show BsJLSOLM-searchQueryObjs</button>
                        <br />
                        <button onClick={this.loopThroughSearchQObjs}>loopThroughSearchQObjs</button>
                    </div>
                </div>

            </div>
        );
    }



    loopThroughSearchQObjs() {

        for (const k in BsJLSOLM.searchQueryObjs) {
            const v = BsJLSOLM.searchQueryObjs[k];
            Bs.log('k ==> ' + k);
            Bs.log('v ==> ...');
            Bs.log(v);
            Bs.log('BsJLS k ==> ' + k);
            Bs.log('BsJLS v ==> ...');
            Bs.log(BsJLS.get(k));
            Bs.log('------------------------------');
        }
    }



    showBsJLSOLMSearchQueryObjs() {
        Bs.log('BsJLSOLM-searchQueryObjs ==> ...');
        Bs.log(BsJLSOLM.searchQueryObjs);
    }



    showBsJLSOLMObjs() {
        Bs.log('BsJLSOLM-objs ==> ...');
        Bs.log(BsJLSOLM.objs);
    }
}



export default withRouter(TestPageB);


