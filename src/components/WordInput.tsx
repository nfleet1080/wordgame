import { Row } from 'react-bootstrap';
import LetterDisplay from './LetterDisplay';
import { useAppSelector } from '../hooks';
// import { useEffect } from 'react';

type Props = {
	rowIndex: number;
};

const WordInput = ({ rowIndex }: Props) => {
	const guess = useAppSelector((state) => state.game.guesses);
	const wordLength = guess[rowIndex].letters.length;

	return (
		<Row className="mb-2 gx-2" xs={wordLength}>
			{guess[rowIndex].letters.map((letter, index) => {
				return <LetterDisplay key={index} letterData={letter}></LetterDisplay>;
			})}
		</Row>
	);
};

export default WordInput;
