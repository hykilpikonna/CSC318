import ChatBoxBorder from '../assets/img/chatbox-border.svg';
import { useState } from 'react';
import { getAIMarking } from '../logic/sdk';

interface WrittenQuestionProps {
  question: string;
  wordBank: string[];
  expected: string;
  chapter: string;
  language: string;
  setCurrQuestion: Function;
}

export default function WrittenQuestionExercise({question, wordBank, expected, chapter, language}: WrittenQuestionProps) {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [remainingWords, setRemainingWords] = useState(wordBank);
    const lastPunctuation = question[question.length - 1];
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState("");
    const [reason, setReason] = useState("");

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
        getAIMarking(
            question,
            userAnswer,
            expected,
            chapter,
            language
        ).then((res) => {
            setAnswered(true);
            setCorrect(res.correct);
            setReason(res.reason);
        })
    }

    const ResponseSection = (correct: string | null, reason: string | null) => {
        if (!answered) {
            return (
                <div>
                    <div className=' flex-row flex-wrap border-b-4 w-full'>
                        {remainingWords.map((word, index) => (
                            <span 
                            key={index} 
                            className="border-gray-300 border-b-2 border-2 m-1 p-1 px-3 rounded-xl inline-block cursor-pointer"
                            onClick={(event) => handleWordBankClick(word)}>
                                {word}
                            </span>
                        ))}
                    </div>
                    <button className='green' onClick={(e) => handleSubmit()}>Submit</button>
                </div>

            )
        } else {
            return (
                <div>
                    <h3>{correct}</h3>
                    <p>{reason}</p>
                </div>
            )
        }
    }

    return (
        <div className='v-layout space-y-8 items-center w-full'>
            <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center mx-5'>
                {question}
            </div>
            <div className='flex-row flex-wrap border-b-4 w-full'>
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
            {/* <div className=' flex-row flex-wrap border-b-4 w-full'>
                {remainingWords.map((word, index) => (
                    <span 
                    key={index} 
                    className="border-gray-300 border-b-2 border-2 m-1 p-1 px-3 rounded-xl inline-block cursor-pointer"
                    onClick={(event) => handleWordBankClick(word)}>
                        {word}
                    </span>
                ))}
            </div>
            <button className='green' onClick={(e) => handleSubmit()}>Submit</button> */}
        </div>
    )}
