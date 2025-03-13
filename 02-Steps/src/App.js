import './index.css';
import messages from './data';
import { useState } from 'react';
export default function App() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);
	// const step = 2;

	function handelPrevClick() {
		if (step > 1) setStep((s) => s - 1);
	}

	function handelNextClick() {
		if (step < 3) setStep((s) => s + 1);
	}

	function onClose() {
		setIsOpen((is) => !is);
	}

	return (
		<div className='app'>
			<button className='close' onClick={onClose}>
				&times;
			</button>
			{isOpen && (
				<div className='steps'>
					<div className='numbers'>
						<div className={step >= 1 ? 'active' : ''}>1</div>
						<div className={step >= 2 ? 'active' : ''}>2</div>
						<div className={step === 3 ? 'active' : ''}>3</div>
					</div>

					<p className='message'>
						Step {step} : {messages[step - 1]}
					</p>

					<div className='buttons'>
						<button
							style={{ background: '#7950f2', color: '#FFF' }}
							onClick={handelPrevClick}
						>
							Previous
						</button>
						<button
							style={{ background: '#7950f2', color: '#FFF' }}
							onClick={handelNextClick}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

// import { useState } from 'react';

// import messages from './data';

// function App() {
// 	const [step, setStep] = useState(1);
// 	const [isOpen, setIsOpen] = useState(false);

// 	const handelNext = () => {
// 		if (step < 3) setStep((s) => s + 1);
// 	};

// 	const handelPrevious = () => {
// 		if (step > 1) setStep((s) => s - 1);
// 	};

// 	const handelCloseBtn = () => {
// 		setIsOpen((is) => !is);
// 	};
// 	return (
// 		<>
// 			<button onClick={handelCloseBtn} className='close'>
// 				x
// 			</button>

// 			{isOpen && (
// 				<div className='steps'>
// 					<div className='numbers'>
// 						<div className={`${step >= 1 ? 'active' : ''}`}>1</div>
// 						<div className={`${step >= 2 ? 'active' : ''}`}>2</div>
// 						<div className={`${step >= 3 ? 'active' : ''}`}>3</div>
// 					</div>
// 					<p className='message'>
// 						step {step}: {messages[step - 1]}
// 					</p>
// 					<div className='buttons'>
// 						<button
// 							onClick={handelPrevious}
// 							style={{ background: '#7950f2', color: '#fff' }}
// 						>
// 							Previuos
// 						</button>
// 						<button
// 							onClick={handelNext}
// 							style={{ background: '#7950f2', color: '#fff' }}
// 						>
// 							Next
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// }

// export default App;
