import React, { useState } from 'react';
import './challenge.css';

const Challeng = () => {
	const [step, setStep] = useState(5);
	const [count, setCount] = useState(1);

	const handelResetclick = () => {
		setStep(1);
		setCount(0);
	};
	const date = new Date('16 nov 2024');
	date.setDate(date.getDate() + count);
	return (
		<div className='main'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '5px',
				}}
			>
				<input
					type='range'
					min={'0'}
					max={'10'}
					value={step}
					onChange={(e) => setStep(e.target.value)}
				/>
				<span>step : {step}</span>
			</div>
			<div>
				<button
					onClick={() => {
						setCount(count - 1);
					}}
				>
					-
				</button>
				<input
					type='text'
					placeholder='0'
					value={count}
					onChange={(e) => setCount(e.target.value)}
				/>

				<button
					onClick={() => {
						setCount(count + 1);
					}}
				>
					+
				</button>
				<div style={{ textAlign: 'center' }}>
					<p>
						{count === 0
							? 'Today is '
							: count > 0
							? `${count} days from Today is `
							: `${Math.abs(count)} days ago`}
						{date.toDateString()}
					</p>
				</div>
			</div>
			{count !== 0 || step !== 1 ? (
				<button style={{ marginTop: '10px' }} onClick={handelResetclick}>
					Reset
				</button>
			) : null}
		</div>
	);
};

export default Challeng;
