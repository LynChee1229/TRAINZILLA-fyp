import Bar from './Bar'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'

function Header()
{
    let user = JSON.parse(localStorage.getItem("user-info"));

    function logOut() {
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        <div id="navBar">
            <Bar/>
            <Navbar variant="light" expand="xl" style={{ backgroundColor:"#E2EFFF", padding:"0", minHeight:"58px" }}>
                <Nav className="d-flex justify-content-between mx-3">
                    <NavLink to="/" id="navTrainzilla">TRAINZILLA</NavLink>
                </Nav>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-3"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto d-flex justify-content-between">
                            <NavLink to="/home" className="mx-5" activeClassName="actTab">HOME</NavLink>
                            <NavLink to="/maproute" className="mx-5" activeClassName="actTab">MAP & ROUTE</NavLink>
                            <NavLink to="/announcement" className="mx-5" activeClassName="actTab">ANNOUNCEMENT</NavLink>
                            <NavLink to="/aboutus" className="mx-5" activeClassName="actTab">ABOUT US</NavLink>
                        </Nav>
                        <Nav className="d-flex flex-row justify-content-center mx-3">
                            {
                                localStorage.getItem("user-info") ?
                                <>
                                    <NavDropdown title={user.userName} id="navDD">
                                        <NavDropdown.Item className="ddItem">
                                            <NavLink to="/profile"><Icon.PersonFill size={24}/></NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item className="ddItem" onClick={logOut}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                </>
                                :
                                <>
                                    <NavLink to="/login">LOGIN</NavLink>
                                    <NavLink to="/register"> / REGISTER</NavLink>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header