import React, {useEffect, useState} from 'react'
import {Button, Card, CardContent, Container, TextField,} from '@mui/material'
import {NavLink, useHistory} from 'react-router-dom'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import '../../styles/css/sign-in.sass'
import {Login} from '../../API/signinAuth'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import $ from 'jquery'

const SignIn = () => {
    const clientId = '853290800594-0r97u6c6olmb86jqjb8ia4pfd6dihul6.apps.googleusercontent.com';

    const [userKey, setUserKey] = useState('')
    const [userPass, setUserPass] = useState('')
    const history = useHistory()

    const handleKeyChange = (e) => {
        setUserKey(e.target.value)
    }

    const handlePassChange = (e) => {
        setUserPass(e.target.value)
    }

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/home')
        }
    })

    const handleLogin = async googleData => {
        // const res = await fetch("http://localhost:8000/api/api/v1/auth/google", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         token: googleData.tokenId
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // const data = await res.json()
        // console.log(data)
        // store returned user somehow
    }

    return (
        <div>
            <Header/>
            <div id="bgPaper">
                <div id="loginBG">
                    <div className="bigTitle">LOGIN</div>
                    <Card className="middleCard">
                        <Container className="dangerMsg alert alert-danger d-none flexDisplay bold"/>
                        <CardContent className="flexDisplay">
                            <div>
                                <Container className="container">
                                    <TextField
                                        value={userKey}
                                        onChange={handleKeyChange}
                                        className="textBox"
                                        label="Username / Email"
                                        variant="filled"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                Login(userKey, userPass).then(() => {
                                                    if (localStorage.getItem('user-info')) {
                                                        history.push('/home')
                                                    }
                                                })
                                        }}
                                    />
                                </Container>
                                <Container className="container">
                                    <TextField
                                        value={userPass}
                                        onChange={handlePassChange}
                                        className="textBox"
                                        label="Password"
                                        type="password"
                                        variant="filled"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                Login(userKey, userPass).then(() => {
                                                    if (localStorage.getItem('user-info')) {
                                                        history.push('/home')
                                                    }
                                                })
                                        }}
                                    />
                                </Container>
                            </div>
                            <Button
                                className="submitButton"
                                variant="contained"
                                aria-label="submitLogin"
                                onClick={() => {
                                    Login(userKey, userPass).then(() => {
                                        if (localStorage.getItem('user-info')) {
                                            history.push('/home')
                                        }
                                    })
                                }}
                            >
                                <DoubleArrowIcon/>
                            </Button>
                        </CardContent>

                        <NavLink to="/forget-password" className="forgetLink">Forget Password?</NavLink>

                        {/*<Container className="orTitle">OR : </Container>*/}

                        {/*<CardContent className="flexDisplay">*/}

                        {/*    <GoogleLogin*/}
                        {/*        className="icon"*/}
                        {/*        clientId={clientId}*/}
                        {/*        buttonText=""*/}
                        {/*        onSuccess={handleLogin}*/}
                        {/*        // onFailure={handleLogin}*/}
                        {/*        cookiePolicy={'single_host_origin'}*/}
                        {/*    />*/}

                        {/*    <IconButton aria-label="apple" className="icon">*/}
                        {/*        <AppleIcon/>*/}
                        {/*    </IconButton>*/}
                        {/*    <IconButton aria-label="facebook" className="icon">*/}
                        {/*        <FacebookIcon/>*/}
                        {/*    </IconButton>*/}
                        {/*</CardContent>*/}
                        <CardContent>
                            <NavLink to="/sign-up">
                                <Button
                                    variant="contained"
                                    aria-label="registerAcc"
                                    className="registerBtn"
                                    onClick={() => {
                                        $(window).scrollTop(0);
                                    }}
                                >
                                    Never been here before? Register Now!
                                </Button>
                            </NavLink>
                        </CardContent>
                    </Card>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default SignIn
