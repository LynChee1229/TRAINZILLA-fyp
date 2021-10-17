import Header from './Header'
import React, {useState, useEffect} from "react"
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

function Register()
{
    useEffect(()=>{
        if(localStorage.getItem("user-info")) {
            history.push('/home');
        }
    }, []);

    const [userName, setName] = useState("")
    const [userEmail, setEmail] = useState("")
    const [userContact, setContact] = useState("")
    const [userDOB, setDOB] = useState("")
    const [userPassword, setPassword] = useState("")
    const [confirmPassword, setConfirm] = useState("")
    const history = useHistory();

    function validation()
    {
        if(userName && userEmail && userContact && userDOB && userPassword && confirmPassword) {
            if(userPassword === confirmPassword) {
                signUp();
            }
            else {
                $(".dangerMsg").removeClass("d-none");
                $(".dangerMsg").html("Passwords are not matched!");
            }
        }
        else {
            $(".dangerMsg").removeClass("d-none");
            $(".dangerMsg").html("Please fill in all the fields!");
        }
    }

    async function signUp()
    {
        let item = {userName, userEmail, userContact, userDOB, userPassword};
        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });

        result = await result.json();

        var err = "";
        if(result.name) {
            err = err.concat("[Username]");
        }
        if(result.email) {
            err = err.concat(" [Email]");
        }
        if(result.contact) {
            err = err.concat(" [Contact]");
        }

        if(err !== "") {
            $(".dangerMsg").removeClass("d-none");
            $(".dangerMsg").html(err+" is existing. Please try again.");
        }
        else if(result.exception) {
            $(".dangerMsg").removeClass("d-none");
            $(".dangerMsg").html("Sorry, an unexpected error occurred. Please contact the development team.");
        }
        else {
            localStorage.setItem("user-info", JSON.stringify(result));
            history.push("/home");
        }

    }

    return (

        // pay attention on the data type of input fields (especially the DOB)

        <>
        <Header/>
        <div>
            <h1>Register Page</h1>

            {/* you need this dangerMsg for show error message */}
            <div className="dangerMsg alert alert-danger col-6 offset-3 d-none"></div>

            <input type="text" value={userName} onChange={(e)=>setName(e.target.value)} placeholder="Name" /> <br/><br/>
            <input type="text" value={userEmail} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" /> <br/><br/>
            <input type="text" value={userContact} onChange={(e)=>setContact(e.target.value)} placeholder="Contact" /> <br/><br/>
            <input type="text" value={userDOB} onChange={(e)=>setDOB(e.target.value)} placeholder="DOB" /> <br/><br/>
            <input type="password" value={userPassword} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /> <br/><br/>
            <input type="password" value={confirmPassword} onChange={(e)=>setConfirm(e.target.value)} placeholder="Confirm Password" /> <br/><br/>
            <button onClick={validation} className="btn btn-primary">Sign Up</button> <br/><br/>
        </div>
        </>
    )
}

export default Register