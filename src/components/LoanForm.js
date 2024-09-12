import '../App.css';
import { useState } from 'react';
import Modal from './Modal';
import MyComponent from './MyComponent';
import LoanInputContext from './contexts/LoanFormContext';

const LoanForm = () => {
	const [showModal, setShowModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [formInputs, setFormInputs] = useState({
		name: '',
		phoneNumber: '',
		age: '',
		isEmployee: false,
		salary: '',
	});

	const handleFormSubmit = (event) => {
		event.preventDefault();
		setErrorMessage();
		if (formInputs.age < 18 || formInputs.age > 70) {
			setErrorMessage('The age is not allawed');
		} else if (
			formInputs.phoneNumber.length > 11 ||
			formInputs.phoneNumber.length < 11
		) {
			setErrorMessage('The phone number invalid');
		}
		setShowModal(true);
	};

	const buttonIsDisabled =
		formInputs.name === '' ||
		formInputs.age === '' ||
		formInputs.phoneNumber === '';

	const handleDivClick = () => {
		if (showModal) {
			setShowModal(false);
		}
	};
	const handlePhoneNumberInputChange = (value) => {
		setFormInputs({ ...formInputs, phoneNumber: value });
	};

	const handleNameInputChange = (value) => {
		setFormInputs({ ...formInputs, name: value });
	};

	const handleِAgeInputChange = (value) => {
		setFormInputs({ ...formInputs, age: value });
	};
	return (
		<div
			onClick={handleDivClick}
			style={{
				width: '100%',
				height: '100vh',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<div className='laon-form'>
				<h2>Requesting a Loan</h2>
				<hr />
				<form>
					<LoanInputContext.Provider
						value={{
							value: formInputs.name,
							handelChange: handleNameInputChange,
							lableTitle: 'Name :',
							placeholder: 'Enter yor name',
						}}>
						<MyComponent />
					</LoanInputContext.Provider>

					<LoanInputContext.Provider
						value={{
							value: formInputs.phoneNumber,
							handelChange: handlePhoneNumberInputChange,
							lableTitle: 'Phone nuber :',
							placeholder: 'Enter yorphone number',
						}}>
						<MyComponent />
					</LoanInputContext.Provider>
					<LoanInputContext.Provider
						value={{
							value: formInputs.age,
							handelChange: handleِAgeInputChange,
							lableTitle: 'Age',
							placeholder: 'Enter yor age',
						}}>
						<MyComponent />
					</LoanInputContext.Provider>

					<label>Are you an employee ?</label>
					<input
						className='check'
						type='checkBox'
						checked={formInputs.isEmployee}
						onChange={() => {
							setFormInputs({
								...formInputs,
								isEmployee: !formInputs.isEmployee,
							});
						}}
					/>
					<label>Salary </label>
					<select
						value={formInputs.salary}
						onChange={(event) => {
							setFormInputs({ ...formInputs, salary: event.target.value });
						}}>
						<option>500$</option>
						<option>1000$</option>
						<option>1500$</option>
					</select>

					<button
						id='btn'
						className={buttonIsDisabled ? 'disabled' : ''}
						disabled={buttonIsDisabled}
						onClick={handleFormSubmit}>
						Submit
					</button>
				</form>
			</div>
			<Modal isVisible={showModal} errorMessage={errorMessage} />
		</div>
	);
};
export default LoanForm;
