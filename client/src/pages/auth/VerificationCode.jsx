import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Message, Form, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const VerificationCode = () => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };
  const handleVerification = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const verification = {
    verificationCode: {
      required: 'verification code is required',
      pattern: {
        message: 'Invalid code',
      },
    },
  };

  useEffect(() => {
    register({ name: 'verificationCode' }, verification.verificationCode);
  }, []);

  return (
    <Container>
      <Header
        className='justify-content-md-center row'
        as='h2'
        image='/mailSent.svg'
      />
      <Header
        size='medium'
        class='text-center'
        className='primary-dark-color text-center '
      >
        Please check your Email
      </Header>
      <p className='text-center'>
        We sent the verification code to your
        <br /> email@domain.com.
        <br />
        Please enter the code below
      </p>

      <Form onSubmit={handleSubmit(handleVerification)}>
        {/* <Form.Field>
            <label>Email address</label>
            <input placeholder='Enter your email' />
          </Form.Field> */}
        <Form.Field>
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

        <Button type='submit' fluid primary>
          Next
        </Button>
      </Form>
      <div className='backToLogin'>
        <Link to='/auth/login'>Resend Code</Link>
      </div>
    </Container>
  );
};

export default VerificationCode;
