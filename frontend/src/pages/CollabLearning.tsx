import NavBar from "../components/NavBar"
import React, { useState } from 'react';
import { generateFakeUsers } from '../logic/fakeUsers';
import { useNavigate } from 'react-router-dom';
import {getLanguage} from "../logic/sdk";

export default function CollabLearning() {

    const navigate = useNavigate();

    const [interests, setInterests] = useState<string[]>([]);
    const [newInterest, setNewInterest] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleDelete = (tagToDelete: any) => {
        setInterests(interests.filter(tag => tag !== tagToDelete));
    }

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newInterest && !interests.includes(newInterest)) {
                setInterests([...interests, newInterest]);
                setNewInterest('');
                setErrorMessage('');
            } else if (interests.includes(newInterest)) {
                setErrorMessage('You already entered this interest');
            }
        }
    }

    const handleMatchClick = () => {
        if (interests.length === 0) {
            setErrorMessage('Please enter at least one interest');
            return;
        }
        
        const fakeUsers = generateFakeUsers(interests)
        
        navigate('/fake-user-selection', { state: { fakeUsers: fakeUsers, interests: interests } });


    }

    return (
        <div className="v-layout p-6">
            <div className="flex flex-col flex-1">
                <h1>Chat</h1>
                <p className="subtext">Find people fluent in {getLanguage().name} to Chat!</p>
                <p className="subtext">Help them learn a language you know!</p>
                <p className="font-bold pt-10">Interests</p>
                <div className="tags">
                    {interests.length === 0 ? (
                        <p className="subtext">Enter a new interest below and press "Enter"!</p>
                    ) : (
                        interests.map((interest) => (
                            <div key={interest} className="tag">
                                {interest}
                                <span className="delete-tag" onClick={(e) => { e.stopPropagation(); handleDelete(interest); }}> X</span>
                            </div>
                        ))
                    )}
                </div>
                {errorMessage && <p className="text-red-600 font-bold mt-5">{errorMessage}</p>}
                <input className="mt-5" type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} onKeyDown={handleAddTag} placeholder="Enter your interest here!" />
                <button className="mt-5 green" onClick={() => handleMatchClick()}>Find Chat Partners!</button>
            </div>
            <NavBar />
        </div>
    )

}
