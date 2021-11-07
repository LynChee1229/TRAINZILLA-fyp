import React, {useState} from 'react'
import {Button, Card, Container, FormControl, IconButton, InputAdornment, Paper, TextField,} from '@mui/material'
import '../../styles/css/sign-in.sass'
import '../../styles/Font/fonts.sass'
import {Visibility, VisibilityOff} from '@mui/icons-material'

const SignUP = () => {
    const [showPassword1, changeShowPassword1] = useState(false)
    const [showPassword2, changeShowPassword2] = useState(false)
    const [username, setUsername] = useState('')
    const [dob, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleRegister = () => {
        console.log(username, dob, email, contact, password, confirmPassword)
    }

    return (
        <Paper id="bgPaper" className="default-font">
            <Card className="middleCard" elevation={7}>
                <Container className="bigTitle bold">Sign Up</Container>

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
                            className="registerTextBox"
                            label="Contact Number"
                            type="tel"
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
        </Paper>
    )
}

export default SignUP