import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QuizProvider } from './contexts/QuizContext';
// import Appv1 from './Appv1';
// import BankAccount from './08challenge/BankAccount';
// import DateConter from './07challeng/DateConter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<QuizProvider>
			{/* <Appv1 /> */}
			<App />
			{/* <DateConter /> */}
			{/* <BankAccount /> */}
		</QuizProvider>
	</React.StrictMode>
);

reportWebVitals();
