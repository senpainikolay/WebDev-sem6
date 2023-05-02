
import {useState} from 'react' 
import {Question} from '../models/Quiz'
import QuestionComponent from './QuestionComponent';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

interface QuizProps { 
  id: number;
  name: string; 
  questions: Question[];  
} 

const QuizForm = (props:QuizProps ) => {    
    const questionAnswerMap = new Map<number, string | undefined >();
    
    const updateAnswerSelected = (questionId:number, answer:string) => {
        questionAnswerMap.set(questionId, answer );  
      }; 

    const handleButtonClick = () => { 
       props.questions.length != questionAnswerMap.size ? showErrorMessage("Not all questions are selected!") : showSuccessMessage("Submitted") 
    }; 

    const handle = () => {  
    }


  return (
    <div className="mb3 tc">
    <h2 className="f1 ma5">{props.name}</h2>
    {
    props.questions.map(  question => 
      <QuestionComponent id={question.id} name={question.question} answers={question.answers} key={question.id} selectAnswerCallback={updateAnswerSelected} /> 
      )
    }  
     <button
      className="f4 w-20 grow pointer black bg-animate hover-bg-black hover-white  pa3  border-box " onClick={handleButtonClick}  >
      Submit
    </button> 
  </div>
  );
};

export default QuizForm; 