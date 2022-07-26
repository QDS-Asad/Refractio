import React, { useEffect } from 'react';
import { Button, Form, Message, Container, Header } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  authRegisterSelector,
  registerUser,
} from '../../features/auth/authRegisterSlice';

const Register = () => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });

  // set up dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // fetch data from our store
  const { loading, error, userRegister } = useSelector(authRegisterSelector);

  const handleSignup = ({ firstName, lastName, email, password }) => {
    dispatch(registerUser(firstName, lastName, email, password));
  };

  const handleChange = (e) => {
    e.persist();
    if (e.target.type === 'checkbox') {
      setValue(e.target.name, e.target.checked);
      trigger(e.target.name);
    } else {
      setValue(e.target.name, e.target.value);
    }
  };

  const handleBlur = (e) => {
    trigger(e.target.name);
  };

  useEffect(() => {
    if (userRegister) {
      navigate('/auth/verify-code');
    }
  }, [userRegister]);

  const signupOptions = {
    firstName: {
      required: 'First Name is required',
      maxLength: {
        value: 50,
        message: 'First Name cannot be more than 50 characters.',
      },
    },
    lastName: {
      required: 'Last Name is required',
      maxLength: {
        value: 50,
        message: 'First Name cannot be more than 50 characters.',
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
    agreement: {
      required: 'Agreement is required',
    },
  };

  useEffect(() => {
    register({ name: 'firstName' }, signupOptions.firstName);
    register({ name: 'lastName' }, signupOptions.lastName);
    register({ name: 'email' }, signupOptions.email);
    register({ name: 'password' }, signupOptions.password);
    register({ name: 'agreement' }, signupOptions.agreement);
  }, []);

  return (
    <Container>
      <Header size='medium' className='primary-dark-color mb-4'>
        Sign Up
      </Header>
      {error && (
        <Message color='red' className='error-message mb-3'>
          {error}
        </Message>
      )}
      <Form onSubmit={handleSubmit(handleSignup)} loading={loading} error>
        <Form.Field className='mb-3'>
          <label>First Name </label>
          <Form.Input
            name='firstName'
            fluid
            placeholder='Enter your First Name'
            error={!!errors.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors && errors.firstName && (
            <Message error content={errors.firstName.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <label>Last Name </label>
          <Form.Input
            name='lastName'
            fluid
            placeholder='Enter your Last Name'
            error={!!errors.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors && errors.lastName && (
            <Message error content={errors.lastName.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <label>Email address </label>
          <Form.Input
            name='email'
            type='email'
            fluid
            placeholder='Enter your email'
            error={!!errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors && errors.email && (
            <Message error content={errors.email.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <label>Password</label>
          <Form.Input
            name='password'
            placeholder='Enter new password'
            type='password'
            error={!!errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors && errors.password && (
            <Message error content={errors.password.message} />
          )}
        </Form.Field>
        <Form.Field className='mb-3'>
          <Form.Checkbox
            name='agreement'
            error={!!errors.agreement}
            onBlur={handleChange}
            label={
              <label>
                I accept{' '}
                <Link to='/' className='primary-color ms-1'>
                  Terms and Conditions
                </Link>
              </label>
            }
          />
          {errors && errors.agreement && (
            <Message error content={errors.agreement.message} />
          )}
        </Form.Field>

        <Button type='submit' fluid primary className='mt-3 btn'>
          Sign Up
        </Button>
      </Form>
      <div className='backToLogin'>
        Already have account? <Link to='/auth/login'>Log In</Link>
      </div>
    </Container>
  );
};

export default Register;
