import NavBar from "../components/NavBar"
import {Icon} from "@iconify/react";
import {getLanguage, isLoggedIn, isStepCompleted} from "../logic/sdk";
import React from "react";
import "./Course.sass"

function CourseButton(props: {state: 'active' | 'locked' | 'completed', index: number})
{
  let cs = 'course-button ' + {active: 'green', locked: 'gray', completed: 'gold'}[props.state];

  const icon = {active: 'solar:star-bold', locked: 'solar:lock-bold', completed: 'mingcute:check-fill'}[props.state];

  // Parameters for the sin wave
  const amplitude = 50; // Change this value to adjust the wave's height
  const frequency = 1; // Change this value to adjust the wave's frequency

  // Calculate the horizontal translation
  const translateXValue = amplitude * Math.sin(props.index * frequency);

  return (
    <div className={cs} style={{transform: `translateX(${translateXValue}px)`}}>
      <Icon icon={icon}/>
    </div>
  )
}


export default function Course()
{
  if (!isLoggedIn())
  {
    window.location.href = '/login';
    return <div></div>;
  }

  // Get language
  const lang = getLanguage();

  return (
    <div className="v-layout page-pad non-center">
      <div className="flex items-center justify-between font-bold">
        <img src={lang.icon} alt={lang.name} className="max-w-[50px]"/>
        <div className="flex items-center text-red-500 text-lg gap-2">
          <Icon icon="bi:fire" className="text-xl"/>
          <span>1</span>
        </div>
      </div>

      {lang.data.map((chapter, i) => <>
        <div className="box green">
          <div>Chapter 1, Section 1</div>
          <div className="font-bold">{chapter.name}</div>
        </div>

        <div className="v-layout non-center items-center gap2">
          {chapter.steps.map((step, i) =>
            <CourseButton state={isStepCompleted(chapter.name, i) ? 'completed' : i == 0 || isStepCompleted(chapter.name, i - 1) ? 'active' : 'locked'}
                          index={i} key={i}/>)}
        </div>

        <NavBar/>
      </>)}
    </div>
  )

}
