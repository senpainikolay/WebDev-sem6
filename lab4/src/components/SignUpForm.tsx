import React, { useState } from "react";  
import { Link } from 'react-router-dom'

interface SignUpProps  { 
  submitCallback: (signUpRequest: any) => void;
};

const SignUpAccount: React.FC<SignUpProps> = (props) => {
  const  [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    props.submitCallback({data: {name: name, surname: surname}});
  };

  return (
    <div className="flex justify-center  items-center vh-100 h-100">
    <form className="measure center  pa5  shadow-5 " onSubmit={handleSubmit}>
      <fieldset className="ba b--transparent ph0 mh0 ">
        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
        <div className="mv3">
          <label className="db fw6 lh-copy f6" >
            Name
          </label>
          <input
            className="b pa2  ba bg-transparent  hover-black w-100"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value) }
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="Surname">
            Surname
          </label>
          <input
            className="b pa2  ba bg-transparent  hover-black w-100" 
            type="text"
            name="surname"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value) }
          />
        </div>
      </fieldset>
      <div className="">
        <button
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer  "
          type="submit"
        >
          Sign Up 
        </button>   
        <Link
        to="/signin"
        className="b  black ph5 pointer grow   "
         >
        Sign In
      </Link>
      </div>
    </form>
  </div>
);
};

export default SignUpAccount;