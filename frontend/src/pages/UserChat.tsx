import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';
import { humanChatMessage } from '../logic/sdk';

export default function Character() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, sessionId } = location.state;

    type Message = { text: string, sender: string };
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');

    const messageEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleSendClick = () => {
        if (message !== '') {
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'me' }]);
            setMessage('');
            humanChatMessage(sessionId, message).then((response) => {
                setMessages(prevMessages => [...prevMessages, { text: response.msg, sender: 'other' }]);
            })
        }

    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-y-auto p-6">
                <div className="top-part">
                    <Icon icon="mdi:arrow-left" className="back-button" onClick={() => navigate(-1)} />
                    <div>
                        <div className="w-40 h-40 mx-auto mb-2 p-4 rounded-full border-2 border-dashed border-gray-300 relative">
                            <span className="text-4xl uppercase font-semibold text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{user.name[0]}</span>
                        </div>
                        <h2 className='font-bold'>{user.name}</h2>
                    </div>
                </div>
                <div className="chat-area">
                    {messages.length === 0 ? (
                        <p className='subtext'>Say hi to your chat partner and introduce yourself!</p>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                <p>{message.text}</p>
                            </div>
                        ))
                    )}
                    <div ref={messageEndRef} />
                </div>
            </div>
            <div className="flex justify-between p-3 bg-white">
                <input
                    className='flex-1 mr-3'
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type a message...'
                />
                <button className="w-auto" onClick={handleSendClick}>
                    <Icon icon="mdi:send" />
                </button>
            </div>
        </div>
    )
}