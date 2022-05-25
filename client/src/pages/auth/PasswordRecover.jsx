import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Header, Message, Form } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordRecover = () => {
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    trigger,
    getValues,
  } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const navigation = useNavigate();

  const handleRecover = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmited(true);
    }, 1500);
  };
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const handleBackToLogin = (e) => {
    navigation('/auth/login');
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
      {!submited ? (
        <>
          <Header size='medium' className='primary-dark-color'>
            Recover Password
          </Header>
          <p className='mt-3 mb-4'>
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <Form onSubmit={handleSubmit(handleRecover)} loading={loading} error>
            <Form.Field className='mb-3'>
              <label>Email address </label>
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
            A email has been send to your <strong>{getValues('email')}</strong>.{' '}
            <br /> Please check for an email from company and click on the
            included link to reset your password.
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
