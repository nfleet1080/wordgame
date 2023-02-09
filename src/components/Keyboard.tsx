import { LetterState } from '../gameSlice';
import { useAppSelector } from '../hooks';
import BackspaceButton from './BackspaceButton';
import EnterButton from './EnterButton';
import KeyButton from './KeyButton';

type Props = {};

const Keyboard = (props: Props) => {
	const alphabet = useAppSelector((state) => state.game.alphabet);

	const KeyButtons = alphabet.map((letter: LetterState) => {
		return <KeyButton letter={letter} key={letter.letter}></KeyButton>;
	});

	return (
		<>
			<div data-testid="keyboard" className="d-flex flex-wrap justify-content-center align-items-center gap-3">
				{KeyButtons}
			</div>
            <div data-testid="keyboard" className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-3">
				<BackspaceButton></BackspaceButton>
                <EnterButton></EnterButton>
			</div>
		</>
	);
};

export default Keyboard;
