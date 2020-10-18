import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './theme-components/Header';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
// import Cart from './theme-components/Cart';
import Home from './containers/home/Home';
// import Listing from './containers/listing/Listing';
// import ProductInDetails from './containers/product/ProductInDetails';



const Listing = React.lazy(() => import('./containers/listing/Listing'));
const ProductInDetails = React.lazy(() => import('./containers/product/ProductInDetails'));
const Join = React.lazy(() => import('./containers/join/Join'));
const Profile = React.lazy(() => import('./containers/profile/Profile'));
const CartPage = React.lazy(() => import('./containers/cart/CartPage'));
const Checkout = React.lazy(() => import('./containers/checkout/Checkout'));
const Payment = React.lazy(() => import('./containers/checkout/Payment'));

const CartWidget = React.lazy(() => import('./components/cart/CartWidget'));



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
				<Route path="/cart" exact render={() => <Suspense fallback={<div>loading...</div>}><CartPage /></Suspense>} />
				<Route path="/checkout" exact render={() => <Suspense fallback={<div>loading...</div>}><Checkout /></Suspense>} />
				<Route path="/payment" exact render={() => <Suspense fallback={<div>loading...</div>}><Payment /></Suspense>} />
				{/* <Route path="/product" exact component={ProductInDetails} /> */}
			</Switch>

			<Switch>
				<Route path="/payment" exact component={null} />
				<Route path="/" component={Footer} />
			</Switch>

			<Search />
			<Suspense fallback={<div>loading...</div>}><CartWidget /></Suspense>
		</BrowserRouter>

	);
}

export default App;
