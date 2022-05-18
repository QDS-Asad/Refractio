import React,{useState} from "react";
import Auth from "./Auth";
import { Input,Checkbox,Button } from "semantic-ui-react";

const Login = () => {
  let myStyle = {
    fontWeight : "bold" ,
    fontSize : 20,
    marginBottom : 10
  }

  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("")
  const [remember, setRemember] = useState(false);

  const handleClick = () =>{
    console.log("clicked");
  }

  return (
    <Auth>
      <div className="login-container">
        <div className="heading" style={myStyle} >Log In</div>
        <p className="paragraph">Enter your email address and password to access account</p>
        <div className="login-label mb-10">Email Address</div>
        <div class="ui input">
          <div class="ui input">
            <Input placeholder="Enter your Email"/>
          </div>
        </div>
        <div className="login-label mt-norm mb-10">Password</div>
        <div>
        <div class="ui input">
            <Input placeholder="Enter your Password" />
          </div>
        </div>
        <div className="remember-me mb-10 mt-norm">
        <Checkbox label='Remember me' />
        </div>
        <Button
         className="btn"
         onClick={handleClick}
         >Login</Button>
      </div>
    </Auth>
  );
};

export default Login;
