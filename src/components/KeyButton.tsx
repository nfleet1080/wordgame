import Button from 'react-bootstrap/Button';
import { GameStatus, LetterState, LetterStates } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { guessLetter } from '../gameSlice';


type Props = {
    letter: LetterState;
}

const KeyButton = ({letter}: Props) => {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector((state) => state.game.gameStatus);

    let variant = '';
    if (letter.state === LetterStates.open) variant = 'primary';
    if (letter.state === LetterStates.correct) variant = 'success';
    if (letter.state === LetterStates.incorrect) variant = 'secondary';
    if (letter.state === LetterStates.wrongPosition) variant = 'warning';

    const handleClick = () => {
        try {
            dispatch(guessLetter(letter.letter));
        }
        catch (err) {}
    }
  return (
    <Button size="lg" 
    style={{width:'90px'}}
    onClick={handleClick} 
    variant={variant} 
    className="fs-1 px-4 py-3"
    disabled={gameState !== GameStatus.active ? true : false}
    >{letter.letter}</Button>
  )
}

export default KeyButton