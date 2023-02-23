import { Container, Navbar } from 'react-bootstrap';
import { useAppSelector } from '../hooks';

type Props = {};

const Header = (props: Props) => {
	const wins = useAppSelector((state) => state.game.wins);
	const losses = useAppSelector((state) => state.game.losses);
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container fluid className="px-4">
				<Navbar.Brand>
					<img src="cwscs.png" width="30" height="30" className="d-inline-block align-top me-3" alt="CWSCS logo" />
					CWSCS Wordle
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text className="me-4">
						Wins: <strong className="text-success">{wins}</strong>
					</Navbar.Text>
					<Navbar.Text>
						Losses: <strong className="text-danger">{losses}</strong>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
