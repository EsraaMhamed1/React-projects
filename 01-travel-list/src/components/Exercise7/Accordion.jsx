import React from 'react';
import AccordionItem from './AccordionItem';
const Accordion = ({ data }) => {
	return (
		<div
			style={{
				margin: 'auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				gap: '20px',
			}}
		>
			{data.map((el, i) => (
				<AccordionItem key={i} title={el.title} text={el.text} num={i} />
			))}
		</div>
	);
};

export default Accordion;
