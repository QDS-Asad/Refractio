import React, { useState } from 'react';
import Auth from './Auth';
import { Input, Button, Checkbox, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <Auth>
      <Container>
        <div className='title mb-title'>Sign Up</div>
        {/* <p className="paragraph">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p> */}
        <div class='ui input flexx'>
          <label className='label'>First Name </label>
          <Input className='input-field' placeholder='Enter your Name' />
        </div>
        <div class='ui input flexx'>
          <label className='label mt-norm'>Email address </label>
          <Input className='input-field' placeholder='Enter your Email' />
        </div>
        <div class='ui input flexx'>
          <label className='label mt-norm'>Password</label>
          <Input className='input-field' placeholder='Enter your Password' />
        </div>
        <div className='mt-norm'>
          <Checkbox label='I accept' />
          <span>
            {' '}
            <Link to='/' className='primary-color'>
              Terms and Conditions
            </Link>
          </span>
        </div>

        <Button className='btn' onClick={handleClick}>
          Reset Password
        </Button>
        <div className='backToLogin'>
          back to <Link to='/login'>Log In</Link>
        </div>
      </Container>
    </Auth>
  );
};

export default Register;
