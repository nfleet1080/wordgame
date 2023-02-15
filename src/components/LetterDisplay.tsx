import { LetterState, LetterStates } from '../gameSlice';
import { Card, Col } from 'react-bootstrap';

type Props = {
	letterData: LetterState;
};

const LetterDisplay = ({ letterData }: Props) => {
	let variant = 'transparent';
  
	if (letterData.state === LetterStates.correct) variant = 'Success';
	if (letterData.state === LetterStates.incorrect) variant = 'Secondary';
	if (letterData.state === LetterStates.wrongPosition) variant = 'Warning';

  const border = variant === 'transparent' ? 'Secondary' : variant;
	return (
		<Col>
			<Card className="border-5 fw-bolder d-flex justify-content-center align-items-center text-white" border={border.toLowerCase()}  bg={variant.toLowerCase()}>
				{letterData.letter}
			</Card>
		</Col>
	);
};

export default LetterDisplay;
