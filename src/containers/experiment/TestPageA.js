import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import BsAppLocalStorage from '../../bs-library/helpers/BsAppLocalStorage';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import * as actions from '../../actions/bmdtest';

class TestPageA extends React.Component {

    state = {
        endSessionMsg: '',
        theMsg: '',
    };

    componentDidMount() {
        window.addEventListener("beforeunload", (e) => {
            BsAppLocalStorage.set('tpp', this.state.endSessionMsg);
            // e.preventDefault();
            // return e.returnValue = 'Are you sure you want to close?';
        });
    }



    componentWillUnmount() {

    }



    onInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };



    goTo = (page) => {
        const link = 'test-page-' + page;
        // this.props.history.push(link);
        this.props.history.replace(link);
    };


    getHttpInfo = () => {
        BsCore2.ajaxCrud({
            url: '/mytest/get-http-info',
        });
    };



    redirect = () => {
        const url = 'http://biyoristoreexperiment.test:8000/mytest/get-http-info';
        window.location.replace(url);
    };



    saveTheMsg = async () => {
        const response = await this.generateRandomResultId();
        Bs.log('response ==> ...');
        Bs.log(response);
    };



    generateRandomResultId() {
        return new Promise(resolve => setTimeout(() => {
            this.setState({
                theMsg: Bs.getRandomId(32),
            });
            resolve('done bitch');
        }, 2000));
    }



    testDb = () => {
        BsCore2.ajaxCrud({
            url: '/mytest/forMBMDBE',
        });
    };




    render() {
        return (
            <div style={{ marginTop: '100px' }}>
                <h2>FILE: TestPageA.js</h2>
                <div style={{ marginTop: '300px' }}></div>
                <button onClick={this.testDb}>test-db</button>
                <button onClick={() => this.goTo('a')}>go-to-A</button>
                <button onClick={() => this.goTo('b')}>go-to-B</button>
                <button onClick={() => this.goTo('c')}>go-to-C</button>

                <br />
                <button onClick={this.redirect}>redirect</button>
                <button onClick={this.getHttpInfo}>get-http-info</button>

                <div>
                    <label>end-session-msg</label>
                    <input name="endSessionMsg" onChange={this.onInputChange} value={this.state.endSessionMsg} />
                </div>

                <div>
                    <label>{'msg ==> ' + this.state.theMsg}</label><br />
                    <button onClick={this.saveTheMsg}>save the-msg</button>
                </div>

                <br /><br />
                <div>
                    <label>{'count ==> ' + this.props.count}</label><br />
                    <button onClick={this.props.incrementCount}>increment</button>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        count: state.bmdtest.count
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        incrementCount: () => dispatch(actions.incrementCount())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TestPageA));


