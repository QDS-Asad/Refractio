import React,{useState,useEffect} from "react";
import Auth from "./Auth";
import { Input,Checkbox,Button,Form } from "semantic-ui-react";

const Login = () => {
  let myStyle = {
    fontWeight : "bold" ,
    fontSize : 20,
    marginBottom : 10
  }

  const initialValues = {email:"",password:""};
  const[login,setLogin] =useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  

  // const handleClick = () =>{
  //   console.log("clicked");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(login));
    setIsSubmit(true);
  };

  const handleChange = (event) => {
    debugger;
    const { a, b } = event.target;
    setLogin({ ...login, [a]: b });
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(login);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email. Must include “@” and “.”";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6 || values.password.length > 10 ) {
      errors.password = "Invalid password. Password length should be min 8 symbols. Password should contain numbers, letters, special characters.";
    } 
    return errors;
  };

  return (
    <Auth>
      <div className="login-container">
        <div className="heading" style={myStyle} >Log In</div>
        <p className="paragraph">Enter your email address and password to access account</p>
        <Form onSubmit={handleSubmit}>
          
        <div className="login-label mb-10">Email Address</div>
        <div class="ui input">
          <div class="ui input">
            <Input placeholder="Enter your Email"
             value={login.email}
             onChange={handleChange}
             />
          </div>
          <p>{formErrors.email}</p>
        </div>
        
        <div className="login-label mt-norm mb-10">Password</div>
        <div>
        <div class="ui input">
            <Input placeholder="Enter your Password"
            value={login.password}
            onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
        </div>
        <div className="remember-me mb-10 mt-norm">
        <Checkbox label='Remember me' />
        </div>
        </Form>
        <Button
         className="btn"
        //  onClick={handleClick}
         >Login</Button>
      </div>
    </Auth>
  );
};

export default Login;
