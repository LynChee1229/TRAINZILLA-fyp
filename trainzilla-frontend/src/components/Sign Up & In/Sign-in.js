import React, {useEffect, useState} from 'react'
import {Button, Card, CardContent, Container, IconButton, Paper, TextField,} from '@mui/material'
import {NavLink, useHistory} from 'react-router-dom'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import AppleIcon from '@mui/icons-material/Apple'
import FacebookIcon from '@mui/icons-material/Facebook'
import '../../styles/css/sign-in.sass'
import '../../styles/Font/fonts.sass'
import {Login} from '../../API/signinAuth'
import GoogleLogin from "react-google-login";
// import $ from 'jquery'

const SignIn = () => {
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
        const res = await fetch("http://localhost:8000/api/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        // store returned user somehow
    }

    return (
        <Paper id="bgPaper" className="default-font">
            <Card className="middleCard" elevation={7}>
                <Container className="bigTitle bold centerFont">
                    Sign In
                </Container>
                <CardContent className="flexDisplay">
                    <div>
                        <Container className="container">
                            <TextField
                                value={userKey}
                                onChange={handleKeyChange}
                                className="textBox"
                                label="Username / Email"
                                variant="filled"
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
                <Container className="dangerMsg alert alert-danger d-none flexDisplay bold"/>
                <Container className="title centerFont">OR:</Container>
                <CardContent className="flexDisplay">

                    <GoogleLogin
                        className="icon"
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText=""
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />

                    <IconButton aria-label="apple" className="icon">
                        <AppleIcon/>
                    </IconButton>
                    <IconButton aria-label="facebook" className="icon">
                        <FacebookIcon/>
                    </IconButton>
                </CardContent>
                <CardContent className="flexDisplay">
                    <NavLink to="/sign-up">
                        <Button
                            variant="contained"
                            aria-label="registerAcc"
                            className="registerBtn"
                        >
                            Never been here before? Register Now!
                        </Button>
                    </NavLink>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default SignIn
