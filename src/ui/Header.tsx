import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export function Header() {
	return (
		<header className="header">
			<Navbar bg="dark" expand="lg" variant="dark">
				<Container>
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Search</Nav.Link>
							<Nav.Link href="#link">Explore</Nav.Link>
							<Nav.Link href="#link">Collections</Nav.Link>
							<Nav.Link href="#link">Profile</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
