import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import {
  editProfileSelector,
  editUserProfile,
  resetEditProfile,
} from '../features/team/editProfileSlice';

const EditProfile = ({ editProfile, setEditProfile, userInfo }) => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    },
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(editProfileSelector);

  const handleCreate = (data) => {
    // dispatch team invite;
    dispatch(editUserProfile(data));
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };
  const handleBlur = (e) => {
    trigger(e.target.name);
  };

  const createOptions = {
    firstName: {
      required: 'First Name is required',
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: 'Invalid First Name. Only letters are allowed.',
      },
    },
    lastName: {
      required: 'Last Name is required',
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: 'Invalid Last Name. Only letters are allowed.',
      },
    },
  };

  useEffect(() => {
    register({ name: 'firstName' }, createOptions.firstName);
    register({ name: 'lastName' }, createOptions.lastName);
  }, []);

  useEffect(() => {
    if (success) {
      setEditProfile(false);
      dispatch(resetEditProfile());
    }
  }, [success]);

  const closeModel = () => {
    setEditProfile(false);
    dispatch(resetEditProfile());
  };

  return (
    <Modal
      onClose={() => closeModel()}
      onOpen={() => setEditProfile(true)}
      open={editProfile}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Content>
        <Form
          id='edit-profile'
          onSubmit={handleSubmit(handleCreate)}
          loading={loading}
          error
        >
          <Modal.Description className='py-3'>
            {error && (
              <Message color='red' className='error-message mb-3'>
                {error}
              </Message>
            )}
            <Form.Field className='mb-3'>
              <label>First Name </label>
              <Form.Input
                name='firstName'
                fluid
                placeholder='Enter your First Name'
                error={!!errors.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={watch('firstName')}
              />
              {errors && errors.firstName && (
                <Message error content={errors.firstName.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Last Name </label>
              <Form.Input
                name='lastName'
                fluid
                placeholder='Enter your Last Name'
                error={!!errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={watch('lastName')}
              />
              {errors && errors.lastName && (
                <Message error content={errors.lastName.message} />
              )}
            </Form.Field>
          </Modal.Description>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          form='edit-profile'
          content='Update'
          className='btn'
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditProfile;
