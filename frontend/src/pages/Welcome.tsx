import DuoSplash from "../assets/img/duo-splash.png";
import { useNavigate } from "react-router-dom";

export default function Welcome()
{
  const navigate = useNavigate();

  return <div className="flex flex-col h-screen justify-center">
    <div className="flex flex-col p-5 gap-5 items-center">
      <img src={DuoSplash} alt="Duolingo Logo"></img>

      <h1>Duolingo Enhanced</h1>

      <button className="green" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="white" onClick={() => navigate("/signup")}>
        Signup
      </button>
    </div>
  </div>
}
