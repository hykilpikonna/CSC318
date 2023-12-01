import { useNavigate, useLocation } from "react-router-dom"
import { Icon } from '@iconify/react';
import "./FakeUserSelection.sass";
import { startHumanChat } from "../logic/sdk";

export default function FakeUserSelection() {

    const navigate = useNavigate();
    const location = useLocation();
    const { fakeUsers, interests } = location.state;

    const handleUserClick = (user: any) => {
        startHumanChat(interests, user.name, user.interests).then((sessionId) => {
            console.log(sessionId);
            navigate('/user-chat', { state: { user: user, sessionId: sessionId } });
        })
    }

    return (
        <div className="v-layout p-6">
            <Icon icon="mdi:arrow-left" className="back-button" onClick={() => navigate(-1)} />
            <div className="flex flex-col flex-1">
                <h1>Learning Partners</h1>
            </div>
            {fakeUsers.map((user: any, index: any) => (
                <div className="user-card" key={index} onClick={
                    () => handleUserClick(user)
                }>
                    <div>
                        <div className="w-20 h-20 mx-auto mb-2 p-2 rounded-full border-2 border-dashed border-gray-300 relative">
                            <span className="text-2xl uppercase font-semibold text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{user.name[0]}</span>
                        </div>
                        <h2>{user.name}</h2>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold ml-2">Interests</p>
                        <div className="user-interests">
                            {user.interests.map((interest: any, i: any) => (
                                <span className="user-interest" key={i}>{interest}</span>
                            ))}
                        </div>
                        </div>
                </div>
            ))}
        </div>
    )
}