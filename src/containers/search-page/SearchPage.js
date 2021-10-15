import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setSearchPhrase } from '../../actions/search';
import Bs from '../../bs-library/helpers/Bs';



class SearchPage extends React.Component {

    state = {
        searchPhrase: ''
    };



    componentDidUpdate() {
        this.syncSearchPhraseFromUrlAndRedux();
    }



    componentDidMount() {
        this.syncSearchPhraseFromUrlAndRedux();
    }



    render() {
        return (
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Search Page</h3>
                            <h5>{this.props.searchPhrase}</h5>
                        </div>
                    </div>

                </div>
            </section>

        );
    }



    syncSearchPhraseFromUrlAndRedux = () => {
        const urlParams = this.props.location.search;
        const acceptedParams = ['q'];
        const parsedCleanUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);
        const urlSearchPhrase = decodeURIComponent(parsedCleanUrlParams['q']);

        if (urlSearchPhrase !== this.props.searchPhrase) {
            this.props.setSearchPhrase({ searchPhrase: urlSearchPhrase });
        }
    };
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        searchPhrase: state.search.searchPhrase
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setSearchPhrase: (data) => dispatch(setSearchPhrase(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));