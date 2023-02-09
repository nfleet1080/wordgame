import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

type Props = {}

const Header = (props: Props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="px-4">
        <Navbar.Brand>Game Name</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-4">
            Wins: <strong>0</strong>
          </Navbar.Text>
          <Navbar.Text>
            Losses: <strong>0</strong>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header