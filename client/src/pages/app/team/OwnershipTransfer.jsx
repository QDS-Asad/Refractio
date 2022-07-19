import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import {
  transferOwnershipSelector,
  transferOwnershipCall,
  resetTransferOwner,
  fetchAdmins,
} from '../../../features/team/transferOwnerSlice';
import { logoutUser } from '../../../features/auth/authLoginSlice';

const OwnershipTransfer = ({ transferOwner, setTransferOwner, member }) => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
    defaultValues: {
      owner: '',
    },
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success, admins } = useSelector(
    transferOwnershipSelector
  );
  const handleTransfer = (data) => {
    // dispatch team invite;
    dispatch(transferOwnershipCall(data.owner));
  };

  const createOptions = {
    owner: {
      required: 'User is required',
    },
  };

  useEffect(() => {
    dispatch(fetchAdmins());
    register({ name: 'owner' }, createOptions.owner);
  }, []);

  useEffect(() => {
    if (success) {
      setTransferOwner(false);
      dispatch(logoutUser());
    }
  }, [success]);

  const closeModel = () => {
    setTransferOwner(false);
    dispatch(resetTransferOwner());
  };

  return (
    <Modal
      onClose={closeModel}
      onOpen={() => setTransferOwner(true)}
      open={transferOwner}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header>Transfer Ownership</Modal.Header>
      <Modal.Content>
        <Form
          id='ownership-transfer'
          onSubmit={handleSubmit(handleTransfer)}
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
              <label>
                Select admin to which the ownership will be transferred
              </label>
              <Form.Select
                fluid
                selection
                options={admins.map((user) => {
                  return {
                    key: user._id,
                    text: user.firstName + ' ' + user.lastName,
                    value: user._id,
                  };
                })}
                name='owner'
                placeholder='Select user'
                onChange={(e, { name, value }) => {
                  setValue(name, value);
                  trigger(name);
                }}
                error={!!errors.owner}
              />

              {errors && errors.owner && (
                <Message error content={errors.owner.message} />
              )}
            </Form.Field>
          </Modal.Description>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          form='ownership-transfer'
          content='Transfer'
          className='btn'
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default OwnershipTransfer;
