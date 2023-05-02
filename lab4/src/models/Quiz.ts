export interface GetQuizzesResponse { 
    id: number;
    title: string;
    questions_count: number;
  }   

  export interface GetQuizResponse { 
    id: number;
    title: string;
    questions: Question[]
  }  

  export interface Question { 
    id: number; 
    question: string; 
    answers: string[]; 
  } 


  export interface SubmitQuestion {
    question_id:  number;
    answer: string;
    user_id: number; 
  }  

  export interface SubmitQuestionRequest {
    data:  SubmitQuestion; 
  }  

  export interface SubmitQuestionResponse { 
    id: number; 
    correct_answer: string; 
    correct: boolean;
  } 
 

 
 
