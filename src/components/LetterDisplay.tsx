import { LetterState, LetterStates } from '../gameSlice';
import { Card, Col } from 'react-bootstrap';

type Props = {
	letterData: LetterState;
};

const LetterDisplay = ({ letterData }: Props) => {
	let variant = 'transparent';
  
	if (letterData.state === LetterStates.correct) variant = 'Success';
	if (letterData.state === LetterStates.incorrect) variant = 'Light';
	if (letterData.state === LetterStates.wrongPosition) variant = 'Warning';

  const border = variant === 'transparent' ? 'Secondary' : variant;
	return (
		<Col>
			<Card className="border-5 fs-1 d-flex justify-content-center align-items-center text-white" border={border.toLowerCase()} style={{ height: '9rem', width: '9rem' }} bg={variant.toLowerCase()}>
				{letterData.letter}
			</Card>
		</Col>
	);
};

export default LetterDisplay;
