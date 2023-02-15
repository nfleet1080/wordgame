import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { GuessReasons } from '../gameSlice';
import { useAppSelector } from '../hooks';
import Collapse from 'react-bootstrap/Collapse';

type Props = {};

const Notifications = (props: Props) => {
	const guessStatus = useAppSelector((state) => state.game.currentGuessStatus);

	useEffect(() => {
		// Set a timer, a few seconds, to then reset the guess status
    console.log(guessStatus.reason === GuessReasons.tooShort)
    console.log(guessStatus.reason === GuessReasons.notInWordList)
		return () => {
			//   second
		};
	}, [guessStatus]);
	return (
		<>
			<Collapse in={guessStatus.reason === GuessReasons.tooShort}>
      <div>
        <Alert key="danger" variant="danger" className='hide'>
					Guess is too short, please submit a 5 letter guess
				</Alert>
        </div>
			</Collapse>
			<Collapse in={guessStatus.reason === GuessReasons.notInWordList}>
        <div>
				<Alert key="danger" variant="danger" className='hide'>
					Invalid word, please try another
				</Alert>
        </div>
			</Collapse>
		</>
	);
};

export default Notifications;
