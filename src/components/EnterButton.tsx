import { Button } from 'react-bootstrap';
import { GameStatus, GuessReasons, GuessStatuses, LetterStates, updateGuessStatus } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type Props = {}

const EnterButton = (props: Props) => {   
    const dispatch = useAppDispatch();
    const winningWord = useAppSelector((state) => state.game.wordToGuess);
    const currentGuess = useAppSelector((state) => state.game.currentGuessWord);
    const gameState = useAppSelector((state) => state.game.gameStatus);

    const submitGuess = () => {
        // make sure they've entered in a full word
        if (currentGuess.letters.length < winningWord.length)
            dispatch(updateGuessStatus({status: GuessStatuses.rejected, reason: GuessReasons.tooShort}));
        else {
            let gameStatus = GameStatus.win;
            let index = 0;
            const letterFrequency = [...winningWord.toUpperCase()].reduce((total: any, letter) => {
                total[letter] ? total[letter]++ : (total[letter] = 1);
                return total;
            }, {});
            // parse each letter
            currentGuess.letters.forEach((currentLetter) => {
                if (currentLetter.letter === winningWord.charAt(index)) {
                    // direct match?
                    currentLetter.state = LetterStates.correct;
                }else {
                    // does the letter exist in the guess?
                    // if so mark as wrongPosition and reduce the frequency count for that letter by 1
                    // remove from frequency object if it would reach 0
                    if (letterFrequency[currentLetter.letter]) {
                        currentLetter.state = LetterStates.wrongPosition;
                        if (letterFrequency[currentLetter.letter] === 1) delete letterFrequency[currentLetter.letter];
                        else letterFrequency[currentLetter.letter] -= 1;
                    } else {
                        // if not, we are incorrect
                        currentLetter.state = LetterStates.incorrect;
                    }
                    gameStatus = GameStatus.active;
                }
                index++;
            });
        }
    }
    


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
        <Button 
        onClick={submitGuess}
        variant="info"
        size="lg" 
        className="fs-1 px-4 py-3"
        disabled={gameState !== GameStatus.active ? true : false}
        >Enter</Button>
      )
}

export default EnterButton