import React, {useState} from 'react'
import {
    Button,
    Card,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
} from '@mui/material'
import '../../styles/css/sign-in.sass'
import '../../styles/Font/fonts.sass'
import {Visibility, VisibilityOff} from '@mui/icons-material'

const SignUP = () => {
    const [showPassword, changeShowPassword] = useState(false)
    const [password, setPassword] = useState('')

    const handleChange = () => (event) => {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        changeShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
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
                        />
                        <TextField
                            id="dob"
                            className="registerTextBox"
                            label="Date of Birth"
                            type="date"
                            variant="filled"
                            InputLabelProps={{shrink: true}}
                        />
                    </div>

                    <div>
                        <TextField
                            id="email"
                            className="registerTextBox leftTextBox"
                            label="Email"
                            type="email"
                            variant="filled"
                        />
                        <TextField
                            id="contact"
                            className="registerTextBox"
                            label="Contact Number"
                            type="tel"
                            variant="filled"
                        />
                    </div>

                    <div>
                        <TextField
                            id="password"
                            className="registerTextBox leftTextBox"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange()}
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
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
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange()}
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
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
                    >
                        Register Account
                    </Button>
                </FormControl>
            </Card>
        </Paper>
    )
}

export default SignUP