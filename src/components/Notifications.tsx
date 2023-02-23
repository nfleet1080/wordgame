import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { GameStatus, GuessReasons } from '../gameSlice';
import { useAppSelector } from '../hooks';
import Collapse from 'react-bootstrap/Collapse';

type Props = {};

const Notifications = (props: Props) => {
	const guessStatus = useAppSelector((state) => state.game.currentGuessStatus);
	const gameStatus = useAppSelector((state) => state.game.gameStatus);
	useEffect(() => {
		// Set a timer, a few seconds, to then reset the guess status?
		return () => {
			//   second
		};
	}, [guessStatus]);
	return (
		<>
			<Collapse in={gameStatus === GameStatus.loading}>
				<div>
					<Alert key="warning" variant="warning" className="hide fs-4">
						<div className="spinner-border me-3" role="status">
						</div>Loading new game...
					</Alert>
				</div>
			</Collapse>
			<Collapse in={gameStatus === GameStatus.error}>
				<div>
					<Alert key="danger" variant="danger" className="hide fs-4">
						<i className="bi bi-bug-fill me-3"></i> An error occurred while loading data
					</Alert>
				</div>
			</Collapse>
			<Collapse in={guessStatus.reason === GuessReasons.tooShort}>
				<div>
					<Alert key="danger" variant="danger" className="hide fs-4">
						<i className="bi bi-exclamation-triangle-fill me-3"></i> Guess is too short, please submit a 5 letter guess
					</Alert>
				</div>
			</Collapse>
			<Collapse in={guessStatus.reason === GuessReasons.notInWordList}>
				<div>
					<Alert key="danger" variant="danger" className="hide fs-4">
						<i className="bi bi-question-diamond-fill" me-3></i> Invalid word, please try another
					</Alert>
				</div>
			</Collapse>
		</>
	);
};

export default Notifications;
