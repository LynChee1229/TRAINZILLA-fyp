import Header from './Header'
import React, {useState, useEffect} from "react"
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

function Login()
{
    const [key, setKey] = useState("")
    const [userPassword, setPassword] = useState("")
    const history = useHistory();

    useEffect(()=>{
        if(localStorage.getItem("user-info")) {
            history.push('/home');
        }
    }, []);

    async function login() 
    {
        if(key && userPassword) {
            let item = {key, userPassword};
            let result = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                },
                body: JSON.stringify(item)
            })

            result = await result.json();
            
            if(result.error) {
                $(".dangerMsg").removeClass("d-none");
                $(".dangerMsg").html(result.error);
            }
            else {
                localStorage.setItem("user-info", JSON.stringify(result));
                history.push("/home");
            }
        }
        else {
            $(".dangerMsg").removeClass("d-none");
            $(".dangerMsg").html("Please fill in all the fields!");
        }
    }

    return (
        <>
        <Header/>
        <div>
            <h1>Login Page</h1>

            {/* you need this dangerMsg for show error message */}
            <div className="dangerMsg alert alert-danger col-6 offset-3 d-none"></div>

            <input type="text" value={key} onChange={(e)=>setKey(e.target.value)}  placeholder="User Name / Email" required/> <br/><br/>
            <input type="password" value={userPassword} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" required/> <br/><br/>
            <button onClick={login} className="btn btn-primary">Sign In</button> <br/><br/>
        </div>
        </>
    )
}

export default Login