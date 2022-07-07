import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Message, Form, Header, Container } from 'semantic-ui-react';
import {
  authLoginSelector,
  logoutUser,
} from '../../features/auth/authLoginSlice';
import {
  authRegisterSelector,
  resetRegister,
} from '../../features/auth/authRegisterSlice';
import {
  authVerifyCodeSelector,
  codeVerification,
  resendVerifyCode,
  resetVerifiyCode,
} from '../../features/auth/authVerifyCodeSlice';

const VerificationCode = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const {
    register,
    setError,
    setValue,
    handleSubmit,
    errors,
    trigger,
  } = useForm({
    mode: 'onBlur',
  });

  // set up dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userRegister } = useSelector(authRegisterSelector);
  const { userLogin } = useSelector(authLoginSelector);

  const { loading, error, verifyCode, resendCode } = useSelector(
    authVerifyCodeSelector
  );

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
  };

  const handleBlur = (e) => {
    trigger(e.target.name);
  };

  const handleVerification = ({ verificationCode }) => {
    dispatch(codeVerification(userId, verificationCode));
  };

  const handleReSendCode = () => {
    dispatch(resendVerifyCode(userId, email));
  };

  const verification = {
    verificationCode: {
      required: 'Verification code is required',
      pattern: {
        message: 'Invalid code',
      },
    },
  };

  useEffect(() => {
    register({ name: 'verificationCode' }, verification.verificationCode);
    if (userRegister) {
      if (userRegister.email) {
        setEmail(userRegister.email);
      }
      if (userRegister.userId) {
        setUserId(userRegister.userId);
      }
    } else if (userLogin) {
      if (userLogin.email) {
        setEmail(userLogin.email);
      }
      if (userLogin.id) {
        setUserId(userLogin.id);
      }
    } else {
      navigate('/auth/login');
    }
  }, []);

  useEffect(() => {
    if (error) {
      setError('verificationCode', { type: 'pattern' });
    }
    if (verifyCode) {
      setTimeout(() => {
        navigate('/auth/login');
        dispatch(resetRegister());
        dispatch(logoutUser());
      }, 2000);
    }
    if (resendCode) {
      setTimeout(() => {
        dispatch(resetVerifiyCode());
      }, 3000);
    }
  }, [error, verifyCode, resendCode]);

  return (
    <Container>
      <Header
        className='justify-content-md-center row'
        as='h2'
        image='/mailSent.svg'
      />
      {verifyCode ? (
        <Header size='medium' className='primary-dark-color text-center'>
          Email verified successfully.
        </Header>
      ) : (
        <>
          <Header size='medium' className='primary-dark-color text-center'>
            Please check your Email
          </Header>
          <p className='text-center'>
            We sent the verification code to
            <br /> <strong>{email}</strong>.
            <br />
            Please enter the code below
          </p>
          {resendCode && (
            <Message
              positive
              content='Resend code sent successfully.'
              className='error-message mb-3'
            />
          )}
          <Form
            onSubmit={handleSubmit(handleVerification)}
            loading={loading}
            error
          >
            <Form.Field className='mb-3'>
              <label className='d-inline-block'>Verification code</label>

              <Form.Input
                placeholder='Verification code'
                name='verificationCode'
                fluid
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!errors.verificationCode}
              />
              {errors && errors.verificationCode && (
                <Message error content={errors.verificationCode.message} />
              )}
            </Form.Field>

            <Button type='submit' fluid primary className='mt-3 btn'>
              Next
            </Button>

            <div className='backToLogin'>
              <div
                className='primary-color fw-bold'
                style={{ cursor: 'pointer' }}
                onClick={handleReSendCode}
              >
                Resend Code
              </div>
            </div>
          </Form>
        </>
      )}
    </Container>
  );
};

export default VerificationCode;
