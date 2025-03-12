import Header from './components/Header';
import { useEffect, useReducer } from 'react';
import Loader from './components/Loader';
import Error from './components/Error';

const SEC_PER_QUESTION = 20;
const initialState = {
	questions: [],

	//  loading , error , ready , active, finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondesRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataRecieved':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};

		case 'start':
			return {
				...state,
				status: 'active',
				secondesRemaining: state.questions.length * SEC_PER_QUESTION,
			};

		case 'newAnswer':
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};

		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};

		case 'tick':
			return {
				...state,
				secondesRemaining: state.secondesRemaining - 1,
				status: state.secondesRemaining === 0 ? 'finished' : state.status,
			};

		default:
			throw new Error('not found');
	}
}

export default function Appv1() {
	const [
		{ questions, status, index, answer, points, highscore, secondesRemaining },
		dispatch,
	] = useReducer(reducer, initialState);
	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		points
	);

	useEffect(function () {
		fetch(`http://localhost:9000/questions`)
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataRecieved', payload: data }))
			.catch((err) => dispatch({ type: 'dataFailed' }));
	}, []);
	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>

						<Footer>
							<Timer
								dispatch={dispatch}
								secondesRemaining={secondesRemaining}
							/>
							<NextButton
								answer={answer}
								dispatch={dispatch}
								index={index}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
			</Main>
			{status === 'finished' && (
				<FinishScreen
					maxPossiblePoints={maxPossiblePoints}
					points={points}
					highscore={highscore}
					dispatch={dispatch}
				/>
			)}
		</div>
	);
}

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

function StartScreen({ numQuestions, dispatch }) {
	return (
		<div className='start'>
			<h2>Welcome to React Quiz</h2>
			<h3>{numQuestions} question to test your React mastery</h3>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'start' })}
			>
				Lets's Start
			</button>
		</div>
	);
}

function Question({ question, dispatch, answer }) {
	return (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	);
}

function Options({ question, dispatch, answer }) {
	const hasAnswerd = answer !== null;

	return (
		<div className='options'>
			{question.options.map((option, i) => (
				<button
					className={`btn btn-option ${i === answer ? 'answer' : ''} ${
						hasAnswerd
							? i === question.correctOption
								? 'correct'
								: 'wrong'
							: ''
					}`}
					key={option}
					onClick={() => dispatch({ type: 'newAnswer', payload: i })}
					disabled={answer !== null}
				>
					{option}
				</button>
			))}
		</div>
	);
}

function NextButton({ dispatch, answer, index, numQuestions }) {
	if (answer === null) return;

	if (index < numQuestions - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		);

	if (index === numQuestions - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);
}

function Progress({ index, numQuestions, points, maxPossiblePoints }) {
	return (
		<header className='progress'>
			<progress max={numQuestions} value={index} />
			<p>
				Question <strong>{index + 1}</strong> /{numQuestions}
			</p>
			<p>
				<strong>{points}</strong>/{maxPossiblePoints}
			</p>
		</header>
	);
}

function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
	const precentage = (points / maxPossiblePoints) * 100;

	let emoji;
	if (precentage === 100) emoji = '🎉';
	if (precentage >= 80 && precentage < 100) emoji = '😊';
	if (precentage >= 60 && precentage < 80) emoji = '😐';
	if (precentage >= 40 && precentage < 60) emoji = '😔';
	if (precentage >= 20 && precentage < 40) emoji = '😕';
	if (precentage >= 0 && precentage < 20) emoji = '😞';

	return (
		<>
			<p className='result'>
				<span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
				{maxPossiblePoints} ({Math.ceil(precentage)}%)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>

			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart quiz
			</button>
		</>
	);
}

function Timer({ dispatch, secondesRemaining }) {
	const mins = Math.floor(secondesRemaining / 60);
	const seconds = secondesRemaining % 60;
	useEffect(
		function () {
			const id = setInterval(() => {
				dispatch({ type: 'tick' });
			}, 1000);
			//  clean up function
			return () => clearInterval(id);
		},
		[dispatch]
	);
	return (
		<div className='timer'>
			{mins < 10 && '0'}
			{mins}: {seconds < 0 && '0'}
			{seconds}
		</div>
	);
}

function Footer({ children }) {
	return <div>{children}</div>;
}
