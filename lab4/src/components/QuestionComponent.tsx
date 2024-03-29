
import {useState} from 'react'

interface QuestionProps { 
  id: number;
  name: string; 
  answers: string[];   
  selectAnswerCallback:(questionId:number, answer:string) => void
}

const QuestionComponent = (props:QuestionProps ) => {  
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(); 

    function handleSelectedAnswer(answer:string) {  
      setSelectedAnswer(answer); 
      props.selectAnswerCallback(props.id,answer);
    }
    
  return ( 
    <div className="flex justify-center ma5">
    <div className="bg-transparent shadow-2 w-50  pa3 tc">
    <h2 className="f4 mb2 mb5 tc">{props.name}</h2>
    { 
    props.answers.map((answer, idx) => (
       <div  key= {idx} className="inline-flex ma2">
       <label className="pointer black" >
         <input 
           type="radio"
           checked={selectedAnswer === answer}
           onChange={() => handleSelectedAnswer(answer)}
           className="mr2"
         />
         <span className="f5 black b">{answer}</span>
       </label>
     </div>
    ))}
  </div> 
  </div>
  );
};

export default QuestionComponent; 