import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CharacterBadge from '../components/CharacterBadge';
import { useState, useEffect, useRef, useCallback } from 'react';
import { speechToText, characterChatMessage, getAudio } from '../logic/sdk';

export default function Character() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, image , sessionId } = location.state;

    type Message = { text: string, sender: string };
    const [messages, setMessages] = useState<Message[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    let chunks = [] as any;
    const mediaRecorder = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (e) => {
                chunks.push(e.data);
            }
    
            mediaRecorder.current.onstop = async (e) => {
                setIsRecording(false);
                const blob = new Blob(chunks, { type: 'audio/wav' });
                chunks = [];
            
                const audioFile = new File([blob], "audio.wav", { type: 'audio/wav' });
            
                const text = await speechToText(audioFile);
                const response = await characterChatMessage(sessionId, text);
                const { msg, audio_id } = response;
                const audioBlob = await getAudio(audio_id);
                const audioFileResponse = new File([audioBlob], "audio.wav", { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioFileResponse);
                const audio = new Audio(audioUrl);
                audio.play();
                setMessages(prevMessages => [...prevMessages, { text: text, sender: 'me' }, { text: msg, sender: 'other' }]); 
            }
        });
    }, []);

    const handleRecord = useCallback(() => {
        if (!isRecording) {
            if (mediaRecorder.current) {
                mediaRecorder.current.start();
            }
            setIsRecording(true);
        } else {
            if (mediaRecorder.current) {
                mediaRecorder.current.stop();
            }
        }
    }, [isRecording]);

    return (
        <div>
            <div className="v-layout p-10">
                <Icon icon="mdi:arrow-left" className="back-button" onClick={() => navigate(-1)} />
                <h1 className="text-center">Talk With...</h1>
                <CharacterBadge name={name} image={image} onClick={() => {}}/>
                <div className="chat-area">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-400">Please record a message to start the conversation.</p>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                <p>{message.text}</p>
                            </div>
                        ))
                    )}
                </div>
                <button className={`record-btn ${isRecording ? 'red' : ''}`} onClick={handleRecord}>
                    {isRecording ? 'Stop Recording' : 'Record'}
                </button>
            </div>
        </div>
    )
}