import {useLocation, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import WrittenQuestionExercise from "../components/WrittenQuestionExercise"
import WrittenVocabularyExercise from "../components/WrittenVocabularyExercise"
import VerbalQuestionsExercise from "../components/VerbalQuestionsExercise"
import Progress from '../components/Progress';
import VerbalPronunciationExercise from '../components/VerbalPronunciationExercise';
import LessonComplete from '../components/LessonComplete';
import {_Question, chapters_jp, Question} from "../logic/CourseData";
import VideoExercise from "../components/VideoExercise";

export default function Lesson()
{
  const location = useLocation();
  const navigate = useNavigate();
  const {questions, home} = location.state;
  const [currQuestion, setCurrQuestion] = useState<number>(0);

  console.log(questions)

  const handleNavigateBack = () =>
  {
    navigate(-1);
  };

  const onSubmit = () =>
  {
    setCurrQuestion(currQuestion + 1);
  }

  const renderQuestion = (currIndex: number) =>
  {
    if (currIndex >= questions.length) {
      return <LessonComplete home={home}/>;
    }
    const chapter = 'Ordering food';
    const question: Question = questions[currQuestion];
    switch (question.type)
    {
      case 'written-question':
        return <WrittenQuestionExercise key={currQuestion} q={question} chapter={chapter} onSubmit={onSubmit}/>;
      case 'written-vocabulary':
        return <WrittenVocabularyExercise key={currQuestion} q={question} onSubmit={onSubmit}/>;
      case 'verbal-question':
        return <VerbalQuestionsExercise key={currQuestion} q={question} chapter={chapter} onSubmit={onSubmit}/>;
      case 'verbal-pronunciation':
        return <VerbalPronunciationExercise key={currQuestion} q={question} chapter={chapter} onSubmit={onSubmit}/>;
      case 'video':
        return <VideoExercise key={currQuestion} q={question} chapter={chapter} onSubmit={onSubmit}/>;
      default:
        return null;
    }
  };

  return (
    <div className="v-layout page-pad non-center">
      <Progress percent={currQuestion / questions.length * 100} back={handleNavigateBack}/>
      <div className="p-5 h-full">
        {renderQuestion(currQuestion)}
      </div>
    </div>
  )
}
