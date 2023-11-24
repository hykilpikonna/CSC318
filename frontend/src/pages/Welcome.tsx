import DuoSplash from "../assets/img/duo-splash.png";

export default function Welcome()
{
  return <div className="flex flex-col h-screen justify-center">
    <div className="flex flex-col p-5 gap-5 items-center">
      <img src={DuoSplash} alt="Duolingo Logo"></img>

      <h1>Duolingo Enhanced</h1>

      <button className="green">Login</button>
      <button className="white">Signup</button>
    </div>
  </div>
}
