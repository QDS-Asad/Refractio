import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import {
  changeTeamname,
  changeTeamNameSelector,
  resetchangeTeamName,
} from '../../../features/team/changeTeamNameSlice';

const ChangeTeamName = ({ changeTeamName, setChangeTeamName, currentName }) => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      teamName: '',
    },
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(changeTeamNameSelector);

  const handleCreate = (data) => {
    // dispatch team invite;
    dispatch(changeTeamname(data));
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const createOptions = {
    teamName: {
      required: 'Team name is required',
      maxLength: {
        value: 50,
        message: "Team name can't exceed from 50 characters",
      },
    },
  };

  useEffect(() => {
    register({ name: 'teamName' }, createOptions.teamName);
    if (currentName) {
      setValue('teamName', currentName);
    }
  }, []);

  useEffect(() => {
    if (success) {
      setChangeTeamName(false);
      dispatch(resetchangeTeamName());
    }
  }, [success]);

  const closeModel = () => {
    setChangeTeamName(false);
    dispatch(resetchangeTeamName());
  };
  const watchTeamName = watch(`teamName`, '');
  return (
    <Modal
      onClose={closeModel}
      onOpen={() => setChangeTeamName(true)}
      open={changeTeamName}
      dimmer='blurring'
      size='tiny'
      closeIcon>
      <Modal.Header>Change Team Name</Modal.Header>
      <Modal.Content>
        <Form
          id='invite-team-member'
          onSubmit={handleSubmit(handleCreate)}
          loading={loading}
          error>
          <Modal.Description className='py-3'>
            {error && (
              <Message color='red' className='error-message mb-3'>
                {error}
              </Message>
            )}
            <Form.Field className='mb-3'>
              <label>Team Name</label>
              <Form.Input
                name='teamName'
                fluid
                placeholder='Enter team name'
                error={!!errors.teamName}
                onBlur={handleChange}
                onChange={handleChange}
                value={watchTeamName}
              />

              {errors && errors.teamName && (
                <Message error content={errors.teamName.message} />
              )}
            </Form.Field>
          </Modal.Description>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          form='invite-team-member'
          content='Change'
          className='btn'
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ChangeTeamName;
