import { Button } from 'react-bootstrap';
import { GameStatus, GuessReasons, GuessStatuses, LetterState, LetterStates, nextWord, updateGameState, updateGuessStatus, updateLetterState, WordState } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type Props = {};

const guessToWord = (guess: WordState) => {
	const letters: string[] = [];
	guess.letters.forEach((letter: LetterState) => letters.push(letter.letter));
	return letters.join('');
};

const EnterButton = (props: Props) => {
	const dispatch = useAppDispatch();
	const winningWord = useAppSelector((state) => state.game.wordToGuess);
	const currentGuessIndex = useAppSelector((state) => state.game.currentGuessIndex);
	const guesses = useAppSelector((state) => state.game.guesses);
	const currentGuess = guesses[currentGuessIndex];
	const letterFrequency = useAppSelector((state) => state.game.answerLetterFrequency);
	// const tempFrequency = useAppSelector((state) => state.game.tempFrequency);
	const gameState = useAppSelector((state) => state.game.gameStatus);
	const validWords = useAppSelector((state) => state.game.validWords);
    const guessLength = useAppSelector((state) => state.game.currentGuessLetterIndex);

	const submitGuess = () => {		
		dispatch(updateGuessStatus({ status: GuessStatuses.waiting, reason: GuessReasons.ok }));
		const tempFrequency = {...letterFrequency};
		// dispatch(setTempFrequency());
		// let tmpFrequency = letterFrequency;
		// make sure they've entered in a full word
		if (guessLength < winningWord.length) {
			dispatch(updateGuessStatus({ status: GuessStatuses.rejected, reason: GuessReasons.tooShort }));
			return;
		}
		if (!validWords.includes(guessToWord(currentGuess).toLowerCase())) {
			dispatch(updateGuessStatus({ status: GuessStatuses.rejected, reason: GuessReasons.notInWordList }));
			return;
		}

		let gameStatus = GameStatus.win;
		let index = 0;

		// parse each letter
		currentGuess.letters.forEach((currentLetter: LetterState) => {
			let state = LetterStates.open;
			if (currentLetter.letter.toLowerCase() === winningWord.charAt(index)) {
				// direct match?
				state = LetterStates.correct;
				// dispatch(reduceLetterFrequency(currentLetter.letter));
				tempFrequency[currentLetter.letter] -= 1;

			} else {
				// does the letter exist in the guess?
				if (tempFrequency[currentLetter.letter] > 0) {
					// TODO: check if this happened already in the word
					// if so make sure we have frequency available before marking wrong position
					state = LetterStates.wrongPosition;
					tempFrequency[currentLetter.letter] -= 1;
					// dispatch(reduceTempFrequency(currentLetter.letter));
				} else {
					// if not, we are incorrect
					state = LetterStates.incorrect;
				}
				gameStatus = GameStatus.active;
			}

			dispatch(updateLetterState({ index, state }));
			index++;
		});

		if (gameStatus === GameStatus.win) {
			dispatch(updateGameState(gameStatus));
			// TODO: record the win
		} else {
			if (currentGuessIndex === guesses.length - 1) {
				dispatch(updateGameState(GameStatus.lose));
				// TODO: record the loss
			} else {
				dispatch(nextWord());
			}
		}
	};

	/*
    if (state.currentGuessWord.length() <= state.wordToGuess.length) state.currentGuessStatus = {status: GuessStatuses.rejected, reason: GuessReasons.tooShort};            
			else if (!state.validWords.includes(state.currentGuessWord.toString())) state.currentGuessStatus = {status: GuessStatuses.rejected, reason: GuessReasons.notInWordList};
            else {
                const statusParse = state.currentGuessWord.updateState(state.wordToGuess);
                if (statusParse === GameStatus.win) state.gameStatus = GameStatus.win;
                else {
                    state.currentGuessIndex++;
                    // that guess wasn't a winner, do we still have guesses?
                    if (state.currentGuessIndex === state.noOfGuesses - 1) state.gameStatus = GameStatus.lose;
                }
            }      
    */
	return (
		<Button onClick={submitGuess} variant="info" size="lg" className="fs-2 px-4 py-3 flex-fill" disabled={gameState !== GameStatus.active ? true : false}>
			Enter <i className="bi bi-arrow-return-left"></i>
		</Button>
	);
};

export default EnterButton;
