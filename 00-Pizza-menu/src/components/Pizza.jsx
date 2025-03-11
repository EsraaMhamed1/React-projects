import React from 'react';

const Pizza = ({ pizzaObj }) => {
	console.log(pizzaObj);

	// if (pizzaObj.soldOut) return null;
	return (
		<li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
			<img src={pizzaObj.photoName} alt='' />
			<div>
				<h3> {pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>{pizzaObj.price} </span>
			</div>
		</li>
	);
};

export default Pizza;
