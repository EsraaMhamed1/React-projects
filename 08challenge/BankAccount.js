import { useReducer } from 'react';

const intialState = {
	balance: 0,
	loan: 0,
	isActive: false,
};

function reducer(state, action) {
	switch (action.type) {
		case 'openAccount':
			return {
				...state,
				balance: 500,
				isActive: true,
			};

		case 'deposit':
			return {
				...state,
				balance: state.balance + action.payload,
			};
		case 'withdrow':
			return {
				...state,
				balance: state.balance - action.payload,
			};
		case 'requestLoan':
			return {
				...state,
				laon: state.loan + action.payload,
			};
		case 'payLoan':
			return {
				...state,
				loan: state.loan - action.payload,
			};
		case 'close':
			return {
				...state,
				isActive: false,
			};
		default:
			throw new Error('No No 👊');
	}
}

function BankAccount() {
	const [{ balance, loan, isActive }, dispatch] = useReducer(
		reducer,
		intialState
	);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h1>useReducer Bank Account</h1>
			<h3>Balance:{balance}</h3> <h3>Loan:{loan}</h3>
			<p>
				<button
					onClick={() => dispatch({ type: 'openAccount' })}
					disabled={isActive}
				>
					Open account
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: 'deposit', payload: 150 })}
					disabled={!isActive}
				>
					Deposit 150
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: 'withdrow', payload: 50 })}
					disabled={!isActive}
				>
					Withdrow 50
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: 'requestLoan', payload: 5000 })}
					disabled={!isActive}
				>
					Request a loan of 5000
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: 'payLoan', payload: 10000 })}
					disabled={!isActive}
				>
					Pay loan
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: 'close' })}
					disabled={!isActive}
				>
					Close account
				</button>
			</p>
		</div>
	);
}

export default BankAccount;
