import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import {speechToText, getAIMarking, getLanguage} from '../logic/sdk';
import ClipLoader from "react-spinners/ClipLoader";
import {VerbalPronunciation} from "../logic/CourseData";

interface VerbalPronunciationProps {
    q: VerbalPronunciation;
    chapter: string;
    onSubmit: Function;
  }

export default function VerbalPronunciationExercise({q, chapter, onSubmit}: VerbalPronunciationProps) {
    const language = getLanguage().name;
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [correct, setCorrect] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        if (answered) {
            setAnswered(false);
            onSubmit();
        }
    }

    const [isRecording, setIsRecording] = useState(false);

    let chunks = [] as any;
    const mediaRecorder = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (e) => {
                chunks.push(e.data);
            }
    
            mediaRecorder.current.onstop = async (e) => {
                setIsRecording(false);
                setLoading(true);
                const blob = new Blob(chunks, { type: 'audio/wav' });
                chunks = [];
            
                const audioFile = new File([blob], "audio.wav", { type: 'audio/wav' });
            
                const text = await speechToText(audioFile);
                const aiMark = await getAIMarking(q.question, text.toLowerCase(), "", chapter, language);
                setAnswered(true);
                setCorrect(aiMark.correct);
                setReason(aiMark.reason);
            }
        });
    }, []);

    const handleRecord = useCallback(() => {
        if (!isRecording) {
            if (mediaRecorder.current) {
                mediaRecorder.current.start();
            }
            setIsRecording(true);
        } else {
            if (mediaRecorder.current) {
                mediaRecorder.current.stop();
            }
        }
    }, [isRecording]);

    const ResponseSection = (correct: string | null, reason: string | null) => {
        if (!answered) {
            return (
                <div className='flex backdrop:flex-row justify-center w-full'>
                    <Icon icon="mdi:microphone" className="microphone h-20 w-20 mx-auto"/>
                    <button className={`record-btn mx-auto ${isRecording ? 'red' : ''}`} onClick={handleRecord}>
                        {isRecording ? 'Stop Recording' 
                        : loading ?  
                        <ClipLoader
                            color="white"
                            loading={loading}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> : 
                        'Record'}
                    </button>
                </div>

            )
        } else {
            return (
                <div className=' flex-row flex-wrap w-full'>
                    <h3>{correct}</h3>
                    <p>{reason}</p>
                    <button className='record-btn w-full bottom-0 relative' onClick={(e) => handleSubmit()}>Continue</button>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="v-layout page-pad flex justify-center">
                <h1 className="text-center">Say the following</h1>
                <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center'>
                    {q.question}
                </div>
                {ResponseSection(correct, reason)}
            </div>
        </div>
    )
}
