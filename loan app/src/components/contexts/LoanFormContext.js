import { createContext } from 'react';

let LoanInputContext = createContext({
	lableTitle: '',
	handelChange: null,
	inputValue: null,
});

export default LoanInputContext;
