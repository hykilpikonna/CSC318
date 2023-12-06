import { useState } from 'react';
import {VocabularyQuestion} from "../logic/CourseData";
import {Icon} from "@iconify/react";

interface WrittenVocabularyProps {
  q: VocabularyQuestion
  onSubmit: Function;
}

export default function WrittenQuestionExercise({q, onSubmit}: WrittenVocabularyProps) {
    const [answered, setAnswered] = useState(false);

    const handleSubmit = () => {
        if (answered) {
            setAnswered(false);
            onSubmit();
        } else {
            setAnswered(true);
        }
    }

    return (
        <div className='v-layout gap-5 h-full'>
            <div className="font-bold">Recall the following word</div>
            <div className='box text-center'>
                {q.question}
            </div>
            <div className="flex-1 flex justify-center items-center w-full">
              {answered &&
                  <div className='flex flex-col gap-3 w-full'>
                      <div className="font-bold">{q.pronunciation}</div>
                      <div>{q.description}</div>
                      <div className="text-yellow-600 flex items-center gap-3"><Icon icon="fa:star"/>{q.example}</div>
                  </div>
              }
            </div>
            <div className="mb-5">
                {answered ?
                    <>
                      <button className='green my-4' onClick={(e) => handleSubmit()}>I got it!</button>
                      <button className='red' onClick={(e) => handleSubmit()}>I forgot</button>
                    </> :
                    <>
                      <div className="text-gray-400 text-sm mb-5">Please click "show meaning" after you have tried to recall the meaning of the word</div>
                      <button className='white' onClick={(e) => handleSubmit()}>Show Meaning</button>
                    </>
                }
            </div>
        </div>
    )}
