import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../logic/sdk';

export default function Login() {
  
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")

    function submitLogin() {
        try {
            login(username, password)
            navigate('/courses')
        }
        catch (e: any) {
            console.log(e);
            setErr(e.message);
        }
    }

    return <div className='v-layout page-pad'>
        <h1>Login</h1>

        {err && <label className="text-red-600">{err}</label>}

        <div>
            <label>Username</label>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div>
            <label>Password</label>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>

        <button className='green' onClick={submitLogin}>Login</button>
        <button className='white' onClick={() => navigate(-1)}>Back</button>
    </div>

}
