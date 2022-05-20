import React from 'react';
import { Input,
  Checkbox,
  Button,
  Form,
  Header,
  Container,
TextArea} from 'semantic-ui-react';
import Auth from './Auth';
import { Link } from 'react-router-dom';

const PasswordRecoverMail = () => {
  
  return (

    <Auth>
     
      
      <Container>
      <p className='text-center'>Please Check you Email</p>
      <p className='text-center'>A email has been send to your email @domain.com. <br/> Please check for an email 
      from company and click on the<br/> 
Please enter the code below<br/>included link to reset your password.</p>
      
        
        
          <Button type='submit' fluid primary>
           Back to Login
          </Button>
      
        {/* <div className='backToLogin'>
          <Link to='/login'>Resend Code</Link>
        </div> */}
      </Container>
    </Auth>
  );
};

export default PasswordRecoverMail;