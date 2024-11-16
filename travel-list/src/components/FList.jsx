import React from 'react';
import { useState } from 'react';

const FList = () => {
	const [descrption, setDescription] = useState('');
	const [quantity, setQuantity] = useState(5);

	const handelSubmit = (e) => {
		e.preventDefault();
		if (!descrption) return;
		const newItem = { descrption, quantity, packked: false, id: Date.now() };
		console.log(newItem);
		setDescription('');
		setQuantity(1);
	};

	return (
		<form className='add-form' onSubmit={handelSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => {
					setQuantity(e.target.value);
				}}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				value={descrption}
				onChange={(e) => {
					setDescription(e.target.value);
				}}
			/>
			<button>Add</button>
		</form>
	);
};

export default FList;
