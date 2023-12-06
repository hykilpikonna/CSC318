import { useState } from 'react';
import {getAIMarking, getLanguage} from '../logic/sdk';
import ClipLoader from "react-spinners/ClipLoader";
import { Icon } from '@iconify/react';
import {VerbalQuestion} from "../logic/CourseData";

interface VerbalQuestionProps {
  q: VerbalQuestion
  chapter: string;
  onSubmit: Function;
}

export default function VerbalQuestionsExercise({q, chapter, onSubmit}: VerbalQuestionProps) {
    const language = getLanguage().name;
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [remainingWords, setRemainingWords] = useState(q.wordBank);
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleWordBankClick = (word: string) => {
        setSelectedWords([...selectedWords, word]);
        setRemainingWords(remainingWords.filter((w) => w !== word));
    }

    const handleSelectedWordClick = (word: string) => {
        setRemainingWords([...remainingWords, word]);
        setSelectedWords(selectedWords.filter((w) => w !== word));
    }

    const handleSubmit = () => {
        const userAnswer = selectedWords.join("");
        if (answered) {
            setAnswered(false);
            onSubmit();
        } else {
            setLoading(true);
            getAIMarking(
                q.question,
                userAnswer.toLowerCase(),
                q.expected.toLowerCase(),
                chapter,
                language
            ).then((res) => {
                setLoading(false);
                setAnswered(true);
                setCorrect(res.correct);
                setReason(res.reason);
            }).catch((e) => console.error(e));
        }

    }

  const ResponseSection = (correct: string | null, reason: string | null) => {
    if (!answered) {
      return (
        <div className='w-full h-36'>
          <div className=' flex-row flex-wrap w-full h-full'>
            {remainingWords.map((word, index) => (
              <span
                key={index}
                className="border-gray-300 border-2 m-1 p-1 px-3 rounded-xl inline-block cursor-pointer"
                onClick={() => handleWordBankClick(word)}>
                                {word}
                            </span>
            ))}
          </div>
          <button className='green' onClick={() => handleSubmit()}>
            {loading ? <ClipLoader
              color="white"
              loading={loading}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> : !answered ? "Submit" : "Continue"}
          </button>
        </div>

      )
    } else {
      return <div className='flex flex-wrap w-full gap-5'>
        <div className="font-bold">{correct ? "Correct!" : "Incorrect"}</div>
        <div>{reason}</div>
        <button className='green w-full' onClick={() => handleSubmit()}>{!answered ? "Submit" : "Continue"}</button>
        {answered && !correct && <button className='red w-full' onClick={() => handleSubmit()}>I was right</button>}
      </div>
    }
  }

    return (
        <div className='v-layout space-y-8 items-center w-full'>
            <h2>What do you hear?</h2>
            <audio src={q.url} controls className='audio-player'></audio>
            <div className='flex-row flex-wrap border-b-4 w-full h-32'>
                {selectedWords.map((word, index) => (
                    <span 
                        key={index}
                        className="border-gray-300 border-b-2 border-2 m-1 p-1 px-3 rounded-xl inline-block cursor-pointer"
                        onClick={(e) => handleSelectedWordClick(word)}>
                        {word}
                    </span>
                ))}
            </div>
            {ResponseSection(correct, reason)}
        </div>
    )}
