import { combineReducers, createStore } from 'redux';

const intialStateAccount = {
	balance: 0,
	laon: 0,
	loanPurpose: '',
};

const intialStateCustomer = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

function accountReducer(state = intialStateAccount, action) {
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

function customerReducer(state = intialStateCustomer, action) {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...state,
				fullName: action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt: action.payload.createdAt,
			};
		case 'customer/updateName':
			return {
				...state,
				fullName: action.payload.fullName,
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: 'account/deposit', payload: 500 });

// console.log(store.getState());

// store.dispatch({ type: 'account/withdraw', payload: 200 });
// store.dispatch({
// 	type: 'account/requestLoan',
// 	payload: {
// 		amount: 1000,
// 		purpose: 'bay a car',
// 	},
// });
// console.log(store.getState());

// action creator

function deposit(amount) {
	return {
		type: 'account/deposit',
		payload: amount,
	};
}

function withdraw(amount) {
	return {
		type: 'account/withdraw',
		payload: amount,
	};
}

function requestLoan(amount, purpose) {
	return {
		type: 'account/requestLoan',
		payload: {
			amount,
			purpose,
		},
	};
}

function payLoan() {
	return {
		type: 'account/payLoan',
	};
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, 'buy a car '));
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalId,
			createdAt: new Date().toDateString(),
		},
	};
}

function updateName(fullName) {
	return {
		type: 'account/updateName',
		payload: {
			fullName,
		},
	};
}

store.dispatch(createCustomer('Esraa Mohamed', '301120925026'));
console.log(store.getState());
