import React from 'react';
import Order from './Order';

const Footer = () => {
	const hour = new Date().getHours();
	const openHour = 9;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;

	console.log(isOpen);
	return (
		<footer className='footer'>
			{isOpen ? (
				<Order closeHour={closeHour} openHour={openHour} />
			) : (
				<p>
					We're haapy to welcome you between {openHour}:00 and {closeHour}:00.
				</p>
			)}
			{/* {new Date().toLocaleTimeString()}. We're currently open! */}
		</footer>
	);
};

export default Footer;
