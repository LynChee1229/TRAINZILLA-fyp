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
import $ from 'jquery'

function Header() {
    const user = JSON.parse(localStorage.getItem('user-info'))
    // const theme = localStorage.getItem('Default Theme') === 'true'

    function logOut() {
        localStorage.clear()
        window.location.reload(false)
    }

    $(document).on('click', '.navbar-collapse a', function(){
        $('.navbar-collapse').removeClass('show');
    });

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
                                className="nlink"
                                activeClassName="actTab"
                            >
                                HOME
                            </NavLink>
                            <NavLink
                                to="/map-routes"
                                className="nlink"
                                activeClassName="actTab"
                            >
                                MAP & ROUTE
                            </NavLink>
                            <NavLink
                                to="/announcements"
                                className="nlink"
                                activeClassName="actTab"
                            >
                                ANNOUNCEMENT
                            </NavLink>
                            <NavLink
                                to="/about-us"
                                className="nlink"
                                activeClassName="actTab"
                            >
                                ABOUT US
                            </NavLink>

                            {user ? (
                                <>
                                    <NavDropdown
                                        title={"Hi, " + (user.userName).charAt(0).toUpperCase() + (user.userName).slice(1)}
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
                                    <NavLink to="/sign-in" className="nlink">
                                        LOGIN
                                    </NavLink>
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