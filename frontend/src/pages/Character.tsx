import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CharacterBadge from '../components/CharacterBadge';
import { useState } from 'react';

export default function Character() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, image } = location.state;

    const [messages, setMessages] = useState([
        { text: 'Hello!', sender: 'me' },
        { text: 'Hi!', sender: 'other' },
        // Add more messages here
    ]);

    function handleRecord() {
        // handle the recording
    }

    return (
        <div>
            <div className="v-layout p-10">
                <Icon icon="mdi:arrow-left" className="back-button" onClick={() => navigate(-1)} />
                <h1 className="text-center">Talk With...</h1>
                <CharacterBadge name={name} image={image} onClick={() => {}}/>
                <div className="chat-area">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <button className="record-btn" onClick={handleRecord}>Record</button>
            </div>
        </div>
    )
}