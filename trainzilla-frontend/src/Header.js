import {Navbar, Nav, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'

function Header()
{
    return (
        <div id="navBar">
            <Navbar variant="light" expand="xl" style={{ backgroundColor:"#E2EFFF", padding:"0", height:"58px" }}>
                <Nav className="d-flex justify-content-between mx-3">
                    <NavLink to="/home" id="navTrainzilla">TRAINZILLA</NavLink>
                </Nav>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto d-flex justify-content-between">
                            <NavLink to="/home" className="mx-5" activeClassName="actTab">HOME</NavLink>
                            <NavLink to="/maproute" className="mx-5" activeClassName="actTab">MAP & ROUTE</NavLink>
                            <NavLink to="/announcement" className="mx-5" activeClassName="actTab">ANNOUNCEMENT</NavLink>
                            <NavLink to="/aboutus" className="mx-5" activeClassName="actTab">ABOUT US</NavLink>
                        </Nav>
                        <Nav className="d-flex flex-row justify-content-center mx-3">
                            <NavLink to="/profile"><Icon.PersonFill size={24}/></NavLink>
                            <NavLink to="/login">LOGIN</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header