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
    className="fs-2 px-4 py-3 flex-fill"
    disabled={gameState !== GameStatus.active ? true : false}
    ><i className="bi bi-backspace"></i> Backspace</Button>
  )
}

export default BackspaceButton