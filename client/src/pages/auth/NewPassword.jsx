import React, { useEffect } from 'react';
import { Button, Form, Message, Container, Header } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  authNewPasswordSelector,
  reset,
  userNewPassword,
} from '../../features/auth/authNewPasswordSlice';

const NewPassword = () => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
  });

  const { token } = useParams();

  const navigate = useNavigate();

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, newPassword } = useSelector(authNewPasswordSelector);

  const handlePasChange = (data) => {
    dispatch(userNewPassword(encodeURIComponent(token), data));
  };
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
  };

  const handleBlur = (e) => {
    trigger(e.target.name);
  };

  const passwordChange = {
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
    register({ name: 'newPassword' }, passwordChange.newPassword);
    register({ name: 'confirmPassword' }, passwordChange.confirmPassword);
  }, []);

  const handleBackToLogin = () => {
    navigate('/auth/login');
    dispatch(reset());
  };

  return (
    <Container>
      {newPassword ? (
        <>
          <Message color='green' className='success-message mb-3'>
            Password changed successfully.
          </Message>
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
          <Header size='medium' className='primary-dark-color mb-4'>
            Create New Password
          </Header>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <Form
            onSubmit={handleSubmit(handlePasChange)}
            loading={loading}
            error
          >
            <Form.Field className='mb-3'>
              <label>New Password</label>
              <Form.Input
                type='password'
                name='newPassword'
                placeholder='Enter new password'
                fluid
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!errors.newPassword}
              ></Form.Input>
              {errors && errors.newPassword && (
                <Message error content={errors.newPassword.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Confirm New Password</label>
              <Form.Input
                type='password'
                name='confirmPassword'
                placeholder='Enter confirm password'
                fluid
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!errors.confirmPassword}
              />
              {errors && errors.confirmPassword && (
                <Message error content={errors.confirmPassword.message} />
              )}
            </Form.Field>
            <Button type='submit' fluid primary className='mt-3 btn'>
              Reset Password
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default NewPassword;
