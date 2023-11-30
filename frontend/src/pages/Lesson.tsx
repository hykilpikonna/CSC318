import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import WrittenQuestionExercise from "../components/WrittenQuestionExercise"

export default function Course() {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions } = location.state;
    const [currQuestion, setCurrQuestion] = useState(0);

    const renderLessonContent = () => {
      const {question, wordBank, expected, type, exercise} = questions[currQuestion];
        switch (type) {
          case 'written':
            switch (exercise) {
              case 'questions':
                return <WrittenQuestionExercise question={question} wordBank={wordBank} expected={expected} chapter={"Travel"} language={"Japanese"} setCurrQuestion={setCurrQuestion}/>;
            //   case 'vocabulary':
            //     return <WrittenVocabularyLesson />;
              default:
                return null;
            }
        //   case 'verbal-listening':
        //     switch (exercise) {
        //       case 'questions':
        //         return <VerbalQuestionsLesson />;
        //       case 'pronunciation':
        //         return <VerbalPronunciationLesson />;
        //       default:
        //         return null;
        //     }
        //   default:
        //     return null;
        }
      };
    
    return (
        <div className="v-layout p-10">
            <Icon icon="mdi:arrow-left" className="back-button" onClick={() => navigate(-1)} />
            <h1 className="text-center">Course Page</h1>
            <div className="flex flex-col flex-1 mb-8 items-center">
                {renderLessonContent()}
            </div>
        </div>
    )
}