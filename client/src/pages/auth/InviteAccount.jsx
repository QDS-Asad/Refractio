import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Container, Message } from 'semantic-ui-react';
import { logoutUser } from '../../features/auth/authLoginSlice';
import {
  authRegisterMemberSelector,
  memberRegistration,
  resetRegisterMember,
} from '../../features/auth/authRegisterMemberSlice';
import {
  authVerifyMemberSelector,
  memberVerification,
} from '../../features/auth/authVerifyMemberSlice';

const InviteAccount = () => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });
  const { token } = useParams();

  const { loading, error, verifyMember } = useSelector(
    authVerifyMemberSelector
  );

  const {
    loading: registorLoading,
    error: registerError,
    registerMember,
  } = useSelector(authRegisterMemberSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(memberRegistration(verifyMember.userId, data));
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
  };

  const handleBlur = (e) => {
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

    newPassword: {
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
        value === watch('newPassword') || 'Passwords are not identical ',
    },
  };

  useEffect(() => {
    register({ name: 'email' }, registerOptions.email);
    register({ name: 'fullName' }, registerOptions.fullName);
    register({ name: 'newPassword' }, registerOptions.newPassword);
    register({ name: 'confirmPassword' }, registerOptions.confirmPassword);
    dispatch(memberVerification(encodeURIComponent(token)));
  }, [token]);

  useEffect(() => {
    if (verifyMember) {
      setValue('email', verifyMember.email);
      trigger('email');
    }
  }, [verifyMember]);

  const handleBackToLogin = () => {
    navigate('/auth/login');
    dispatch(logoutUser());
    dispatch(resetRegisterMember());
  };

  return (
    <Container>
      {registerMember ? (
        <>
          <Header size='medium' className='primary-dark-color text-center'>
            {registerMember}
          </Header>
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
      ) : (
        <>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          {registerError && (
            <Message color='red' className='error-message mb-3'>
              {registerError}
            </Message>
          )}
          <Form
            onSubmit={handleSubmit(onSubmit)}
            loading={loading || registorLoading}
            error
          >
            <Form.Field className='mb-3'>
              <label>Email address</label>
              <Form.Input
                name='email'
                fluid
                placeholder='Enter your email'
                error={!!errors.email}
                value={watch('email')}
                readOnly
                className='disabled'
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
                onBlur={handleBlur}
                onChange={handleChange}
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
                name='newPassword'
                type='password'
                fluid
                placeholder='Enter password'
                error={!!errors.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors && errors.newPassword && (
                <Message error content={errors.newPassword.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Confirm Password</label>
              <Form.Input
                name='confirmPassword'
                type='password'
                fluid
                placeholder='Confirm password'
                error={!!errors.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors && errors.confirmPassword && (
                <Message error content={errors.confirmPassword.message} />
              )}
            </Form.Field>
            <Button type='submit' fluid primary className='mt-3 btn'>
              Sign Up
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default InviteAccount;
