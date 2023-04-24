import  { AxiosResponse } from "axios";
import AuthorizedApi,{SESSION_TOKEN} from "./AuthorizedApi";
import { BASE_URL } from "./baseApi";
import { GetUserResponse, LoginRequest } from "../models/User";

export class UserService extends AuthorizedApi { 
  public login = async (loginRequest:LoginRequest): Promise<void> => {  
    const instance = await this.getInstance();
    return instance 
      .get(BASE_URL + "v54/users")
      .then((response: AxiosResponse<any>) => { 
        const userList =   response.data as GetUserResponse[]; 
        const filteredUser = userList
                .filter( user => user.name === loginRequest.name 
                    &&  user.surname === loginRequest.surname );
        filteredUser.length === 1
        ? window.sessionStorage.setItem(SESSION_TOKEN, String(filteredUser[0].id))
        :  window.sessionStorage.removeItem(SESSION_TOKEN)
      });
  };

}
