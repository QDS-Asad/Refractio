import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Checkbox,
  Button,
  Form,
  Message,
  Container,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const loginOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid Email. Must include “@” and “.”',
      },
    },

    password: {
      required: 'Password is required',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message:
          'Invalid password. Password length should be min 8 symbols. Password should contain numbers, letters, special characters.',
      },
    },
  };

  useEffect(() => {
    register({ name: 'email' }, loginOptions.email);
    register({ name: 'password' }, loginOptions.password);
  }, []);

  return (
    <Container>
      <Header size='medium' className='primary-dark-color'>
        Log In
      </Header>
      <p className='mt-3 mb-4'>
        Enter your email address and password to access account.
      </p>
      <Form onSubmit={handleSubmit(handleLogin)} loading={loading} error>
        <Form.Field className='mb-3'>
          <label>Email Address</label>
          <Form.Input
            name='email'
            fluid
            placeholder='Enter your Email'
            onBlur={handleChange}
            error={!!errors.email}
          />
          {errors && errors.email && (
            <Message error content={errors.email.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <label className='d-inline-block'>Password</label>
          <Link className='float-end' to='/auth/password-recover'>
            Forget your password?
          </Link>
          <Form.Input
            name='password'
            type='password'
            fluid
            placeholder='Enter your Password'
            onBlur={handleChange}
            error={!!errors.password}
          />
          {errors && errors.password && (
            <Message error content={errors.password.message} />
          )}
        </Form.Field>
        <Form.Field>
          <Checkbox label='Remember me' />
        </Form.Field>
        <Button type='submit' fluid primary className='mt-3 btn'>
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
