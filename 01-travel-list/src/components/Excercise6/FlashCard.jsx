import React, { useState } from 'react';
import './style.css';
import questions from './data';

const FlashCard = () => {
	const [selectesId, setSelecteId] = useState(null);

	const handelClick = (id) => {
		setSelecteId(id !== selectesId ? id : null);
	};
	return (
		<div className='flash-card'>
			{questions.map((question) => (
				<div
					key={question.id}
					className={question.id === selectesId ? 'selected' : null}
					onClick={() => {
						handelClick(question.id);
					}}
				>
					<p>
						{question.id === selectesId ? question.answer : question.question}
					</p>
				</div>
			))}
		</div>
	);
};

export default FlashCard;
