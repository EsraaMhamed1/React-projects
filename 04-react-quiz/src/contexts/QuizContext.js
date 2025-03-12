import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const intialState = {
	questions: [],

	// loading , error , ready , active ,finished
	status: 'loading',
	answer: null,
	index: 0,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
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
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
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
				...intialState,
				questions: state.questions,
				status: 'ready',
			};
		// return {
		// 	...state,
		// 	points: 0,
		// 	highscore: 0,
		// 	index: 0,
		// 	answer: null,
		// 	status: 'ready',
		// };
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			};
		default:
			throw new Error('Action unkonwn');
	}
}

function QuizProvider({ children }) {
	const [
		{ questions, index, points, answer, status, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, intialState);

	const numQuestions = questions.length;

	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	useEffect(function () {
		fetch(`http://localhost:9000/questions`)
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataReceived', payload: data }))
			.catch((e) => dispatch({ type: 'dataFailed' }));
	}, []);

	return (
		<QuizContext.Provider
			value={{
				questions,
				index,
				points,
				answer,
				status,
				highscore,
				secondsRemaining,
				dispatch,
				numQuestions,
				maxPossiblePoints,
			}}
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
