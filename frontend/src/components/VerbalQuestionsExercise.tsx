import { useState } from 'react';
import { getAIMarking } from '../logic/sdk';
import ClipLoader from "react-spinners/ClipLoader";
import { Icon } from '@iconify/react';

interface VerbalQuestionProps {
  question: string;
  wordBank: string[];
  expected: string;
  chapter: string;
  language: string;
  onQuestionSubmit: Function;
}

export default function VerbalQuestionsExercise({question, wordBank, expected, chapter, language, onQuestionSubmit}: VerbalQuestionProps) {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [remainingWords, setRemainingWords] = useState(wordBank);
    const lastPunctuation = question[question.length - 1];
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setListening] = useState(false);

    const handleWordBankClick = (word: string) => {
        setSelectedWords([...selectedWords, word]);
        setRemainingWords(remainingWords.filter((w) => w !== word));
    }

    const handleSelectedWordClick = (word: string) => {
        setRemainingWords([...remainingWords, word]);
        setSelectedWords(selectedWords.filter((w) => w !== word));
    }

    const handleSubmit = () => {
        const userAnswer = selectedWords.join(" ") + lastPunctuation;
        if (answered) {
            setAnswered(false);
            onQuestionSubmit();
        } else {
            setLoading(true);
            getAIMarking(
                question,
                userAnswer.toLowerCase(),
                expected.toLowerCase(),
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
                            onClick={(event) => handleWordBankClick(word)}>
                                {word}
                            </span>
                        ))}
                    </div>
                    <button className='green' onClick={(e) => handleSubmit()}>
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
                    <button className='green w-full' onClick={(e) => handleSubmit()}>{!answered ? "Submit" : "Continue"}</button>
                </div>
            )
        }
    }

    const  handleListenToQuestion = () => {
        // TODO: Play static file that holds the audio for the current
        console.log("Heard you");
    }

    return (
        <div className='v-layout space-y-8 items-center w-full'>
            <h1>What do you hear?</h1>
            <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center mx-5'>
                <Icon icon="mdi:volume-high" className="volume-high h-16 w-16" onClick={handleListenToQuestion} />
            </div>
            <div className='flex-row flex-wrap border-b-4 w-full h-36'>
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
