import React,{useState} from 'react';
import Auth from './Auth';
import { Input,Button, Checkbox } from "semantic-ui-react";


const Register = () => {

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("")
  const [remember, setRemember] = useState(false);
  const [errEmail , setErrEmail] = useState("");
  const [errPassword , setErrPassword] = useState("");

  const handleClick = () =>{
    console.log("clicked");
  }
  
  return (
    <Auth>
      <div className="recover">
        <div className="title mb-title">Sign Up</div>
        {/* <p className="paragraph">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p> */}
        <div class="ui input flexx">
          <label className="label">First Name </label>
          <Input className="input-field" placeholder="Enter your Name" />
        </div>
        <div class="ui input flexx">
          <label className="label mt-norm">Email address </label>
          <Input className="input-field" placeholder="Enter your Email" />
        </div>
        <div class="ui input flexx">
          <label className="label mt-norm">Password</label>
          <Input className="input-field" placeholder="Enter your Password" />
        </div> 
        <div className="mt-norm">
          <Checkbox label='I accept' /><span> <a className="primary-color" href="#">Terms and Conditions</a></span>
        </div>

        <Button 
        className="btn"
        onClick={handleClick}
        >Reset Password</Button>
        <div className="backToLogin">
          {" "}
          back to{" "}
          <a className href="#">
            Log In
          </a>
        </div>
      </div>
    </Auth>
  );
};

export default Register;
