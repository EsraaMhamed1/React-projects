import React, { useState } from 'react';
// import FlashCard from './components/Excercise6/FlashCard';

// const initialItems = [
// 	{ id: 1, description: 'Passports', quantity: 2, packed: false },
// 	{ id: 2, description: 'socks', quantity: 12, packed: false },
// 	{ id: 5, description: 'chareger', quantity: 12, packed: true },
// ];

export default function App() {
	const [items, setItems] = useState([]);

	function handelAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handelDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handelToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function handelClearList() {
		const confirmed = window.confirm('are you sure?');
		if (confirmed) setItems([]);
	}
	return (
		<div className='app'>
			<Logo />
			<Form onAddItem={handelAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handelDeleteItem}
				onToggleItem={handelToggleItem}
				onClearList={handelClearList}
			/>
			<Stats items={items} />
			{/* <FlashCard/> */}
		</div>
	);
}

function Logo() {
	return <h1>🌴far a way 💼</h1>;
}
function Form({ onAddItem }) {
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState(1);

	function handelSubmit(e) {
		e.preventDefault();

		if (description === '' || null) return;

		const newItem = { description, quantity, packed: false, id: Date.now() };
		onAddItem(newItem);

		setDescription('');
		setQuantity(1);
	}

	return (
		<form className='add-form'>
			<h3>What you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button onClick={handelSubmit}>add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
	const [sortBy, setSortBuy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description')
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));

	if (sortBy === 'packed')
		sortedItems = items.slice().sort((a, b) => Number(a.packed) - b.packed);
	return (
		<div className='list'>
			<ul>
				{sortedItems.map((item) => (
					<Item
						key={item.id}
						item={item}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
			<div className='actions'>
				<select value={sortBy} onChange={(e) => setSortBuy(e.target.value)}>
					<option value={'input'}>sort by input order</option>
					<option value={'description'}>sort by description</option>
					<option value={'packed'}>sort by packing status</option>
				</select>
				<button onClick={onClearList}>clear list</button>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li key={item.id}>
			<input
				type='checkbox'
				value={item.packed}
				onChange={() => {
					onToggleItem(item.id);
				}}
			/>
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }) {
	if (!items.length)
		return (
			<p className='stats'>Start adding some items to your packing list 😊 </p>
		);
	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const precentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className='stats'>
			<sm>
				{precentage === 100
					? 'You got everything! Ready 😮'
					: `👜You have ${numItems} items on your list, and you already packed 
			${numPacked} (${precentage}%)`}
			</sm>
		</footer>
	);
}
