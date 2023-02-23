import Keyboard from './components/Keyboard';
import GameGrid from './components/GameGrid';
import Header from './components/Header';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchValidWords, fetchWinningWords, newGame } from './gameSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Notifications from './components/Notifications';
import Popup from './components/Popup';
import { useEffect } from 'react';

function App() {
	const dispatch = useAppDispatch();
	const answerKeyCount = useAppSelector((state) => state.game.winningWords.length);

	useEffect(() => {
		// get the list of possible guess words
		dispatch(fetchValidWords());
		// get the answer word list
		dispatch(fetchWinningWords())
			.then(unwrapResult)
			.then((result) => {
				if (answerKeyCount === 0) dispatch(newGame());
			})
			.catch((err) => {});
	}, [answerKeyCount, dispatch]);

	return (
		<Container fluid className="vh-100 bg-dark bg-gradient">
			<Row>
				<Header></Header>
			</Row>
			<Row>
				<Col xs md="auto" className="d-flex justify-content-center align-items-stretch p-4">
					<GameGrid></GameGrid>
				</Col>
				<Col xs md className="justify-content-center align-items-stretch p-4">
					<Keyboard></Keyboard>
					<Notifications></Notifications>
				</Col>
			</Row>
			<Popup></Popup>
		</Container>
	);
}

export default App;
