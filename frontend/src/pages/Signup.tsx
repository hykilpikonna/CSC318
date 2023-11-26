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

    return (
        <div className='flex flex-col h-screen items-center p-5 gap-5 justify-evenly'>
            <h1>Login</h1>
            <form className='flex flex-col gap-5 w-screen p-5'>
                <div className='flex flex-col justify-evenly'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>  
                <div className='flex flex-col justify-evenly'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className='flex flex-col justify-evenly'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                {/* error message */}
                <div className='flex flex-col justify-evenly'>
                    <label className="block text-red-600 text-sm font-bold mb-2">
                        {err}
                    </label>
                </div>
            </form>
            <div className='flex flex-col w-screen p-5 gap-2'>
                <button className='green' onClick={submitSignup}>Signup</button>
                <button className='white' onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )

}