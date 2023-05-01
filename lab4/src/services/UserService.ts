import  { AxiosResponse } from "axios";
import AuthorizedApi,{SESSION_TOKEN} from "./AuthorizedApi";
import { BASE_URL } from "./baseApi";
import { GetUserResponse, LoginSignUpRequest, SignUpRequest } from "../models/User"; 
import { showErrorMessage, showSuccessMessage  } from "../utils/toast";

export class UserService extends AuthorizedApi {  
  
  public login = async (loginRequest:LoginSignUpRequest): Promise<void> => {  
    const instance = await this.getInstance();
    return instance 
      .get(BASE_URL + "v54/users")
      .then((response: AxiosResponse<any>) => { 
        const userList =   response.data as GetUserResponse[]; 
        const filteredUser = userList
                .filter( user => user.name === loginRequest.name 
                    &&  user.surname === loginRequest.surname ); 

            
        if (filteredUser.length === 1) 

        { 
          window.sessionStorage.setItem(SESSION_TOKEN, String(filteredUser[0].id))  
          showSuccessMessage("Logged In Succesfully!")
        } else { 
          window.sessionStorage.removeItem(SESSION_TOKEN);  
          showErrorMessage("Unsucceful Log In"); 
        }

      });
  }; 

  public signUp = async (signupRequest:SignUpRequest): Promise<boolean> => {  
    const instance = await this.getInstance();  
    let isSuccesful = false; 
    await instance 
      .post(BASE_URL + "v54/users", signupRequest)
      .then(_  => { 
        showSuccessMessage("You have been succesfully registered!");
        isSuccesful = true;
      })
      .catch( response=> showErrorMessage(response.response.data.message[0]))    

      return isSuccesful;
  };

}
