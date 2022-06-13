import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Header, Message, Form } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  authForgetPasswordSelector,
  userForgetPassword,
} from '../../features/auth/authForgetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';

const PasswordRecover = () => {
  const { register, setValue, watch, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });
  const navigate = useNavigate();
  // set up dispatch
  const dispatch = useDispatch();
  // fetch data from our store
  const { loading, error, forgetPassword } = useSelector(
    authForgetPasswordSelector
  );

  const handleRecover = ({ email }) => {
    dispatch(userForgetPassword(email));
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  const recoverOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid Email. Must include “@” and “.”',
      },
    },
  };

  useEffect(() => {
    register({ name: 'email' }, recoverOptions.email);
  }, []);

  return (
    <Container>
      {!forgetPassword ? (
        <>
          <Header size='medium' className='primary-dark-color'>
            Recover Password
          </Header>
          <p className='mt-3 mb-4'>
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <Form onSubmit={handleSubmit(handleRecover)} loading={loading} error>
            <Form.Field className='mb-3'>
              <label>Email address </label>
              <Form.Input
                name='email'
                fluid
                placeholder='Enter your Email'
                onBlur={handleChange}
                onChange={handleChange}
                error={!!errors.email}
              />
              {errors && errors.email && (
                <Message error content={errors.email.message} />
              )}
            </Form.Field>

            <Button type='submit' fluid primary className='mt-3 btn'>
              Reset Password
            </Button>

            <div className='backToLogin'>
              Back to
              <Link to='/auth/login' className='fw-bold ms-2'>
                Log In
              </Link>
            </div>
          </Form>
        </>
      ) : (
        <>
          <Header
            className='justify-content-md-center row'
            as='h1'
            image='/mailSent.svg'
          />
          <Header size='medium' className='primary-dark-color text-center'>
            Please check your Email
          </Header>
          <p className='text-center'>
            A email has been send to <strong>{watch('email')}</strong>. <br />{' '}
            Please check for an email from company and click on the included
            link to reset your password.
          </p>

          <Button
            type='submit'
            fluid
            primary
            onClick={handleBackToLogin}
            className='mt-3 btn'
          >
            Back to Login
          </Button>
        </>
      )}
    </Container>
  );
};

export default PasswordRecover;
