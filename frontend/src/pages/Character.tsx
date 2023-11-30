import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CharacterBadge from '../components/CharacterBadge';
import { useState } from 'react';
import { speechToText, characterChatMessage, getAudio } from '../logic/sdk';

export default function Character() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, image , sessionId } = location.state;

    const [messages, setMessages] = useState([{}]);

    let chunks = [] as any;
    let mediaRecorder = null as any;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = (e: any) => {
            chunks.push(e.data)
        }

        mediaRecorder.onstop = (e: any) => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            chunks = [];
        
            const audioFile = new File([blob], "audio.wav", { type: 'audio/wav' });
        
            speechToText(audioFile).then((text) => {
                setMessages([...messages, { text: text, sender: 'me' }]);
                characterChatMessage(sessionId, text).then((response) => {
                    const { msg, audio_id } = response
                    getAudio(audio_id).then((audioBlob) => {
                        const audioFile = new File([audioBlob], "audio.wav", { type: 'audio/wav' });
                        const audioUrl = URL.createObjectURL(audioFile);
                        const audio = new Audio(audioUrl);
                        audio.play();
                    });
                    setMessages(prevMessages => [...prevMessages, { text: msg, sender: 'other' }]); 
                })
            });
        }
    })

    function handleRecord() {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
            mediaRecorder.start();
            console.log("Recording...");
        } else if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            console.log("Stopped recording.");
        }
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