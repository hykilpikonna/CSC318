import { useState } from 'react';

interface WrittenVocabularyProps {
  question: string;
  pronunciation: string;
  definition: string;
  example: string;
  onQuestionSubmit: Function;
}

export default function WrittenQuestionExercise({question, pronunciation, definition, example, onQuestionSubmit}: WrittenVocabularyProps) {
    const [answered, setAnswered] = useState(false);

    const handleSubmit = () => {
        if (answered) {
            setAnswered(false);
            onQuestionSubmit();
        } else {
            setAnswered(true);
        }

    }

    return (
        <div className='v-layout space-y-8 items-center w-full'>
            <h1>Recall Meaning</h1>
            <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center mx-5'>
                {question}
            </div>
            <div className=' flex-col flex-wrap w-full'>
                {answered ? 
                    <div className='flex-col w-full'>
                        <h3>{pronunciation}</h3>
                        <p>{definition}</p>
                        <p>{example}</p>
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
