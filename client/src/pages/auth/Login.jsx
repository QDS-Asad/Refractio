import React, { useState } from 'react';
import Auth from './Auth';
import {
  Input,
  Checkbox,
  Button,
  Form,
  Header,
  Container,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const handleClick = () => {
    console.log('clicked');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Auth>
      <Container>
        <Header size='medium' className='primary-dark-color'>
          Log In
        </Header>
        <p className='mt-3 mb-5'>
          Enter your email address and password to access account.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Email address</label>
            <input placeholder='Enter your email' />
          </Form.Field>
          <Form.Field>
            <label className='d-inline-block'>Password</label>
            <Link className='float-end' to='/password-recover'>
              Forget your password?
            </Link>
            <input placeholder='Enter your password' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Remember me' />
          </Form.Field>
          <Button type='submit' fluid primary>
            Log In
          </Button>
        </Form>
      </Container>
    </Auth>
  );
};

export default Login;
