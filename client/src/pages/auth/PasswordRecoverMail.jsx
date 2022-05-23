import React from 'react';
import { Button, Header, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const PasswordRecoverMail = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Header
        className='justify-content-md-center row'
        as='h2'
        image='/mailSent.svg'
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Header
          size='medium'
          class='text-center'
          className='primary-dark-color text-center '
        >
          Please check your Email
        </Header>
        <br />
      </div>

      <p className='text-center'>
        A email has been send to your email @domain.com. <br /> Please check for
        an email from company and click on the
        <br />
        Please enter the code below
        <br />
        included link to reset your password.
      </p>

      <Button type='submit' fluid primary onClick={handleClick}>
        Back to Login
      </Button>
    </Container>
  );
};

export default PasswordRecoverMail;
