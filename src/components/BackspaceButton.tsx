import React from 'react'
import { Button } from 'react-bootstrap';
import { backspace, GameStatus } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type Props = {}

const BackspaceButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game.gameStatus);

  const handleClick = () => {
    dispatch(backspace());
  };
  return (
    <Button 
    onClick={handleClick}
    variant="danger"
    size="lg" 
    className="fs-1 px-4 py-3"
    disabled={gameState !== GameStatus.active ? true : false}
    >Backspace</Button>
  )
}

export default BackspaceButton