import { createContext } from 'react';
import { useReducer, useEffect, useContext } from 'react';

const QuizContext = createContext();

const SEC_PER_QUESTION = 30;

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
function QuizProvider({ children }) {
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
		<QuizContext.Provider
			value={
				(status,
				questions,
				index,
				answer,
				highscore,
				secondesRemaining,
				dispatch,
				numQuestions,
				maxPossiblePoints)
			}
		>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined)
		throw new Error('useQuiz must be used within a QuizProvider');

	return context;
}
export { QuizProvider, useQuiz };
