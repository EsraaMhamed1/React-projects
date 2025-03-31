import { useState } from 'react';

import NavBar from './navigation/NavBar';
import Products from './products/Products';
import Recommended from './recomended/Recommended';
import Sidebar from './Sidebar/Sidebar';
import products from './db/data';
import Card from './components/Card';
import './index.css';

function App() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [query, setQuery] = useState('');

	//  input filter
	function handleInputChange(e) {
		setQuery(e.target.value);
	}

	const filteredItems = products.filter(
		(product) =>
			product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !==
			-1
	);

	// Radio filter
	function handleChange(e) {
		setSelectedCategory(e.target.value);
	}

	//  Buttons filter
	function handleClick(e) {
		setSelectedCategory(e.target.value);
	}

	function filteredData(products, selected, query) {
		let filteredProducts = products;

		// filter input items
		if (query) {
			filteredProducts = filteredItems;
		}

		// slected filter
		if (selected) {
			filteredProducts = filteredProducts.filter(
				({ category, color, company, newPrice, title }) =>
					category === selected ||
					color === selected ||
					company === selected ||
					newPrice === selected ||
					title === selected
			);
		}

		return filteredProducts.map(
			({ img, title, star, reviews, prevPrice, newPrice }) => (
				<Card
					key={Math.random()}
					img={img}
					star={star}
					title={title}
					reviews={reviews}
					prevPrice={prevPrice}
					newPrice={newPrice}
				/>
			)
		);
	}

	const result = filteredData(products, selectedCategory, query);
	return (
		<>
			<Sidebar handleChange={handleChange} />
			<NavBar query={query} handleInputChange={handleInputChange} />
			<Recommended handleClick={handleClick} />
			<Products result={result} />
		</>
	);
}

export default App;
