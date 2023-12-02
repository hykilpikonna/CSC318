import { useState } from 'react';
import {VocabularyQuestion} from "../logic/CourseData";

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
        <div className='v-layout space-y-8 items-center w-full'>
            <h1>Vocabulary: Do you know this word?</h1>
            <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center mx-5'>
                {q.question}
            </div>
            <div className=' flex-col flex-wrap w-full'>
                {answered ? 
                    <div className='flex-col w-full'>
                        <h3>{q.pronunciation}</h3>
                        <p>{q.description}</p>
                        <p>{q.example}</p>
                        <div className='flex-row'>
                            <button className='green my-4' onClick={(e) => handleSubmit()}>I got it!</button>
                            <button className='red' onClick={(e) => handleSubmit()}>I forgot</button>
                        </div>
                    </div>
                    : 
                    <button className='white' onClick={(e) => handleSubmit()}>Show Meaning</button>
                }
            </div>
        </div>
    )}
