import './styles.css';
import faqs from './data';
import { Item } from './Item';
import { useState } from 'react';

const data = faqs;
export default function Accordion() {
	const [curOpen, setCurOpen] = useState(null);
	return (
		<div className='App'>
			<ul>
				{data.map((el, i) => (
					<Item
						key={i}
						question={el}
						num={i + 1}
						curOpen={curOpen}
						onOpen={setCurOpen}
					/>
				))}
			</ul>
		</div>
	);
}
