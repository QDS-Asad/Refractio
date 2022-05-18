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

const VerificationCode = () => {
  const handleSubmit =() => {
    console.log("s")
  }
  return (

    <Auth>
      
      
      <Container>
      <p className='text-center'>Please Check you Email</p>
      <p className='text-center'>We sent the verification code to your <br/> email@domain.com.<br/> 
Please enter the code below</p>
      
        <Form onSubmit={handleSubmit}>
          {/* <Form.Field>
            <label>Email address</label>
            <input placeholder='Enter your email' />
          </Form.Field> */}
          <Form.Field>
            <label className='d-inline-block'>Verification code</label>
           
            <input placeholder='Verification code' />
          </Form.Field>
        
          <Button type='submit' fluid primary>
           Next
          </Button>
        </Form>
        <div className='backToLogin'>
          <Link to='/login'>Resend Code</Link>
        </div>
      </Container>
    </Auth>
  );
};

export default VerificationCode;