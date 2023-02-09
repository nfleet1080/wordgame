import Keyboard from "./components/Keyboard";
import GameGrid from "./components/GameGrid";
import Header from "./components/Header";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch } from "./hooks";
import { fetchValidWords, fetchWinningWords, newGame } from "./gameSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function App() {
  const dispatch = useAppDispatch();
  const init = async () => {
    // get the list of possible guess words
    dispatch(fetchValidWords());
    // get the answer word list
    dispatch(fetchWinningWords())
      .then(unwrapResult)
      .then((result) => {
        dispatch(newGame());
      })
      .catch((err) => {
        
      });
  }

  init();
  return (
    <Container fluid className="vh-100">
      <Row>
        <Header></Header>
      </Row>
      <Row>
        <Col xs md="auto" className="d-flex justify-content-center align-items-stretch p-4" >
          <GameGrid></GameGrid>
        </Col>
        <Col xs md className="justify-content-center align-items-stretch p-4">
          <Keyboard></Keyboard>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
