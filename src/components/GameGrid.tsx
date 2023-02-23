import WordInput from './WordInput';
import { useAppSelector } from '../hooks';
import { Container } from 'react-bootstrap';

type Props = {};

const GameGrid = (props: Props) => {
	let WordInputs = [];
	const guesses = useAppSelector((state) => state.game.guesses);

	for (let index = 0; index < guesses.length; index++) {
		WordInputs.push(<WordInput key={index} rowIndex={index}></WordInput>);
	}
	return <Container data-testid="GameGrid">{WordInputs}</Container>;
};

export default GameGrid;
