import { Modal, Button } from 'react-bootstrap';
import { GameStatus, newGame } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type Props = {};

const Popup = (props: Props) => {
	const dispatch = useAppDispatch();
	const gameStatus = useAppSelector((state) => state.game.gameStatus);
	const winningWord = useAppSelector((state) => state.game.wordToGuess);
	const show = gameStatus === GameStatus.win || gameStatus === GameStatus.lose;
	const heading =
		gameStatus === GameStatus.lose ? (
			<>
				<i className="bi bi-emoji-frown"></i> Game Over <i className="bi bi-emoji-frown"></i>
			</>
		) : (
			<>
				<i className="bi bi-emoji-sunglasses"></i> Congratulations! <i className="bi bi-emoji-sunglasses"></i>
			</>
		);

	const body =
		gameStatus === GameStatus.lose ? (
			<>
				<p>Sorry, you didn't guess the word!</p>The word was <strong>{winningWord.toUpperCase()}</strong>
			</>
		) : (
			<>You guessed the correct word! Way to go!</>
		);
	const handleClose = () => {
		dispatch(newGame());
	};
	return (
		<Modal show={show} backdrop="static" centered>
			<Modal.Header>
				<Modal.Title>{heading}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>
					New Game
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Popup;
