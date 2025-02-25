import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		createCustmoer: {
			prepare(fullName, nationalId) {
				return {
					payload: {
						fullName,
						nationalId,
						createdAt: new Date().toDateString(),
					},
				};
			},
			reducer(state, action) {
				state.fullName = action.payload.fullName;
				state.nationalId = action.payload.nationalId;
				state.createdAt = action.payload.createdAt;
			},
		},
		updateName(state, action) {
			state.fullName = action.payload;
		},
	},
});

console.log(customerSlice);

export const { createCustmoer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

/*
export default function customerReducer(state = intialStateCustomer, action) {
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

export function createCustomer(fullName, nationalId) {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalId,
			createdAt: new Date().toDateString(),
		},
	};
}

export function updateName(fullName) {
	return {
		type: 'customer/updateName',
		payload: {
			fullName,
		},
	};
}
*/
