import QuizCard from "../components/QuizCard";
import { QuizService } from "../services/QuizService"; 
import {useState, useEffect } from 'react' 
import {GetQuizzesResponse} from '../models/Quiz' 


const quizService = new QuizService(); 

export const Quizzes = () => {    
  const [quizzes, setQuizzes] = useState<GetQuizzesResponse[]>([]);  

  const getQuizzes = async () => {
    quizService.getQuizzes()
      .then((data) => { 
        setQuizzes(_=> [...data])
      })
    }

  useEffect(() => {
    getQuizzes()
    }, []) 


    return ( 
      <div> 
        <h1  className="f1  pt5  system serif tc " > Pick a quiz!  </h1>    
        { 
           quizzes.length > 0 && 
           quizzes.map( quiz => 
            <QuizCard 
                id = {quiz.id}
                name={quiz.title} 
                numberOfQuestions={quiz.questions_count} 
                key={quiz.id}
             />  
           ) 
        }
      </div>
       
    );
}
