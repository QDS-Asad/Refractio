import React,{useState} from "react";
import Auth from "./Auth";
import { Input,Button } from "semantic-ui-react";



const handleClick = () => {
  console.log("clicked");
}

const PasswordRecover = () => {
  const [email , setEmail] = useState("");
  const [errEmail , setErrEmail] = useState("");
  return (
    <Auth>
      <div className="recover">
        <div className="title">Recover Password</div>
        <p className="paragraph">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p>
        <div class="ui input flexx">
         
            <label className="label">Email address </label>
            <Input className="input-field" placeholder="Enter your Email" />
          
        </div>
        <Button
         className="btn"
         onClick={handleClick}
         >Reset Password</Button>
        <div className="backToLogin"> back to <a href="#">Log In</a></div>
      </div>
    </Auth>
  );
};

export default PasswordRecover;
