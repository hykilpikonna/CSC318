import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signup } from '../logic/sdk';
import { sign } from 'crypto';

export default function Signup() {
  
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("")

    function submitSignup() {
        try {
            if (password !== confirmPassword) {
                setErr("Passwords do not match")
                console.log(err)
                console.log(username)
                console.log(password)
                console.log(confirmPassword)
                return
            } else {
                signup(username, password)
                navigate('/courses')
            }
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
        <div>
            <label>Confirm Password</label>
            <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>

        <button className='green mt-5' onClick={submitSignup}>Signup</button>
        <button className='white' onClick={() => navigate(-1)}>Back</button>
    </div>
}
