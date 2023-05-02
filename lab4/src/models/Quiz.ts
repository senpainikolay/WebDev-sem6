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

 
 
