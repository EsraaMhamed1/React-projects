import React from 'react';

export default function FinishScreen({
	points,
	maxPossiblePoints,
	highscore,
	dispatch,
}) {
	const precentae = (points / maxPossiblePoints) * 100;

	let emoji;
	if (precentae === 100) emoji = '💰';
	if (precentae >= 80 && precentae < 100) emoji = '🎉';
	if (precentae >= 50 && precentae < 80) emoji = '😊';
	if (precentae >= 0 && precentae < 50) emoji = '🤨';
	if (precentae === 0) emoji = '🤦‍♀️';

	return (
		<>
			<p className='result'>
				<span>{emoji}</span>You scored <strong>{points} </strong> out of{' '}
				{maxPossiblePoints} ({Math.round(precentae)}%)
			</p>

			<p className='highscore'>( Highscore: {highscore} points)</p>

			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart quiz{' '}
			</button>
		</>
	);
}
