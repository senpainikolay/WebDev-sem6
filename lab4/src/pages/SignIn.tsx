import { useNavigate, useLocation } from 'react-router-dom';
import SignInForm from "../components/SignInForm";
import useAuth from '../hooks/useAuth'; 
import { UserService } from '../services/UserService';
import { LoginRequest } from '../models/User';
import { SESSION_TOKEN } from '../services/AuthorizedApi';
import ErrorProne from '../components/ErrorProne';
import { useState } from 'react';

export const SignInAccount = () => { 

  const [loginError, setLoginError ] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const userService = new UserService(); 

  return (
    <div>
      <SignInForm submitCallback={async  (loginRequest: LoginRequest) => {
        await  userService.login(loginRequest);  
        if (Boolean(window.sessionStorage.getItem(SESSION_TOKEN)) === true) { 
          setAuth({ isLoggedIn: true }); 
          navigate("/", { replace: true }); 
        } else { 
          setLoginError(true);
        }
      }}  />  
      {loginError && <ErrorProne message='User Does Not Exist' onClose={ () => {  setLoginError(false);   } } ></ErrorProne> } 
    </div>
  );
} 
