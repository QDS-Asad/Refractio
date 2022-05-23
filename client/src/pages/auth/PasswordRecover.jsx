import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Header, Message, Form } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordRecover = () => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/password-recover-success');
  };
  const handleRecover = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/password-recover-success');
    }, 1500);
  };
  const handleChange = (e) => {
    console.log('HELLO');
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
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
      <Header
        className='justify-content-md-center row'
        as='h2'
        image='/mailSent.svg'
      />
      <Header size='medium' className='primary-dark-color text-center '>
        Recover Password
      </Header>
      <p className='paragraph'>
        Enter your email address and we'll send you an email with instructions
        to reset your password.
      </p>
      <Form onSubmit={handleSubmit(handleRecover)} loading={loading} error>
        <Form.Field>
          <label className='label'>Email address </label>
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

        <Button type='submit' fluid primary onClick={handleClick}>
          Reset Password
        </Button>

        <div className='backToLogin'>
          Back to
          <Link to='/auth/login' className='fw-bold ms-2'>
            Log In
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default PasswordRecover;
