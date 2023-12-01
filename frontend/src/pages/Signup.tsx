import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {isLoggedIn, possibleLangs, signup} from '../logic/sdk';
import Progress from "../components/Progress";
import DuoWriting from "../assets/img/duo-writing.png";
import ChatBox from "../components/ChatBox";

export default function Signup() {
  
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("")

    const [stage, _setStage] = useState(0)
    const [lang, setLang] = useState(possibleLangs[0].name)

    function setStage(stage: number) {
        setErr("")
        _setStage(stage)
    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/courses");
        }
    }, []);

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
                signup(username, password, lang)
                navigate('/courses')
            }
        }
        catch (e: any) {
            console.log(e);
            setErr(e.message);
        }
    }

    return <div className="v-layout page-pad">
        <Progress percent={(stage + 1) * 33} back={() => {
            if (stage === 0) navigate(-1)
            else setStage(stage - 1)
        }}/>

        <div className="flex items-center">
            <img src={DuoWriting} alt="icon" className="max-w-[110px]"/>
            {/*<h1>Create an Account</h1>*/}
            <ChatBox msg={['Which language do you want to learn?', 'Great, now create a profile!'][stage]}/>
        </div>

        <div className='v-layout non-center'>

            {err && <label className="text-red-600">{err}</label>}

            {stage === 0 && <>
            {possibleLangs.map((lang, i) => <button className="white flex items-center gap-5" onClick={() => {setLang(lang.name); setStage(1);}} key={i}>
                <img src={lang.icon} alt={lang.name} className="max-w-[50px]"/>
                <span>{lang.name}</span>
            </button>)}
            </>}

            {stage === 1 && <>
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
                <button className='white' onClick={() => setStage(stage - 1)}>Back</button>
            </>}
        </div>
    </div>
}
