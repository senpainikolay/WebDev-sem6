import { useNavigate, useLocation } from 'react-router-dom';
import SignUpForm from "../components/SignUpForm";
import { UserService } from '../services/UserService';
import {  SignUpRequest } from '../models/User';

export const SignUpAccount = () => { 
  const navigate = useNavigate();
  const userService = new UserService(); 

  return (
    <div>
      <SignUpForm 
      submitCallback={
      async  (signUpRequest: SignUpRequest) => {  
      const sucessfulRegistered = await  userService.signUp(signUpRequest);     
      sucessfulRegistered && navigate("/signin")
      }}  
      />  
    </div>
  );
} 
