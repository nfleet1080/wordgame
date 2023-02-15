import React from 'react'
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { useAppSelector } from '../hooks';

type Props = {}

const Header = (props: Props) => {
  const wins = useAppSelector((state) => state.game.wins);
  const losses = useAppSelector((state) => state.game.losses);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="px-4">
        <Navbar.Brand>Game Name</Navbar.Brand>
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
  )
}

export default Header