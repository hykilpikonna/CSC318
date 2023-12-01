import { useLocation, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { getLanguage, getUsername } from "../logic/sdk";

export default function Review() {
    const navigate = useNavigate();
    const location = useLocation();

    const writtenReview = ["Questions", "Vocabulary"];
    const verbalReview = ["Questions", "Pronunciation"];
    const language = getLanguage(getUsername());

    const handleReviewLessonClick = (reviewType: string, lesson: string) => {
        type WrittenQuestion = { question: string, wordBank: string[], expected: string, type: string, exercise: string };
        type VocabularyQuestion = { question: string, pronunciation: string, definition: string, example: string, type: string, exercise: string };
        if (language === "Japanese") {
            if (reviewType === "written" && lesson === "questions") {
                let reviewQuestions: WrittenQuestion[] = [];
                reviewQuestions = [
                    {
                        question: 'Translate this sentence: 新幹線で東京に行きます.',
                        wordBank: ['Explore', 'Train', 'Will', 'City', 'I', 'Go', 'Bullet', 'To', 'Tokyo', 'By', 'Mountain'],
                        expected: 'I will go to Tokyo by bullet train.',
                        type: reviewType,
                        exercise: lesson
                      },
                      {
                        question: 'Translate this sentence: 空港で荷物を受け取ります.',
                        wordBank: ['Sunset', 'Will', 'Ocean', 'At', 'Adventure', 'Airport', 'The', 'I', 'Receive', 'Luggage'],
                        expected: 'I will receive luggage at the airport.',
                        type: reviewType,
                        exercise: lesson
                      },
                      {
                        question: 'Translate this sentence: ホテルでチェックインします.',
                        wordBank: ['Culture', 'At', 'Jungle', 'Will', 'The', 'Check-In', 'Hotel', 'I', 'Historic'],
                        expected: 'I will check in at the hotel.',
                        type: reviewType,
                        exercise: lesson
                      },
                      {
                        question: 'Translate this sentence: 観光名所を訪れます.',
                        wordBank: ['Desert', 'Mountain', 'Beach', 'Visit', 'Attractions', 'Tourist', 'I', 'Will'],
                        expected: 'I will visit tourist attractions.',
                        type: reviewType,
                        exercise: lesson
                      },
                      {
                        question: 'Translate this sentence: 美味しい地元の食べ物を試します.',
                        wordBank: ['Try', 'Market', 'Delicious', 'I', 'Food', 'Will', 'River', 'Local', 'Park'],
                        expected: 'I will try delicious local food.',
                        type: reviewType,
                        exercise: lesson
                      },
                ]
                navigate('/lesson', { state: { questions: reviewQuestions } });
            } else if (reviewType === "written" && lesson === "vocabulary") {
                let reviewQuestions: VocabularyQuestion[] = [];
                reviewQuestions = [
                    {
                        question: '飛行機',
                        pronunciation: 'ひこうき (Hikouki)',
                        definition: '飛行機 (Hikouki) is the Japanese word for airplane. It refers to a powered flying vehicle with fixed wings and a weight greater than that of the air it displaces.',
                        example: '飛行機で旅行します。 (I will travel by airplane.)',
                        type: 'written',
                        exercise: 'vocabulary',
                    },
                    {
                        question: '観光',
                        pronunciation: 'かんこう (Kankou)',
                        definition: '観光 (Kankou) is the Japanese word for sightseeing. It refers to the activity of visiting places of interest in a particular location, typically as part of a vacation.',
                        example: '観光地を訪れます。 (I will visit tourist attractions.)',
                        type: 'written',
                        exercise: 'vocabulary',
                    },
                    {
                        question: '予約',
                        pronunciation: 'よやく (Yoyaku)',
                        definition: '予約 (Yoyaku) is the Japanese word for reservation. It refers to an arrangement for a seat, room, etc. to be kept for a customer at a restaurant, hotel, or other place.',
                        example: 'ホテルを予約します。 (I will make a hotel reservation.)',
                        type: 'written',
                        exercise: 'vocabulary',
                    },
                ];
                navigate('/lesson', { state: { questions: reviewQuestions, home: location.pathname } });
            }
        }
    }

    return (
        <div className="layout-v p-10">
            <h1 className="text-center p-10">Review Page</h1>
            <h2 className="text-center">Written</h2>
            <div className="flex flex-col flex-1 mb-8">
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
            <h2 className="text-center">Verbal/Listening</h2>
            <div className="flex flex-col flex-1">
                {verbalReview.map(lesson => (
                    <button
                        className="white" 
                        key={"verbal" + lesson}
                        onClick={() => handleReviewLessonClick("verbal", lesson.toLowerCase())} 
                    >
                        {lesson}
                    </button>
                ))}
            </div>
            <NavBar />
        </div>
    )
}