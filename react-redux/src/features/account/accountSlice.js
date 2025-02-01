import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	balance: 0,
	laon: 0,
	loanPurpose: '',
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
		},
		withdraw(state, action) {
			state.balance -= action.payload;
		},
		requestLoan: {
			prepare(amount, purpose) {
				return { payload: { amount, purpose } };
			},
			reducer(state, action) {
				if (state.loan > 0) return;

				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
				state.balance = state.balance + action.payload.amount;
			},
		},
		payLoan(state, action) {
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = '';
		},
	},
});

console.log(accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
/*
export default function accountReducer(state = intialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return {
				...state,
				balance: state.balance + action.payload,
			};

		case 'account/withdraw':
			return {
				...state,
				balance: state.balance - action.payload,
			};

		case 'account/requestLoan':
			if (state.loan > 0) return state;

			//LATER
			return {
				...state,
				laon: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};

		case 'payLoan':
			return {
				...state,
				laon: 0,
				loanPurpose: '',
				balance: state.balance - state.loan,
			};

		default:
			return state;
	}
}

// action creator

export function deposit(amount) {
	return {
		type: 'account/deposit',
		payload: amount,
	};
}

export function withdraw(amount) {
	return {
		type: 'account/withdraw',
		payload: amount,
	};
}

export function requestLoan(amount, purpose) {
	return {
		type: 'account/requestLoan',
		payload: {
			amount,
			purpose,
		},
	};
}

export function payLoan() {
	return {
		type: 'account/payLoan',
	};
}
*/
