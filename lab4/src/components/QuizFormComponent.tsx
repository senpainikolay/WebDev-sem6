
import {useState} from 'react' 
import {Question} from '../models/Quiz'
import QuestionComponent from './QuestionComponent';

interface QuizProps { 
  id: number;
  name: string; 
  questions: Question[];  
}

const QuizForm = (props:QuizProps ) => {      
  return (
    <div className="mb3">
    <h2 className="f1 ma5 tc">{props.name}</h2>
    {
    props.questions.map(  question => (
      <QuestionComponent id={question.id} name={question.question} answers={question.answers} key={question.id} /> 
    ))
    }
  </div>
  );
};

export default QuizForm; 