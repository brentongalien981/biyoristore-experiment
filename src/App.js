import React from 'react';
import Header from './theme-components/Header';
import Hero from './theme-components/Hero';
import Separator from './theme-components/Separator';
import Footer from './theme-components/Footer';
import Search from './theme-components/Search';
import Cart from './theme-components/Cart';

function App() {
	return (
		<>
			<Header />
			<Hero />
			<Separator />
			<Footer />

			<Search />
			<Cart />
		</>
	);
}

export default App;
