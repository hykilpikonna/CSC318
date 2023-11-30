import NavBar from "../components/NavBar"
import { getUsername, getLanguage, logout } from "../logic/sdk"
import { useNavigate } from "react-router-dom"

export default function Profile() {

    const username = getUsername();
    const navigate = useNavigate();

    function handleLougout() {
        logout();
        console.log("Logged out");
        navigate('/')
    }

    return (
        <div className="v-layout p-10">
            <div className="flex flex-col flex-1 h-full">
                <h1 className="text-center">Profile</h1>
                <h2 className="text-center">Username: {username}</h2>
                <h2 className="text-center">Currently Learning: {getLanguage(username)}</h2>
                <button className="red mt-auto mb-12" onClick={() => handleLougout()}>Logout</button>
            </div>
            <NavBar />
        </div>
    )

}