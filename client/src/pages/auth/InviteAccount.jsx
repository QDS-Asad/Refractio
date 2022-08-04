import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
import {
  joinNewWorkspace,
  resetJoinWorkspace,
  workspaceJoinSelector,
} from '../../features/workspace/workspaceJoinSlice';

const InviteAccount = () => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });
  const { token, team } = useParams();
  const Navigate = useNavigate();

  const { loading, error, verifyMember } = useSelector(
    authVerifyMemberSelector
  );

  const {
    loading: registorLoading,
    error: registerError,
    registerMember,
  } = useSelector(authRegisterMemberSelector);

  const { loading: joinLoading, error: joinError, workspaceJoin } = useSelector(
    workspaceJoinSelector
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(
      memberRegistration(verifyMember.userId, verifyMember.teamId, data)
    );
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

  const registerOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid Email. Must include “@” and “.”',
      },
    },

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
    agreement: {
      required: 'Agreement is required',
    },
  };

  useEffect(() => {
    register({ name: 'email' }, registerOptions.email);
    register({ name: 'firstName' }, registerOptions.firstName);
    register({ name: 'lastName' }, registerOptions.lastName);
    register({ name: 'newPassword' }, registerOptions.newPassword);
    register({ name: 'confirmPassword' }, registerOptions.confirmPassword);
    register({ name: 'agreement' }, registerOptions.agreement);
    dispatch(
      memberVerification(encodeURIComponent(token), encodeURIComponent(team))
    );
  }, [token, team]);

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
    dispatch(resetJoinWorkspace());
  };

  const joinTeamHandler = () => {
    dispatch(joinNewWorkspace(verifyMember.userId, verifyMember.teamId));
  };
  if (error && error === 'Not found.') {
    setTimeout(() => {
      Navigate('/auth/login');
    }, 1500);
  }
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
            className='mt-3 btn'>
            Back to Login
          </Button>
        </>
      ) : workspaceJoin ? (
        <>
          <Header size='medium' className='primary-dark-color text-center'>
            {workspaceJoin}
          </Header>
          <Button
            type='submit'
            fluid
            primary
            onClick={handleBackToLogin}
            className='mt-3 btn'>
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

          {verifyMember && verifyMember.isVerified ? (
            <>
              {joinError && (
                <Message color='red' className='error-message mb-3'>
                  {joinError}
                </Message>
              )}
              <Header as='h3'>
                Welcome to Refractio
                <Header.Subheader className='py-2'>
                  You are invited to join{' '}
                  <strong>{verifyMember.teamName}</strong> team at Refractio
                </Header.Subheader>
              </Header>

              <Button
                className='btn'
                fluid
                onClick={joinTeamHandler}
                loading={joinLoading}>
                Accept Invite
              </Button>
            </>
          ) : (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              loading={loading || registorLoading}
              error>
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
                <label>First Name</label>
                <Form.Input
                  name='firstName'
                  fluid
                  placeholder='Enter your first name'
                  error={!!errors.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors && errors.firstName && (
                  <Message error content={errors.firstName.message} />
                )}
              </Form.Field>
              <Form.Field className='mb-3'>
                <label>Last Name</label>
                <Form.Input
                  name='lastName'
                  fluid
                  placeholder='Enter your last name'
                  error={!!errors.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors && errors.lastName && (
                  <Message error content={errors.lastName.message} />
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
          )}
        </>
      )}
    </Container>
  );
};

export default InviteAccount;
