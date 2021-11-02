import AnnouncementBar from './AnnoucementBar'
import {
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import '../../styles/css/header.sass'
import 'bootstrap/dist/css/bootstrap.css'

function Header() {
    const user = JSON.parse(localStorage.getItem('user-info'))
    // const theme = localStorage.getItem('Default Theme') === 'true'

    function logOut() {
        localStorage.clear()
        window.location.reload(false)
    }

    return (
        <div>
            <AnnouncementBar />
            <Navbar variant="light" expand="xl" id="navBar">
                <Container>
                    <NavbarBrand className="mx-8">
                        <NavLink to="/home" id="navTrainzilla">
                            TRAINZILLA
                        </NavLink>
                    </NavbarBrand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse className="basic-navbar-nav">
                        <Nav className="m-auto">
                            <NavLink
                                to="/home"
                                className="mx-4"
                                activeClassName="actTab"
                            >
                                HOME
                            </NavLink>
                            <NavLink
                                to="/map-routes"
                                className="mx-4"
                                activeClassName="actTab"
                            >
                                MAP & ROUTE
                            </NavLink>
                            <NavLink
                                to="/announcements"
                                className="mx-4"
                                activeClassName="actTab"
                            >
                                ANNOUNCEMENT
                            </NavLink>
                            <NavLink
                                to="/about-us"
                                className="mx-4"
                                activeClassName="actTab"
                            >
                                ABOUT US
                            </NavLink>

                            {user ? (
                                <>
                                    <NavDropdown
                                        title={user.userName}
                                        id="navDD"
                                    >
                                        <NavDropdown.Item className="ddItem">
                                            <NavLink to="/profile">
                                                <Icon.PersonFill size={24} />
                                            </NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className="ddItem"
                                            onClick={logOut}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/sign-in" className="mx-3">
                                        LOGIN / REGISTER
                                    </NavLink>
                                    {/*<NavLink to="/register"> REGISTER</NavLink>*/}
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header