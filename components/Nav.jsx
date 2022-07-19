import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link href="/">
                    <a className={"navbar-brand"}>Quiz App</a>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/">
                            <a className={"nav-link text-dark"}>Home</a>
                        </Link>
                        <Link href="/#quizzes">
                            <a className={"nav-link text-dark"}>Quizzes</a>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}