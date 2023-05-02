import { QuizService } from "../services/QuizService"; 
import {useState, useEffect } from 'react'  
import { useParams } from 'react-router-dom';
import {GetQuizResponse} from '../models/Quiz'  
import QuizForm from "../components/QuizFormComponent";



const quizService = new QuizService(); 
 
export const Quiz = () => {  
  const { id } = useParams();    
  const quizId = Number(id);
  const [quiz, setQuizz] = useState<GetQuizResponse | undefined>();   
  const [notFoundQuiz, setNotFoundQuiz] = useState(false);

  const getQuiz = async () => {
    quizService.getById(quizId)
      .then(value => setQuizz(value) ) 
      .catch(_ => {setQuizz(undefined); setNotFoundQuiz(true)} )
    }

  useEffect(() => {
    getQuiz()
    }, []) 


    return ( 
      <div> 
        { quiz && <QuizForm id={quiz.id} name={quiz.title} questions={quiz.questions} key={quiz.id} /> }
        { notFoundQuiz && <h1> Not existing quiz.</h1>} 
      </div>
       
    );
}
