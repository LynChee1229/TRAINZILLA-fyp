import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import SignIn from '../components/Sign Up & In/Sign-in'
import HomePage from '../components/Home/HomePage'
import MapRoutes from '../components/MapRoutes/MapRoutes'
import Announcement from '../components/Announcement/Annoucement'
import AboutUs from '../components/AboutUs/AboutUs'
import Profile from "../components/Profile/Profile";
import { createTheme, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import ThemeEnabler from '../components/ThemeEnabler'
import SignUP from "../components/Sign Up & In/Sign-up";

function App() {
    //this is the main file

    const [darkTheme, setDarkTheme] = useState(false)

    const setThemeCallBack = (darkTheme) => {
        setDarkTheme(darkTheme)
    }

    const theme = createTheme({
        palette: {
            mode: darkTheme ? 'dark' : 'light',
            primary: {
                main: '#008DC5',
            },
            secondary: {
                main: '#004684',
            },
            background: {
                default: '#c0f2fb',
                paper: '#fff',
            },
        },
    })

    useEffect(() => {
        setThemeCallBack(localStorage.getItem('Default Theme') === 'true')
    }, [])

    useEffect(() => {
        localStorage.setItem('Default Theme', darkTheme ? 'true' : 'false')
    }, [darkTheme])

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from="/" to="/home" />

                    <Route
                        path={'/map-routes'}
                        exact
                        component={() => <MapRoutes />}
                    />

                    <Route
                        path={'/announcements'}
                        exact
                        component={() => <Announcement />}
                    />

                    <Route
                        path={'/about-us'}
                        exact
                        component={() => <AboutUs />}
                    />

                    <Route
                        path={'/profile'}
                        exact
                        component={() => <Profile />}
                    />

                    <Route
                        path={'/sign-in'}
                        exact
                        component={() => <SignIn />}
                    />

                    <Route
                        path={'/sign-up'}
                        exact
                        component={() => <SignUP />}
                    />

                    <Route
                        path={'/theme-enabler'}
                        exact
                        component={(props) => (
                            <ThemeEnabler
                                {...props}
                                darkTheme={darkTheme}
                                setTheme={setThemeCallBack}
                            />
                        )}
                        // render={(props) => (
                        //     <ThemeEnabler
                        //         {...props}
                        //         darkTheme={darkTheme}
                        //         setTheme={setThemeCallBack}
                        //     />
                        // )}
                    />

                    <Route path={'/home'} exact component={() => <HomePage />} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
