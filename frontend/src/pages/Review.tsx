import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { getLanguage, getUsername } from "../logic/sdk";

export default function Review() {
    const navigate = useNavigate();

    const writtenReview = ["Questions", "Vocabulary"];
    const verbalReview = ["Questions", "Pronunciation"];
    const language = getLanguage().name;

    const handleReviewLessonClick = (reviewType: string, lesson: string) => {
        type Question = { question: string, wordBank: string[], expected: string, type: string, exercise: string };
        let reviewQuestions: Question[] = [];
        if (language === "Japanese") {
            reviewQuestions = [
                {
                    question: 'Translate this sentence: 新幹線で東京に行きます。',
                    wordBank: ['Explore', 'Train', 'Will', 'City', 'I', 'Go', 'Bullet', 'To', 'Tokyo', 'By', 'Mountain'],
                    expected: 'I will go to Tokyo by bullet train.',
                    type: reviewType,
                    exercise: lesson
                  },
                  {
                    question: 'Translate this sentence: 空港で荷物を受け取ります。',
                    wordBank: ['Sunset', 'Will', 'Ocean', 'At', 'Adventure', 'Airport', 'The', 'I', 'Receive', 'Luggage'],
                    expected: 'I will receive luggage at the airport.',
                    type: reviewType,
                    exercise: lesson
                  },
                  {
                    question: 'Translate this sentence: ホテルでチェックインします。',
                    wordBank: ['Culture', 'At', 'Jungle', 'Will', 'The', 'Check-In', 'Hotel', 'I', 'Historic'],
                    expected: 'I will check in at the hotel.',
                    type: reviewType,
                    exercise: lesson
                  },
                  {
                    question: 'Translate this sentence: 観光名所を訪れます。',
                    wordBank: ['Desert', 'Mountain', 'Beach', 'Visit', 'Attractions', 'Tourist', 'I', 'Will'],
                    expected: 'I will visit tourist attractions.',
                    type: reviewType,
                    exercise: lesson
                  },
                  {
                    question: 'Translate this sentence: 美味しい地元の食べ物を試します。',
                    wordBank: ['Try', 'Market', 'Delicious', 'I', 'Food', 'Will', 'River', 'Local', 'Park'],
                    expected: 'I will try delicious local food.',
                    type: reviewType,
                    exercise: lesson
                  },
            ]
        }
        navigate('/lesson', { state: { questions: reviewQuestions } });
    }

    return (
        <div className="layout-v p-10">
            <h1>Review Page</h1>
            <h2>Written</h2>
            <div className="flex flex-col flex-1 mb-8 gap-3">
                {writtenReview.map(lesson => (
                    <button 
                        className="white" 
                        key={"written-" + lesson}
                        onClick={() => handleReviewLessonClick("written", lesson.toLowerCase())} 
                    >
                        {lesson}
                    </button>
                ))}
            </div>
            <h2>Verbal/Listening</h2>
            <div className="flex flex-col flex-1 gap-3">
                {verbalReview.map(lesson => (
                    <button
                        className="white" 
                        key={"verbal-listening-" + lesson}
                        onClick={() => handleReviewLessonClick("verbal-listening", lesson.toLowerCase())} 
                    >
                        {lesson}
                    </button>
                ))}
            </div>
            <NavBar />
        </div>
    )
}
