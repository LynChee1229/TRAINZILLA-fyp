import React, {useState} from 'react'
import {Button, Card, Container, FormControl, IconButton, InputAdornment, TextField,} from '@mui/material'
import '../../styles/css/sign-in.sass'
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
    const [errorEmail, setErrorEmail] = useState('')
    const [errorContact, setErrorContact] = useState('')
    const [errorDOB, setErrorDOB] = useState('')
    const [errorPW, setErrorPW] = useState('')

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleRegister = () => {
        if (username && email && contact && dob && password && confirmPassword) {
            var error = 0;
            if (email !== "undefined") {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(email)) {
                    error++;
                    setErrorEmail("Please enter a valid email address!");
                } else {
                    setErrorEmail("");
                }
            }

            var phone = /^([1]{1}[0-9]{8})$|^([1]{1}[0-9]{9})$|^([0]{1}[1]{1}[0-9]{8})$|^([0]{1}[1]{1}[0-9]{9})$/;
            if(!phone.test(contact)) {
                error++;
                setErrorContact("Wrong phone number format! eg: 01XXXXXXXX");
            } else {
                setErrorContact("");
            }

            if( (dob < "1900-01-01") || (dob > "2015-12-31") ) {
                error++;
                setErrorDOB("Date must between 01-01-1900 and 31-12-2015");
            } else {
                setErrorDOB("");
            }

            if(password.length < 8) {
                error++;
                setErrorPW("At least 8 characters!");
            } else {
                setErrorPW("");
            }

            if ( (error === 0) && (password !== confirmPassword) ) {
                $(".dangerMsg").removeClass("d-none");
                $(".dangerMsg").html("Passwords are not matched!");
            } else {
                $(".dangerMsg").addClass("d-none");
            }

            if ( (error === 0) && (password === confirmPassword) ) {
                signUp(username, email, contact, dob, password).then(() => {
                    if (localStorage.getItem('user-info')) {
                        history.push('/home')
                    }
                });
            }
        } else {
            $(".dangerMsg").removeClass("d-none");
            $(".dangerMsg").html("Please fill in all the fields!");
        }
    }

    return (
        <div>
            <Header />
            <div id="bgPaper">
                <div id="loginBG">
                    <div className="bigTitle">REGISTER</div>
                    <Card className="middleCard">
                        <Container className="dangerMsg alert alert-danger d-none flexDisplay bold"/>

                        <FormControl className="form" >
                            <div>
                                <TextField
                                    id="username"
                                    className="registerTextBox leftTextBox"
                                    label="Username"
                                    type="text"
                                    variant="filled"
                                    inputProps={{maxLength:40}}
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
                                    inputProps={{ min: "1900-01-01", max: "2015-12-31" }}
                                    error={(errorDOB !== "")}
                                    helperText={errorDOB}
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
                                    error={(errorEmail !== "")}
                                    helperText={errorEmail}
                                    inputProps={{maxLength:40}}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                <TextField
                                    id="contact"
                                    label="Contact Number"
                                    className="registerTextBox"
                                    variant="filled"
                                    inputProps={{maxLength:15}}
                                    error={(errorContact !== "")}
                                    helperText={errorContact}
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
                                    inputProps={{maxLength:50}}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    style={{backgroundColor:"transparent"}}
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
                                    error={(errorPW !== "")}
                                    helperText={errorPW}
                                />

                                <TextField
                                    id="confirmPass"
                                    className="registerTextBox"
                                    label="Confirm Password"
                                    type={showPassword2 ? 'text' : 'password'}
                                    value={confirmPassword}
                                    inputProps={{maxLength:50}}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                    variant="filled"
                                    style={{backgroundColor:"transparent"}}
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
                </div>
            </div>
        </div>
    )
}

export default SignUP