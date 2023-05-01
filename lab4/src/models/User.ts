export interface GetUserResponse {
    name: string;
    surname: string;
    id: number;
  } 
  export interface LoginSignUpRequest {
    name:  string;
    surname: string ;
  }  

  export interface SignUpRequest {
    data:  LoginSignUpRequest; 
  } 
 
 
