import { useState } from 'react';
import { getAIMarking, getLanguage } from '../logic/sdk';
import ClipLoader from "react-spinners/ClipLoader";
import { VideoQuestion } from "../logic/CourseData";

interface VideoQuestionProps {
  q: VideoQuestion;
  chapter: string;
  onSubmit: Function;
}

export default function VideoExercise({q, chapter, onSubmit}: VideoQuestionProps) {
  const language = getLanguage();
  const [userAnswer, setUserAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  }

  const handleSubmit = () => {
    if (answered) {
      setAnswered(false);
      onSubmit();
    } else {
      setLoading(true);
      getAIMarking(
        `Please watch the video and answer the question: "${q.question}".`,
        userAnswer.toLowerCase(),
        `${q.expected} (For the grader, here is the video description: ${q.description}. And please accept any reasonable answer in both English and ${language.name}).`,
        chapter,
        language.name
      ).then((res) => {
        setLoading(false);
        setAnswered(true);
        setCorrect(res.correct);
        setReason(res.reason);
      }).catch((e) => console.error(e));
    }
  }

  return (
    <div className='v-layout w-full h-full non-center'>
      <div className="box">
        {q.question}
      </div>
      <video src={q.clipUrl} controls className='video-player'></video>
      <div className="flex-1"></div>
      <div className='flex-col w-full'>
        {!answered ?
          <div className="v-layout">
            <input type="text" value={userAnswer} onChange={handleChange}
                   placeholder="Type your answer here"/>
            <button className='green' onClick={() => handleSubmit()}>
              {loading ? <ClipLoader color="white" loading={loading} /> : "Submit"}
            </button>
          </div> :
          <div className='flex flex-wrap w-full gap-5'>
            <div className="font-bold">{correct ? "Correct!" : "Incorrect"}</div>
            <div>{reason}</div>
            <button className='green w-full' onClick={() => handleSubmit()}>{!answered ? "Submit" : "Continue"}</button>
            {answered && !correct && <button className='red w-full' onClick={() => handleSubmit()}>I was right</button>}
          </div>
        }
      </div>
    </div>
  );
}
