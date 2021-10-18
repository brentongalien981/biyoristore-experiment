import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { prepareToRefreshProducts, searchProducts, setSearchPhrase } from '../../actions/search';
import Bs from '../../bs-library/helpers/Bs';
import WaitLoader from '../../components/loader/WaitLoader';
import Pagination from '../listing/Pagination';
import Product from '../listing/Product';
import { transitionScrollToTop } from '../product/helper-funcs/HelperFuncsA';



class SearchPage extends React.Component {

    state = {
        isSearchingProducts: false,
        pageNum: 1,
        shouldRefreshProducts: false
    };



    componentDidUpdate() {
        this.syncSearchPhraseFromUrlAndRedux();

        if (this.state.shouldRefreshProducts) {
            this.searchProducts(this.props.searchPhrase, this.state.pageNum);
        }
    }



    componentDidMount() {
        this.syncSearchPhraseFromUrlAndRedux();
    }



    render() {

        const headerLabel = 'Search Results for "' + this.props.searchPhrase + '"';

        return (
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>{headerLabel}</h3>
                        </div>
                    </div>


                    <div className="row gutter-4">
                        <div className="col-lg-12">
                            <div className="row gutter-2 gutter-lg-3">{this.getProducts()}</div>
                            <Pagination {...this.props.paginationData} onPageNumClick={this.onPageNumClick} />
                        </div>

                    </div>

                </div>
            </section>

        );
    }



    getProducts() {
        let products = this.props.searchedProducts?.map((p, i) => {
            return (
                <div className="col-6 col-md-4" key={i}>
                    <Product
                        product={p}
                        onProductClicked={this.onProductClicked}
                    />
                </div>
            );
        });


        if (this.state.isSearchingProducts) {
            products = (<WaitLoader size='lg' msg='' />);
        }

        return products;
    }



    syncSearchPhraseFromUrlAndRedux = () => {
        const urlParams = this.props.location.search;
        const acceptedParams = ['q'];
        const parsedCleanUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);
        const urlSearchPhrase = decodeURIComponent(parsedCleanUrlParams['q']);

        if (urlSearchPhrase !== this.props.searchPhrase) {
            this.props.setSearchPhrase({ searchPhrase: urlSearchPhrase });
            this.searchProducts(urlSearchPhrase);
        }
    };



    onProductClicked = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.history.push('/product?productId=' + productId);
    };



    onPageNumClick = (e, pageNum) => {
        e.preventDefault();
        e.stopPropagation();

        const currentPageNum = this.state.pageNum;

        if (currentPageNum !== pageNum) {
            this.setState({ 
                pageNum: pageNum,
                shouldRefreshProducts: true
            });

            transitionScrollToTop();
        }
    };



    searchProducts = (searchPhrase, pageNum) => {

        if (this.state.isSearchingProducts) { return false; }
        if (searchPhrase === '') { return; }

        this.setState({ isSearchingProducts: true });

        const data = {
            params: {
                searchPhrase: searchPhrase,
                pageNum: pageNum
            },
            doCallBackFunc: () => {
                setTimeout(() => {
                    this.setState({ 
                        isSearchingProducts: false,
                        shouldRefreshProducts: false
                    });
                }, 200);
            }
        };

        this.props.searchProducts(data);

    };
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        searchPhrase: state.search.searchPhrase,
        searchedProducts: state.search.searchedProducts,
        paginationData: state.search.paginationData
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setSearchPhrase: (data) => dispatch(setSearchPhrase(data)),
        searchProducts: (data) => dispatch(searchProducts(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));