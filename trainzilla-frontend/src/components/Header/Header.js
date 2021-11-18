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
    const currentPath = window.location.pathname
    // const theme = localStorage.getItem('Default Theme') === 'true'

    function logOut() {
        localStorage.clear()
        if(currentPath === "/profile") {
            window.location.replace("/home");
        } else {
            window.location.reload(false);
        }     
    }

    var dot = "";
    if(user) {
        if(user.userName.length > 15) {
            dot = "...";
        }
    }

    return (
        <div>
            <AnnouncementBar/>
            <Navbar variant="light" expand="xl" id="navBar">
                <Container>
                    <NavbarBrand className="mx-8">
                        <NavLink to="/home" id="navTrainzilla">
                            TRAINZILLA
                        </NavLink>
                    </NavbarBrand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>


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
                                        title={"Hi, " + ((user.userName).charAt(0).toUpperCase() + (user.userName).slice(1)).substring(0, 15) + dot}
                                        id="navDD"
                                    >
                                        <NavDropdown.Item className="ddItem">
                                            <NavLink to="/profile" className="profileHead">
                                                <Icon.PersonFill size={24}/>
                                            </NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className="ddItem"
                                            id="logoutBtn"
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