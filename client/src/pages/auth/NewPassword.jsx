import React, { useState, useEffect } from 'react';
import { Button, Form, Message, Container, Header } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

const NewPassword = () => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);

  const handlePasChange = (data) => {
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

  return (
    <Container>
      <Header size='medium' className='primary-dark-color mb-4'>
        Create New Password
      </Header>
      <Form onSubmit={handleSubmit(handlePasChange)} loading={loading} error>
        <Form.Field className='mb-3'>
          <label>New Password</label>
          <Form.Input
            type='password'
            name='newPassword'
            placeholder='Enter new password'
            fluid
            onBlur={handleChange}
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
            onBlur={handleChange}
            error={!!errors.confirmPassword}
          />
          {errors && errors.confirmPassword && (
            <Message error content={errors.confirmPassword.message} />
          )}
        </Form.Field>
        <Button type='submit' fluid primary className='mt-3'>
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default NewPassword;
