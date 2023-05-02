import { useNavigate } from 'react-router-dom';
import {useState} from 'react' 
import {Question} from '../models/Quiz' 
import { useEffect } from 'react';
import QuestionComponent from './QuestionComponent';
import { showErrorMessage, showSuccessMessage } from '../utils/toast'; 
import { QuizService } from "../services/QuizService"; 
import { SESSION_TOKEN } from '../services/AuthorizedApi'; 
import {SubmitQuestionResponse} from '../models/Quiz'


interface QuizProps { 
  id: number;
  name: string; 
  questions: Question[];    
  finalScoreCallback:(score:number, outScore:number) => void; 

} 

const  quizService = new QuizService(); 

const QuizForm = (props:QuizProps ) => {    
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Map<number, string>>(new Map());
    const [submitResponse, setSubmitResponse] = useState<SubmitQuestionResponse[]>([]);  
    const [errorHandler, setErrorHandler] = useState(true);
  
    const updateAnswerSelected = (questionId: number, answer: string) => {
      setAnswers((prevAnswers) => new Map(prevAnswers).set(questionId, answer));
    };

    const handleButtonClick = () => {  
       props.questions.length != answers.size ? showErrorMessage("Not all questions are selected!") : handleSuccesfulSubmit()
    };  

    
  useEffect(() => { 
    if(submitResponse.length === props.questions.length) {  
      const filteredResponses =  submitResponse.filter( sr => sr.correct === true )  
      props.finalScoreCallback(filteredResponses.length, props.questions.length )  
    }
  }, [submitResponse]);  

  useEffect(() => { 
    if (errorHandler === false) { 
    showErrorMessage("Some of the quiz's questions already submitted!");
    navigate("/quizzes")  
    } 
  }, [errorHandler]); 



    const  handleSuccesfulSubmit = () =>  {   
     const userId = Number(window.sessionStorage.getItem(SESSION_TOKEN));
      answers.forEach((value: string, key: number) => {
        errorHandler && 
         quizService
          .submit({data:{question_id:key,answer:value,user_id:userId}}, props.id)
          .then(newVal => setSubmitResponse( prevResponses => [...prevResponses, newVal]))
          .catch(() => { setErrorHandler(false); }) 
        }); 
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