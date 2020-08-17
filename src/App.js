import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './theme-components/Header';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
import Cart from './theme-components/Cart';
import Home from './containers/home/Home';
import Listing from './containers/listing/Listing';
import HeaderDark from './theme-components/HeaderDark';
import Product from './containers/product/Product';

function App() {

	return (
		<BrowserRouter>
			<Header />

			<Route path="/" exact component={Home} />
			<Route path="/listing" exact component={Listing} />
			<Route path="/product" exact component={Product} />
			<Footer />

			<Search />
			<Cart />
		</BrowserRouter>

	);
}

export default App;
