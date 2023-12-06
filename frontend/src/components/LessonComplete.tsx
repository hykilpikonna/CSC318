import DuoSplash from "../assets/img/duo-splash.png";
import { useNavigate } from "react-router-dom";

interface LessonCompleteProps {
    home: string;
  }

export default function LessonComplete({ home } : LessonCompleteProps)
{
  const navigate = useNavigate();

  return <div className="flex flex-col justify-center">
    <div className="flex flex-col p-5 gap-5 items-center">
      <img src={DuoSplash} alt="Duolingo Logo"></img>

      <h1>Well done!</h1>

      <p className="white">
        Experience Gained: +100XP
      </p>
      <button className="green" onClick={() => navigate(home)}>
        Continue
      </button>
    </div>
  </div>
}
