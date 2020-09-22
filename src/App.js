import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './theme-components/Header';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
import Cart from './theme-components/Cart';
import Home from './containers/home/Home';
// import Listing from './containers/listing/Listing';
// import ProductInDetails from './containers/product/ProductInDetails';



const Listing = React.lazy(() => import('./containers/listing/Listing'));
const ProductInDetails = React.lazy(() => import('./containers/product/ProductInDetails'));
const Join = React.lazy(() => import('./containers/join/Join'));
const Profile = React.lazy(() => import('./containers/profile/Profile'));



function App() {

	return (
		<BrowserRouter>
			<Header />

			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/products" exact render={() => <Suspense fallback={<div>loading...</div>}><Listing /></Suspense>} />
				<Route path="/product" exact render={() => <Suspense fallback={<div>loading...</div>}><ProductInDetails /></Suspense>} />
				<Route path="/join" exact render={() => <Suspense fallback={<div>loading...</div>}><Join /></Suspense>} />
				<Route path="/profile" exact render={() => <Suspense fallback={<div>loading...</div>}><Profile /></Suspense>} />
				{/* <Route path="/product" exact component={ProductInDetails} /> */}
			</Switch>
			<Footer />

			<Search />
			<Cart />
		</BrowserRouter>

	);
}

export default App;
