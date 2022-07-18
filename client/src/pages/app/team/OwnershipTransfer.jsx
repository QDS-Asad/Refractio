import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import { fetchRoles, roleListSelector } from '../../../features/roles/roleList';
import {
  transferOwnershipSelector,
  transferOwnershipCall,
  resetTransferOwner,
} from '../../../features/team/transferOwnerSlice';

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
  const { loading, error, success } = useSelector(transferOwnershipSelector);

  const handleTransfer = (data) => {
    // dispatch team invite;
    debugger;
    // dispatch(transferOwnershipCall(data));
  };

  const { roles } = useSelector(roleListSelector);

  const createOptions = {
    owner: {
      required: 'User is required',
    },
  };

  useEffect(() => {
    dispatch(fetchRoles());
    register({ name: 'owner' }, createOptions.owner);
  }, []);

  useEffect(() => {
    if (success) {
      setTransferOwner(false);
      dispatch(resetTransferOwner());
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
                options={roles.map((role) => {
                  return {
                    key: role.roleId,
                    text: role.name,
                    value: role.roleId,
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
