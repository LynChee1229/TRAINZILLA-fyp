import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {Button, Card, CardContent, Container, TextField} from '@mui/material'
import '../../styles/css/sign-in.sass'
import $ from 'jquery'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [btn, setBtn] = useState(false)
    const [errorEmail, setErrorEmail] = useState('')

    async function handleForget()
    {
        if(email) {
            if (email !== "undefined") {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(email)) {
                    setErrorEmail("Invalid email address!");
                } else {
                    setErrorEmail("");

                    let item = {
                        userEmail: email,
                    };
        
                    let result = await fetch("http://localhost:8000/api/forgetPassword", {
                        method: 'POST',
                        body: JSON.stringify(item),
                        headers: {
                            "Content-Type": 'application/json',
                            "Accept": 'application/json'
                        }
                    });
        
                    result = await result.json();
        
                    if(result.success) {
                        $('.dangerMsg').removeClass('d-none');
                        $('.dangerMsg').html(result.success);
                        setBtn(true);
                    } 
                    else if(result.fail) {
                        $('.dangerMsg').removeClass('d-none');
                        $('.dangerMsg').html(result.fail);
                    }

                }
            }
        } else {
            setErrorEmail("Fill out this field!");
        }
    }

    return(
        <div>
            <Header />
            <div id="bgPaper">
                <div id="loginBG">
                    <div className="bigTitle forgetTitle">Forget Password</div>
                    <Card className="middleCard">
                        <Container className="dangerMsg alert alert-danger d-none flexDisplay bold"/>
                        <CardContent className="flexDisplay">
                            <div>
                                <div className="forgetEmail">
                                    <TextField
                                        id="email"
                                        label="Please enter your Email Address"
                                        type="email"
                                        variant="filled"
                                        error={(errorEmail !== "")}
                                        helperText={errorEmail}
                                        inputProps={{maxLength:40}}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <div>
                            <NavLink to="/sign-in" className="backLink">Back to LOGIN page.</NavLink>
                        </div>
                        <Button className="forgetBtn" variant="contained" 
                        onClick={handleForget} 
                        disabled={btn}>
                            Reset Password
                        </Button>
                    </Card>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword