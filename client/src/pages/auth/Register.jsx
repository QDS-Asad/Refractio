import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Button,
  Form,
  Message,
  Container,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);
  const handleSinUp = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    console.log('saad');
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const signupOptions = {
    fullName: {
      required: 'Full Name is required',
      pattern: {
        value:  /^[a-zA-Z]+ [a-zA-Z]+$/,
        message: 'Invalid Full Name. Only letters are allowed.',
      },
    },
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
    register({ name: 'fullName' }, signupOptions.fullName);
    register({ name: 'email' }, signupOptions.email);
    register({ name: 'password' }, signupOptions.password);
  }, []);

  return (
    <Container>
      <Header size='medium' className='primary-dark-color'>
        Sign Up
      </Header>
      <Form onSubmit={handleSubmit(handleSinUp)} loading={loading} error>
        <Form.Field>
          <label className='label'>Full Name </label>
          <Form.Input
            name='fullName'
            fluid
            placeholder='Enter your Name'
            error={!!errors.fullName}
            onBlur={handleChange}
          />
          {errors && errors.fullName && (
            <Message error content={errors.fullName.message} />
          )}
        </Form.Field>
        <Form.Field>
          <label className='label mt-norm'>Email address </label>
          <Form.Input
            name='email'
            type='email'
            fluid
            placeholder='Enter your email'
            error={!!errors.email}
            onBlur={handleChange}
          />
          {errors && errors.email && (
            <Message error content={errors.email.message} />
          )}
        </Form.Field>
        <Form.Field>
          <label className='label mt-norm'>Password</label>
          <Form.Input
            name='password'
            className='input-field'
            placeholder='Enter your password'
            type='password'
            error={!!errors.password}
            onBlur={handleChange}
          />
          {errors && errors.password && (
            <Message error content={errors.password.message} />
          )}
        </Form.Field>
        <Form.Field>
          <Checkbox label='I accept ' />
          <span>
            <Link to='/' className='primary-color ms-1'>
              Terms and Conditions
            </Link>
          </span>
        </Form.Field>

        <Button type='submit' fluid primary>
          Reset Password
        </Button>
      </Form>
      <div className='backToLogin'>
        Already have account? <Link to='/login'>Log In</Link>
      </div>
    </Container>
  );
};

export default Register;
