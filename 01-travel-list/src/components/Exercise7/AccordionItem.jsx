import React from 'react';
import { useState } from 'react';
import './style.css';

const AccordionItem = ({ num, title, text }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handelToggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div
			className={`item ${isOpen ? 'open' : ''}`}
			style={{
				background: 'whitesmoke',
				borderRadius: '5px',
				padding: '25px ',
				width: '700px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: '24px',
					fontWeight: 'bold',
					cursor: 'pointer',
				}}
				onClick={handelToggle}
			>
				<div
					className={isOpen ? 'title' : ''}
					style={{
						display: 'flex',
						gap: '40px',
					}}
				>
					<p>{num < 9 ? `0${num + 1}` : `num+1`}</p>
					<p>{title}</p>
				</div>
				<p style={{ fontSize: '28px' }}>{isOpen ? '-' : '+'}</p>
			</div>
			{isOpen && (
				<div style={{ padding: '20px', marginTop: '20px' }}>{text}</div>
			)}
		</div>
	);
};

export default AccordionItem;
