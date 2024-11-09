import React from 'react';

const Order = ({ closeHour, openHour }) => {
	return (
		<div className='order'>
			<p>
				we're open from {openHour}:00 to {closeHour}. come visit us or order
				online.
			</p>
			<button className='btn'>Order</button>
		</div>
	);
};

export default Order;
