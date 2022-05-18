import React from 'react';
import Auth from './Auth';
import { Input, Button, Container } from 'semantic-ui-react';

let myStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: 10,
};

const NewPassword = () => {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <Auth>
      <Container>
        <div className='heading' style={myStyle}>
          Create New Password
        </div>
        <div className='login-label mb-10'>New Password</div>
        <div class='ui input'>
          <div class='ui input'>
            <Input placeholder='Enter your Email' />
          </div>
        </div>
        <div className='login-label mt-norm mb-10'>Confirm Password</div>
        <div>
          <div class='ui input'>
            <Input placeholder='Enter your Password' />
          </div>
        </div>
        {/* <div className="remember-me mb-10 mt-norm">
        <Checkbox label='Remember me' />
        </div> */}
        <Button className='btn' onClick={handleClick}>
          Reset Password
        </Button>
      </Container>
    </Auth>
  );
};

export default NewPassword;
