import React, {useState} from 'react'
import {Button, Card, Container, FormControl, IconButton, InputAdornment, Paper, TextField,} from '@mui/material'
import '../../styles/css/sign-in.sass'
import '../../styles/Font/fonts.sass'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import $ from 'jquery'
import {useHistory} from 'react-router-dom'
import {signUp} from "../../API/signUpAPI";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const SignUP = () => {
    const [showPassword1, changeShowPassword1] = useState(false)
    const [showPassword2, changeShowPassword2] = useState(false)
    const [username, setUsername] = useState('')
    const [dob, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useHistory()

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleRegister = () => {
        if (username && email && contact && dob && password && confirmPassword) {
            if (password === confirmPassword) {
                signUp(username, email, contact, dob, password).then(() => {
                    if (localStorage.getItem('user-info')) {
                        history.push('/home')
                    }
                });
            } else {
                $(".dangerMsg").removeClass("d-none");
                $(".dangerMsg").html("Passwords are not matched!");
            }
        } else {
            $(".dangerMsg").removeClass("d-none");
            $(".dangerMsg").html("Please fill in all the fields!");
        }
    }

    return (
        <Paper id="bgPaper" className="default-font">
            <Header />
            <Card className="middleCard" elevation={7}>
                <Container className="bigTitle bold">Sign Up</Container>

                <Container className="dangerMsg alert alert-danger d-none flexDisplay bold"/>

                <FormControl className="form">
                    <div>
                        <TextField
                            id="username"
                            className="registerTextBox leftTextBox"
                            label="Username"
                            type="text"
                            variant="filled"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <TextField
                            id="dob"
                            className="registerTextBox"
                            label="Date of Birth"
                            type="date"
                            variant="filled"
                            InputLabelProps={{shrink: true}}
                            onChange={(e) => {
                                setDOB(e.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <TextField
                            id="email"
                            className="registerTextBox leftTextBox"
                            label="Email"
                            type="email"
                            variant="filled"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextField
                            id="contact"
                            label="Contact Number"
                            className="registerTextBox"
                            variant="filled"
                            onChange={(e) => {
                                setContact(e.target.value)
                            }}
                        />

                    </div>

                    <div>
                        <TextField
                            id="password"
                            className="registerTextBox leftTextBox"
                            label="Password"
                            type={showPassword1 ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                changeShowPassword1(!showPassword1)
                                            }}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword1 ? (
                                                <VisibilityOff/>
                                            ) : (
                                                <Visibility/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="confirmPass"
                            className="registerTextBox"
                            label="Confirm Password"
                            type={showPassword2 ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                changeShowPassword2(!showPassword2)
                                            }}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword2 ? (
                                                <VisibilityOff/>
                                            ) : (
                                                <Visibility/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <Button
                        variant="contained"
                        aria-label="submitRegisterAcc"
                        className="registerBtn"
                        onClick={handleRegister}
                    >
                        Register Account
                    </Button>
                </FormControl>
            </Card>
            <Footer />
        </Paper>
    )
}

export default SignUP