import React, { useState } from 'react';

export default function Challenge() {
	return (
		<div>
			<Counter />
		</div>
	);
}

function Counter() {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);

	const date = new Date('june 21 2025');
	date.setDate(date.getDate() + count);

	function handelAddStep() {
		setStep((s) => s + 1);
	}

	function handelDecStep() {
		setStep((s) => s - 1);
	}

	function handelIncCount() {
		setCount((c) => c + 1);
	}

	function handelDecCount() {
		setCount((c) => c - 1);
	}
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
				<button onClick={handelDecStep}>-</button>
				<p>Step: {step} </p>
				<button onClick={handelAddStep}> +</button>
			</div>

			<div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
				<button onClick={handelDecCount}>-</button>
				<p>Count: {count} </p>
				<button onClick={handelIncCount}> +</button>
			</div>

			<p>
				<span>
					{count === 0
						? 'Today is '
						: count > 0
						? `${count} days from today is `
						: `${Math.abs(count)} days ago was `}
				</span>
				<span>{date.toDateString()}</span>
			</p>
		</div>
	);
}
