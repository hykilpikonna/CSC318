import { useLocation, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { getLanguage, getUsername } from "../logic/sdk";
import {_Question, WrittenQuestion} from "../logic/CourseData";

export default function Review() {
    const navigate = useNavigate();
    const location = useLocation();

    const writtenReview = ["Question", "Vocabulary"];
    const verbalReview = ["Question", "Pronunciation"];

    const handleReviewLessonClick = (reviewType: string, lesson: string) => {
        const lessons: _Question[] = getLanguage().data.flatMap(chapter => chapter.steps).flatMap(step => step.questions);
        navigate('/lesson', { state: { questions: lessons.filter(it => it.type === `${reviewType}-${lesson}`), home: location.pathname } });
    }

    return (
        <div className="layout-v page-pad">
            <h1>Daily Review</h1>
            <h2>Written</h2>
            <div className="flex flex-col flex-1 mb-8 gap-3">
                {writtenReview.map(lesson => (
                    <button className="white" key={lesson}
                            onClick={() => handleReviewLessonClick("written", lesson.toLowerCase())}>
                        {lesson}
                    </button>
                ))}
            </div>
            <h2>Verbal/Listening</h2>
            <div className="flex flex-col flex-1 gap-3">
                {verbalReview.map(lesson => (
                    <button className="white" key={lesson}
                            onClick={() => handleReviewLessonClick("verbal", lesson.toLowerCase())}>
                        {lesson}
                    </button>
                ))}
            </div>
            <NavBar />
        </div>
    )
}
