import React, {useState,useEffect} from 'react';
import Auth from './Auth';
import {Checkbox,
  Button,
  Form,
  Message,
  Container,
  Header, } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';



let myStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: 10,
};

const NewPassword = () => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
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
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid password. Password length should be min 8 symbols. Password should contain numbers, letters, special characters.',
      },
    },

    confirmPassword: {
      
        required: 'Password is required',
        pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message:
          'Invalid password. Password length should be min 8 symbols. Password should contain numbers, letters, special characters.',
      },
    },
  };


  useEffect(() => {
    register({ name: 'newPassword' }, passwordChange.newPassword);
    register({ name: 'confirmPassword' }, passwordChange.confirmPassword);
  }, []);
  // const handleClick = () => {
  //   console.log('clicked');
  // };
  return (
    <Auth>
      <Container>
      <Header size='medium' className='primary-dark-color'>
          Create New Password
        </Header>
      <Form onSubmit={handleSubmit(handlePasChange)} loading= {loading} error>
      <Form.Field>
            <label>Enter New Password</label>
            <Form.Input
              name='newPassword'
              placeholder='Enter new password'
              type='password'
              fluid
              // placeholder='Enter your Email'
              onBlur={handleChange}
              error={!!errors.newPassword}
            />
            {errors && errors.newPassword && (
              <Message error content={errors.newPassword.message} />
            )}
          </Form.Field>
          <Form.Field>
            <label>Enter New Password</label>
            <Form.Input
              name='confirmPassword'
              placeholder='Enter confirm password'
              type='password'
              fluid
              // placeholder='Enter your Email'
              onBlur={handleChange}
              error={!!errors.newPassword}
            />
            {errors && errors.confirmPassword && (
              <Message error content={errors.confirmPassword.message} />
            )}
          </Form.Field>
        {/* <div className="remember-me mb-10 mt-norm">
        <Checkbox label='Remember me' />
        </div> */}
        <Button type='submit' fluid primary >
          Reset Password
        </Button>
        </Form>
      </Container>
    </Auth>
  );
};

export default NewPassword;
