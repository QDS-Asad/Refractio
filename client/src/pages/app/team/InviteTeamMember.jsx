import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

const InviteTeamMember = ({ inviteTeamMember, setInviteTeamMember }) => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      role: '',
    },
  });

  // set up dispatch
  // const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = {};

  const handleCreate = (data) => {
    console.log(data);
    // dispatch team invite;
  };

  const roles = [
    { name: 'Administrator', id: 1 },
    { name: 'Organizer', id: 2 },
    { name: 'Participant', id: 3 },
  ];

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const createOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid Email. Must include “@” and “.”',
      },
    },
    role: {
      required: 'Role is required',
    },
  };

  useEffect(() => {
    register({ name: 'email' }, createOptions.email);
    register({ name: 'role' }, createOptions.role);
  }, []);

  useEffect(() => {
    if (success) {
      setInviteTeamMember(false);
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setInviteTeamMember(false)}
      onOpen={() => setInviteTeamMember(true)}
      open={inviteTeamMember}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header>Invite Team Member</Modal.Header>
      <Modal.Content>
        <Form
          id='invite-team-member'
          onSubmit={handleSubmit(handleCreate)}
          loading={loading}
          error
        >
          <Modal.Description>
            {error && (
              <Message color='red' className='error-message mb-3'>
                {error}
              </Message>
            )}
            <Form.Field className='mb-3'>
              <label>Email</label>
              <Form.Input
                name='email'
                fluid
                placeholder='Enter email'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.email}
              />
              {errors && errors.email && (
                <Message error content={errors.email.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Role</label>
              <Form.Select
                fluid
                selection
                options={roles.map((role) => {
                  return {
                    key: role.id,
                    text: role.name,
                    value: role.id,
                  };
                })}
                name='role'
                placeholder='Select role'
                onChange={(e, { name, value }) => {
                  setValue(name, value);
                  trigger(name);
                }}
                error={!!errors.role}
              />

              {errors && errors.role && (
                <Message error content={errors.role.message} />
              )}
            </Form.Field>
            <p>
              Participants can respond to opportunities and evaluate submitted
              ideas.
            </p>
          </Modal.Description>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          form='invite-team-member'
          content='Add'
          className='btn'
        />
      </Modal.Actions>
    </Modal>
  );
};

export default InviteTeamMember;