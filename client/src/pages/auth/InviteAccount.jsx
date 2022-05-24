import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Header, Container, Message } from 'semantic-ui-react';

const InviteAccount = () => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
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

  const registerOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid Email. Must include “@” and “.”',
      },
    },

    fullName: {
      required: 'Full Name is required',
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: 'Invalid Full Name. Only letters are allowed.',
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

    confirmPassword: {
      required: 'Confirm password is required',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message:
          'Invalid password. Password length should be min 8 symbols. Password should contain numbers, letters, special characters.',
      },
      validate: (value) =>
        value === watch('password') || 'Passwords are not identical ',
    },
  };

  useEffect(() => {
    register({ name: 'email' }, registerOptions.email);
    register({ name: 'fullName' }, registerOptions.fullName);
    register({ name: 'password' }, registerOptions.password);
    register({ name: 'confirmPassword' }, registerOptions.confirmPassword);
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} loading={loading} error>
        <Form.Field className='mb-3'>
          <label>Email address</label>
          <Form.Input
            name='email'
            fluid
            placeholder='Enter your email'
            error={!!errors.email}
            onBlur={handleChange}
            readonly
          />
          {errors && errors.email && (
            <Message error content={errors.email.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <label>Full Name</label>
          <Form.Input
            name='fullName'
            fluid
            placeholder='Enter your name'
            error={!!errors.fullName}
            onBlur={handleChange}
          />
          {errors && errors.fullName && (
            <Message error content={errors.fullName.message} />
          )}
        </Form.Field>

        <Header size='medium' className='primary-dark-color mb-4'>
          Create Password
        </Header>
        <Form.Field className='mb-3'>
          <label>Password</label>
          <Form.Input
            name='password'
            fluid
            placeholder='Enter password'
            error={!!errors.password}
            onBlur={handleChange}
          />
          {errors && errors.password && (
            <Message error content={errors.password.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <label>Confirm Password</label>
          <Form.Input
            name='confirmPassword'
            fluid
            placeholder='Confirm password'
            error={!!errors.confirmPassword}
            onBlur={handleChange}
          />
          {errors && errors.confirmPassword && (
            <Message error content={errors.confirmPassword.message} />
          )}
        </Form.Field>
        <Button type='submit' fluid primary className='mt-3'>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default InviteAccount;
