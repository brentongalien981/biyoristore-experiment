import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './theme-components/Header';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
import Cart from './theme-components/Cart';
import Home from './containers/home/Home';
import Listing from './containers/listing/Listing';

function App() {
	return (
		<BrowserRouter>
			<Header />

			<Route path="/" exact component={Home} />
			<Route path="/listing" exact component={Listing} />
			<Footer />

			<Search />
			<Cart />
		</BrowserRouter>

	);
}

export default App;
