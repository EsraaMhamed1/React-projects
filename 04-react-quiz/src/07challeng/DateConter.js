import { useReducer } from 'react';

const intialState = {
	count: 0,
	step: 1,
};

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return {
				...state,
				count: state.count + 1,
			};

		case 'decrement':
			return {
				...state,
				count: state.count - 1,
			};

		case 'setCount':
			return {
				...state,
				count: action.payload,
			};

		case 'step':
			return {
				...state,
				step: action.payload,
			};
		case 'reset':
			return intialState;
		default:
			throw new Error('😟');
	}
}

function DateConter() {
	// const [count, setCount] = useState(0);
	// const [step, setStep] = useState(1);

	const [state, dispatch] = useReducer(reducer, intialState);
	const date = new Date('27 jun 2025');
	date.setDate(date.getDate() + state.count);

	function inc() {
		// setCount((c) => c + 1);
		dispatch({ type: 'increment' });
	}

	function dec() {
		// setCount((c) => c - 1);
		dispatch({ type: 'decrement' });
	}

	function defineCount(e) {
		dispatch({ type: 'setCount', payload: e.target.value });
	}

	function defineStep(e) {
		dispatch({ type: 'step', payload: e.target.value });
	}
	function handelReset() {
		// setCount(0);
		// setStep(1);
		dispatch({ type: 'reset' });
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '20px',
				justifyContent: 'center',
				height: '500px',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				<input type='range' max={10} value={state.step} onChange={defineStep} />
				<p>{state.step}</p>
			</div>
			<div>
				<button onClick={dec}>-</button>
				<input value={state.count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>
			<p>{date.toDateString()}</p>
			<div>
				<button onClick={handelReset}>Reset</button>
			</div>
		</div>
	);
}

export default DateConter;
