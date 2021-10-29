import Header from './Header'
import React, {useEffect} from "react"
import { useHistory } from 'react-router-dom'

function Profile()
{
    useEffect(()=>{
        if(!localStorage.getItem("user-info")) {
            history.push('/login');
        }
    }, []);
    const history = useHistory();

    return (
        <>
        <Header/>
        <div>
            <h1>Profile Page</h1>
        </div>
        </>
    )
}

export default Profile