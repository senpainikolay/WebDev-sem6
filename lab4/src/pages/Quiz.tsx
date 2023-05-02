import { QuizService } from "../services/QuizService"; 
import {useState, useEffect } from 'react'  
import { useParams } from 'react-router-dom';
import {GetQuizResponse} from '../models/Quiz'  
import QuizForm from "../components/QuizFormComponent";  
import { useNavigate } from 'react-router-dom';
import Score from "../components/ScoreShowPrompt"


const quizService = new QuizService(); 
 
export const Quiz = () => {    
  const navigate = useNavigate();
  const { id } = useParams();    
  const quizId = Number(id);
  const [quiz, setQuizz] = useState<GetQuizResponse | undefined>();   
  const [notFoundQuiz, setNotFoundQuiz] = useState(false); 
  const [isScorePromptOpen, setScorePropmpOpen] = useState(false); 
  const [scoreMessage, setScoreMessage] = useState("");


  const getQuiz = async () => {
    quizService.getById(quizId)
      .then(value => setQuizz(value) ) 
      .catch(_ => {setQuizz(undefined); setNotFoundQuiz(true)} )
    }

  useEffect(() => {
    getQuiz()
    }, [])  


    const showScoreMessage = (score:string) => {  
      setScorePropmpOpen(true); 
      setScoreMessage(score);
    } 

    const handleClose = () => { 
      setScorePropmpOpen(false); 
      navigate("/quizzes") 
    };


    return ( 
      <div> 
        { quiz && <QuizForm id={quiz.id} name={quiz.title} questions={quiz.questions}   key={quiz.id} finalScoreCallback={showScoreMessage} /> } 
        { isScorePromptOpen &&  <Score message={scoreMessage} onClose={handleClose} /> } 
        { notFoundQuiz && <h1> Not existing quiz.</h1>}  
      </div>
       
    );
}
