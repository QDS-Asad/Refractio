import React from 'react';
import { Button, Form, Header, Container } from 'semantic-ui-react';

const InviteAccount = () => {
  const handleSubmit = () => {
    console.log('handled');
  };
  return (
    <Container>
      <Form>
        <Form.Field>
          <label>Email address</label>
          <input placeholder='Enter your email' />
        </Form.Field>
        <Form.Field>
          <label>Full Name</label>
          <input placeholder='Enter your name' />
        </Form.Field>
      </Form>
      <Header size='medium' className='primary-dark-color'>
        Create Password
      </Header>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Enter your email' />
        </Form.Field>
        <Form.Field>
          <label className='d-inline-block'>Confirm Password</label>

          <input placeholder='Enter your password' />
        </Form.Field>
        <Button type='submit' fluid primary>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default InviteAccount;
