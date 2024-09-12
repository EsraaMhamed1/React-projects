import { useContext } from 'react';
import LoanInputContext from './contexts/LoanFormContext';

const MyInput = () => {
	const inputContext = useContext(LoanInputContext);

	return (
		<>
			<label>{inputContext.lableTitle}</label>
			<input
				placeholder={inputContext.placeholder}
				value={inputContext.value}
				onChange={(e) => {
					inputContext.handelChange(e.target.value);
				}}
			/>
		</>
	);
};
export default MyInput;
