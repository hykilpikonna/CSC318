import NavBar from "../components/NavBar"
import {getUsername, getLanguage, logout} from "../logic/sdk"
import {useNavigate} from "react-router-dom"
import {Icon} from "@iconify/react";
import React from "react";
import "./Profile.sass"

export default function Profile()
{

  const username = getUsername();
  const lang = getLanguage();
  const navigate = useNavigate();

  function handleLougout()
  {
    logout();
    console.log("Logged out");
    navigate('/')
  }

  return (
    <div className="v-layout page-pad non-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-2 p-2 rounded-full border-2 border-dashed border-gray-300 relative">
            <span className="text-2xl uppercase font-semibold text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{username[0]}</span>
          </div>
          <h2 className="text-4xl font-semibold">{username}</h2>
        </div>

        <div className="flex flex-col mb-4 text-gray-500">
          <div className="flex items-center gap-3">
            <Icon icon="fa-solid:clock" />
            <span>Joined November 2023</span>
          </div>

          <div className="flex items-center gap-3">
            <Icon icon="fa-solid:user-friends" />
            <span>0 Friends</span>
          </div>

          <div className="flex items-center gap-3">
            <Icon icon="fa-solid:language" />
            <span>{getLanguage().name}</span>
          </div>
        </div>
      </div>
      <hr className="mb-4"/>
      <h3 className="text-xl font-semibold mb-4">
        Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4 profile-stats">
        <div>
          <Icon icon="fa-solid:fire" className="text-red-400"/>
          <div>
            <div className="font-bold">0</div>
            <div>Day streak</div>
          </div>
        </div>

        <div>
          <Icon icon="ph:lightning-fill" className="text-yellow-400"/>
          <div>
            <div className="font-bold">10</div>
            <div>Total XP</div>
          </div>
        </div>

        <div>
          <Icon icon="fa-solid:check" className="text-green-400"/>
          <div>
            <div className="font-bold">0</div>
            <div>Courses</div>
          </div>
        </div>

        <div>
          <Icon icon="mdi:microphone-message" className="text-blue-400"/>
          <div>
            <div className="font-bold">0</div>
            <div>Speaking</div>
          </div>
        </div>
      </div>

      <NavBar/>
    </div>
  )

}
