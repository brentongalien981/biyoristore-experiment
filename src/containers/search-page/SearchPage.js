import React from 'react';
import { withRouter } from 'react-router';
import Bs from '../../bs-library/helpers/Bs';



class SearchPage extends React.Component {

    state = {
        searchPhrase: ''
    };



    componentDidMount() {
        const urlParams = this.props.location.search;
        const acceptedParams = ['q'];
        const parsedCleanUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);
        this.setState({ searchPhrase: parsedCleanUrlParams['q'] });
        Bs.log('parsedCleanUrlParams ==> ...');
        Bs.log(parsedCleanUrlParams);
    }

    render() {
        return (
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Search Page</h3>
                            <h5>{this.state.searchPhrase}</h5>
                        </div>
                    </div>

                </div>
            </section>

        );
    }
}



/** REACT-FUNCS */



export default withRouter(SearchPage);