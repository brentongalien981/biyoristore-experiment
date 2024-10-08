import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './theme-components/Header';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
// import Cart from './theme-components/Cart';
// import Home from './containers/home/Home';
import TestLoaderContainer from './containers/experiment/TestLoaderContainer';
import TemporaryAlertSystem from './components/temporary-alert-system/TemporaryAlertSystem';
import AppStateManager from './bs-helper-classes/AppStateManager';
import TestPageA from './containers/experiment/TestPageA';
import TestPageB from './containers/experiment/TestPageB';
import TestPageC from './containers/experiment/TestPageC';
import PageNotFound from './containers/errors/PageNotFound';
// import Listing from './containers/listing/Listing';
// import ProductInDetails from './containers/product/ProductInDetails';



const Home = React.lazy(() => import('./containers/home/Home'));
const Listing = React.lazy(() => import('./containers/listing/Listing'));
const ProductInDetails = React.lazy(() => import('./containers/product/ProductInDetails'));
const Join = React.lazy(() => import('./containers/join/Join'));
const ForgotPassword = React.lazy(() => import('./containers/join/ForgotPassword'));
const PasswordReset = React.lazy(() => import('./containers/join/PasswordReset'));

const BmdSocialiteSignupResult = React.lazy(() => import('./containers/join/BmdSocialiteSignupResult'));
const BmdSocialiteLoginResult = React.lazy(() => import('./containers/join/BmdSocialiteLoginResult'));
const Profile = React.lazy(() => import('./containers/profile/Profile'));
const CartPage = React.lazy(() => import('./containers/cart/CartPage'));
const Checkout = React.lazy(() => import('./containers/checkout/Checkout'));
const CheckoutFinalization = React.lazy(() => import('./containers/checkout-finalization/CheckoutFinalization'));

const Payment = React.lazy(() => import('./containers/payment/Payment'));
const PaymentFinalization = React.lazy(() => import('./containers/payment/PaymentFinalization'));
const PredefinedPaymentFinalization = React.lazy(() => import('./containers/payment/PredefinedPaymentFinalization'));
const Order = React.lazy(() => import('./containers/order-detail/Order'));

const PrivacyPolicy = React.lazy(() => import('./containers/legals/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./containers/legals/TermsAndConditions'));
const RefundPolicy = React.lazy(() => import('./containers/legals/RefundPolicy'));

const SearchPage = React.lazy(() => import('./containers/search-page/SearchPage'));

const CreateOrderReturn = React.lazy(() => import('./containers/order-return/CreateOrderReturn'));


// BMD-ON-STAGING: Delete this
const TestPageWithHistoryNavigationBlocker = React.lazy(() => import('./containers/experiment/TestPageWithHistoryNavigationBlocker'));


const CartWidget = React.lazy(() => import('./components/cart/CartWidget'));



function App() {

	return (
		<BrowserRouter>
			<AppStateManager />
			<Header />
			<TemporaryAlertSystem />

			<Switch>
				{/* BMD-ON-ITER: Stage: Change the url it requests from to the production url (not biyoristoreexperiment.test) */}
				{/* <Route path="/" exact component={Home} /> */}
				<Route path="/" exact render={() => <Suspense fallback={<div>loading...</div>}><Home /></Suspense>} />
				<Route path="/products" exact render={() => <Suspense fallback={<div>loading...</div>}><Listing /></Suspense>} />
				<Route path="/product" exact render={() => <Suspense fallback={<div>loading...</div>}><ProductInDetails /></Suspense>} />
				
				<Route path="/join" exact render={() => <Suspense fallback={<div>loading...</div>}><Join /></Suspense>} />
				<Route path="/forgot-password" exact render={() => <Suspense fallback={<div>loading...</div>}><ForgotPassword /></Suspense>} />
				<Route path="/password-reset" exact render={() => <Suspense fallback={<div>loading...</div>}><PasswordReset /></Suspense>} />
				<Route path="/bmd-socialite-signup-result" exact render={() => <Suspense fallback={<div>loading...</div>}><BmdSocialiteSignupResult /></Suspense>} />
				<Route path="/bmd-socialite-login-result" exact render={() => <Suspense fallback={<div>loading...</div>}><BmdSocialiteLoginResult /></Suspense>} />
				
				<Route path="/profile" exact render={() => <Suspense fallback={<div>loading...</div>}><Profile /></Suspense>} />
				<Route path="/cart" exact render={() => <Suspense fallback={<div>loading...</div>}><CartPage /></Suspense>} />
				<Route path="/checkout" exact render={() => <Suspense fallback={<div>loading...</div>}><Checkout /></Suspense>} />
				<Route path="/checkout-finalization" exact render={() => <Suspense fallback={<div>loading...</div>}><CheckoutFinalization /></Suspense>} />

				<Route path="/payment" exact render={() => <Suspense fallback={<div>loading...</div>}><Payment /></Suspense>} />
				<Route path="/payment-finalization" exact render={() => <Suspense fallback={<div>loading...</div>}><PaymentFinalization /></Suspense>} />
				<Route path="/predefined-payment-finalization" exact render={() => <Suspense fallback={<div>loading...</div>}><PredefinedPaymentFinalization /></Suspense>} />
				<Route path="/navigation-blocker" exact render={() => <Suspense fallback={<div>loading...</div>}><TestPageWithHistoryNavigationBlocker /></Suspense>} />
				<Route path="/order" exact render={() => <Suspense fallback={<div>loading...</div>}><Order /></Suspense>} />
				<Route path="/test-loader" exact component={TestLoaderContainer} />
				{/* <Route path="/product" exact component={ProductInDetails} /> */}
				
				<Route path="/privacy-policy" exact render={() => <Suspense fallback={<div>loading...</div>}><PrivacyPolicy /></Suspense>} />
				<Route path="/terms-and-conditions" exact render={() => <Suspense fallback={<div>loading...</div>}><TermsAndConditions /></Suspense>} />
				<Route path="/refund-policy" exact render={() => <Suspense fallback={<div>loading...</div>}><RefundPolicy /></Suspense>} />

				<Route path="/search" exact render={() => <Suspense fallback={<div>loading...</div>}><SearchPage /></Suspense>} />				

				<Route path="/create-order-return" exact render={() => <Suspense fallback={<div>loading...</div>}><CreateOrderReturn /></Suspense>} />
				

				{/* BMD-FOR-DEBUG */}
				{/* BMD-ON-STAGING: COMMENT-OUT */}
				<Route path="/test-page-a" component={TestPageA} />
				<Route path="/test-page-b" component={TestPageB} />
				<Route path="/test-page-c" component={TestPageC} />


				<Route path="/" render={() => <PageNotFound />} />
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
