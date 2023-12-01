import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WrittenQuestionExercise from "../components/WrittenQuestionExercise"
import WrittenVocabularyExercise from "../components/WrittenVocabularyExercise"
import Progress from '../components/Progress';

export default function Course() {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions } = location.state;
    const [currQuestion, setCurrQuestion] = useState<number>(0);

    const handleNavigateBack = () => {
      navigate(-1);
    };

    const handleQuestionSubmit = () => {
        if (currQuestion < questions.length - 1) {
            setCurrQuestion(currQuestion + 1);
        } else {
            navigate("/review");
        }
  }

    const renderQuestion = (questionIndex: number) => {
      const question = questions[currQuestion];
        switch (question.type) {
          case 'written':
            switch (question.exercise) {
              case 'questions':
                return <WrittenQuestionExercise 
                      key={currQuestion}
                      question={question.question} 
                      wordBank={question.wordBank} 
                      expected={question.expected} 
                      chapter={"Travel"} 
                      language={"Japanese"} 
                      onQuestionSubmit={handleQuestionSubmit}
                      />;
              case 'vocabulary':
                return <WrittenVocabularyExercise 
                key={currQuestion}
                question={question.question}
                pronunciation={question.pronunciation}
                definition={question.definition}
                example={question.example}
                onQuestionSubmit={handleQuestionSubmit}
                />;
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
            <Progress percent={currQuestion / questions.length * 100} back={handleNavigateBack}/>
            <h1 className="text-center">Course Page</h1>
            <div className="flex flex-col flex-1 mb-8 items-center">
                {renderQuestion(currQuestion)}
            </div>
        </div>
    )
}