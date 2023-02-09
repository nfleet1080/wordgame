import { Row } from 'react-bootstrap';
import LetterDisplay from './LetterDisplay';
import { useAppSelector } from '../hooks';
import { useEffect } from 'react';


type Props = {
	rowIndex: number;
};

const WordInput = ({ rowIndex }: Props) => {
	const activeRowIndex = useAppSelector((state) => state.game.currentGuessIndex);
	const guess = useAppSelector((state) =>state.game.guesses);
	const wordLength = guess[rowIndex].letters.length;
	// console.info('rowindex', rowIndex, 'rowval', rowVal);

	useEffect(() => {
		if(activeRowIndex === rowIndex)		
			console.table(guess[rowIndex].letters)
	}, [guess,activeRowIndex,rowIndex]);

	// let LetterInputs = [];
	// for (let index = 0; index < wordLength; index++) {
	// 	const gridLetter = guess[rowIndex].letters[index];
	// 	LetterInputs.push(<LetterDisplay key={index} letterData={gridLetter}></LetterDisplay>);
	// }
	return <Row className="mb-2 gx-2" xs={wordLength}>
		{/* {LetterInputs} */}
		{guess[rowIndex].letters.map((letter, index) => {
			return <LetterDisplay key={index} letterData={letter}></LetterDisplay>
		})}
		</Row>;
};

export default WordInput;
