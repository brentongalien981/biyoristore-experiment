import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './theme-components/Header';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
import Cart from './theme-components/Cart';
import Home from './containers/home/Home';
// import Listing from './containers/listing/Listing';
import Product from './containers/product/Product';



const Listing = React.lazy(() => import('./containers/listing/Listing'));



function App() {

	return (
		<BrowserRouter>
			<Header />

			<Route path="/" exact component={Home} />
			{/* <Route path="/products" exact component={Listing} /> */}
			<Route path="/products" exact render={() => <Suspense fallback={<div>loading...</div>}><Listing /></Suspense>} />
			<Route path="/product" exact component={Product} />
			<Footer />

			<Search />
			<Cart />
		</BrowserRouter>

	);
}

export default App;
