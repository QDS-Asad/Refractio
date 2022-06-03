import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Message, Form, Header, Container } from 'semantic-ui-react';
import {
  authRegisterSelector,
  resetRegister,
} from '../../features/auth/authRegisterSlice';
import {
  authVerifyCodeSelector,
  codeVerification,
} from '../../features/auth/authVerifyCodeSlice';

const VerificationCode = () => {
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

  let email;
  const { userRegister } = useSelector(authRegisterSelector);
  if (userRegister && userRegister.email) {
    email = userRegister.email;
  }

  const { loading, error, verifyCode } = useSelector(authVerifyCodeSelector);

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };
  const handleVerification = ({ verificationCode }) => {
    let userId = userRegister.userId;
    dispatch(codeVerification(userId, verificationCode));
  };

  const handleReSendCode = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
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
  }, []);

  useEffect(() => {
    if (error) {
      setError('verificationCode', { type: 'pattern' });
    }
    if (verifyCode) {
      setTimeout(() => {
        navigate('/auth/login');
        dispatch(resetRegister());
      }, 2000);
    }
  }, [error, verifyCode]);

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
                onBlur={handleChange}
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
