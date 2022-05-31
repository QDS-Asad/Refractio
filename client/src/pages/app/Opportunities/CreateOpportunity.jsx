import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message, Modal, TextArea } from 'semantic-ui-react';
import {
  createOpportunity,
  opportunityCreateSelector,
} from '../../../features/opportunities/opportunityCreateSlice';

const CreateOpportunity = ({ showCreate, setShowCreate }) => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(opportunityCreateSelector);

  const handleCreate = (data) => {
    console.log(data);
    dispatch(createOpportunity(data));
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const createOptions = {
    name: {
      required: 'Name is required',
    },

    description: {
      required: 'Description is required',
    },
  };

  useEffect(() => {
    register({ name: 'name' }, createOptions.name);
    register({ name: 'description' }, createOptions.description);
  }, []);

  return (
    <Form onSubmit={handleSubmit(handleCreate)} loading={loading} error>
      <Modal
        onClose={() => setShowCreate(false)}
        onOpen={() => setShowCreate(true)}
        open={showCreate}
        dimmer='blurring'
        size='tiny'
      >
        <Modal.Header>Create Opportunity</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form.Field className='mb-3'>
              <label className='d-inline-block'>Opportunity Name</label>
              <span className='float-end'>(0 / 100)</span>
              <Form.Input
                name='name'
                fluid
                placeholder='Enter opportunity name'
                onBlur={handleChange}
                error={!!errors.name}
              />
              {errors && errors.name && (
                <Message error content={errors.name.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label className='d-inline-block'>Description</label>
              <span className='float-end'>(0 / 800)</span>
              <Form.Input
                name='description'
                placeholder='Enter description'
                onBlur={handleChange}
                error={!!errors.description}
              />
              {errors && errors.description && (
                <Message error content={errors.description.message} />
              )}
            </Form.Field>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type='submit' content='Save' className='btn' />
        </Modal.Actions>
      </Modal>
    </Form>
  );
};

export default CreateOpportunity;
