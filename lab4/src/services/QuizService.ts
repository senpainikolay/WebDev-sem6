import AuthorizedApi from "./AuthorizedApi";
import { BASE_URL } from "./baseApi";
import { GetQuizzesResponse,GetQuizResponse } from "../models/Quiz"; 

export class QuizService extends AuthorizedApi {  
  public getQuizzes = async (): Promise<GetQuizzesResponse[]> => {   
    const instance = await this.getInstance();  
     return instance 
      .get(BASE_URL + "v54/quizzes")
      .then(response => {  
       return response.data  as GetQuizzesResponse[];
       })
      .catch( error =>{ return Promise.reject(error)})     
  };  

  public getById = async (quizId: number): Promise<GetQuizResponse> => {
    const instance = await this.getInstance();
    return instance
      .get(BASE_URL + `v54/quizzes/${quizId}`)
      .then((response) => response.data as GetQuizResponse);     
  };


}
