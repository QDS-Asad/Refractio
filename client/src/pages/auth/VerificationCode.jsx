import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Message, Form, Header, Container } from 'semantic-ui-react';

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

  const handleReSendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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

  return (
    <Container>
      <Header
        className='justify-content-md-center row'
        as='h2'
        image='/mailSent.svg'
      />
      <Header size='medium' className='primary-dark-color text-center'>
        Please check your Email
      </Header>
      <p className='text-center'>
        We sent the verification code to
        <br /> <strong>youremail@domain.com</strong>.
        <br />
        Please enter the code below
      </p>

      <Form onSubmit={handleSubmit(handleVerification)} loading={loading} error>
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

        <Button type='submit' fluid primary className='mt-3'>
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
    </Container>
  );
};

export default VerificationCode;
