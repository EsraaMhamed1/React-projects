import { useState } from 'react';

const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑',
];

function App() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	const handlePervious = () => {
		if (step > 1) setStep((s) => s - 1);
	};

	const handleNext = () => {
		if (step < 3) setStep((s) => s + 1);
	};
	return (
		<>
			<button
				className='close'
				onClick={() => {
					setIsOpen((is)=>!is);
				}}
			>
				&times;
			</button>
			{isOpen && (
				<div className='steps'>
					<div className='numbers'>
						<div className={step >= 1 ? 'active' : ''}>1</div>
						<div className={step >= 2 ? 'active' : ''}>2</div>
						<div className={step >= 3 ? 'active' : ''}>3</div>
					</div>
					<p className='message'>
						step {step} : {messages[step - 1]}
					</p>

					<div className='buttons'>
						<button
							onClick={handlePervious}
							style={{ backgroundColor: '#7950f2', color: '#fff' }}
						>
							Previous
						</button>
						<button
							onClick={handleNext}
							style={{ background: '#7950d2', color: '#fff' }}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
