import { useState } from 'react';
import {getAIMarking, getLanguage} from '../logic/sdk';
import ClipLoader from "react-spinners/ClipLoader";
import {WrittenQuestion} from "../logic/CourseData";

interface WrittenQuestionProps {
  q: WrittenQuestion
  chapter: string;
  onSubmit: Function;
}

export default function WrittenQuestionExercise({q, chapter, onSubmit}: WrittenQuestionProps) {
    const language = getLanguage();
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
        // TODO: This space join isn't correct.
        // When the word bank is Japanese or Chinese, the words are not separated by spaces.
        // When the langauge is English, the words are separated by spaces.
        // We need to figure out how to handle this.
        const userAnswer = selectedWords.join(" ");
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
                language.name
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
            return (
                <div className=' flex-row flex-wrap border-b-4 w-full h-36'>
                    <h3>{correct}</h3>
                    <p>{reason}</p>
                    <button className='green w-full' onClick={() => handleSubmit()}>{!answered ? "Submit" : "Continue"}</button>
                </div>
            )
        }
    }

    return (
        <div className='v-layout space-y-8 items-center w-full'>
            <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center mx-5'>
                {q.question}
            </div>
            <div className='flex-row flex-wrap border-b-4 w-full h-36'>
                {selectedWords.map((word, index) => (
                    <span 
                        key={index}
                        className="border-gray-300 border-b-2 border-2 m-1 p-1 px-3 rounded-xl inline-block cursor-pointer"
                        onClick={() => handleSelectedWordClick(word)}>
                        {word}
                    </span>
                ))}
            </div>
            {ResponseSection(correct, reason)}
        </div>
    )}
