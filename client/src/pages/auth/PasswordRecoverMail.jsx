import React from 'react';
import { Input,
  Checkbox,
  Button,
  Form,
  Header,
  Container,
TextArea} from 'semantic-ui-react';
import Auth from './Auth';
import { Link,useNavigate } from 'react-router-dom';


const PasswordRecoverMail = () => {
  const navigate = useNavigate();
  const handleClick =() => {
    navigate('/login')
  } 
  
  return (

    <Auth>

        {/* <Header
         className='position-relative'
         as='h1'
         image='/mailSent.svg'/> */}
     
      
      <Container>
      <Header
            className='justify-content-md-center row'
            as='h2'
            image='/mailSent.svg'
            
          />
        
          <div  style={{display:'flex',justifyContent:'center'}}>
          <Header size='medium' class="text-center" className='primary-dark-color text-center '>
          Please check your Email
        </Header>
          <br/>
          
          </div>
      
      <p className='text-center'>A email has been send to your email @domain.com. <br/> Please check for an email 
      from company and click on the<br/> 
Please enter the code below<br/>included link to reset your password.</p>
      
        
        
          <Button type='submit' fluid primary onClick={handleClick}>
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