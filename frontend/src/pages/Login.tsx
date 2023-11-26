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
                {/* error message */}
                <div className='flex flex-col justify-evenly'>
                    <label className="block text-red-600 text-sm font-bold mb-2">
                        {err}
                    </label>
                </div>
            </form>
            <div className='flex flex-col w-screen p-5 gap-2'>
                <button className='green' onClick={submitLogin}>Login</button>
                <button className='white' onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )

}