import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setSearchPhrase } from '../actions/search';
import Bs from '../bs-library/helpers/Bs';


class Search extends React.Component {

    state = {
        searchPhrase: '',
        isSearching: false
    };



    render(props) {
        return (
            <div className="modal fade search" id="search" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input type="text" className="form-control" placeholder="Type your search here"
                                aria-label="Type your search here"
                                aria-describedby="button-addon2"
                                value={this.searchPhrase}
                                onChange={this.onInputChange}
                                onKeyPress={this.onSearchPhraseEnter}
                            />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeSearchInputBtn">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    onInputChange = (e) => {
        this.setState({ searchPhrase: e.target.value });
    };



    onSearchPhraseEnter = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (this.state.searchPhrase === '') { return; }

            // this.props.setSearchPhrase({ searchPhrase: this.state.searchPhrase });

            this.props.history.push('/search?q=' + this.state.searchPhrase);

            document.querySelector('#closeSearchInputBtn').click();

        }

    };

}



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



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));