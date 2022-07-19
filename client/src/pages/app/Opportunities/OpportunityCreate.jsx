import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import {
  createOpportunity,
  opportunityCreateSelector,
} from '../../../features/opportunities/opportunityCreateSlice';
import { opportunityDetailSelector } from '../../../features/opportunities/opportunityDetailSlice';

const OpportunityCreate = ({ showCreate, setShowCreate, id }) => {
  const { register, setValue, handleSubmit, watch, errors, trigger } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(opportunityCreateSelector);
  const { opportunity } = useSelector(opportunityDetailSelector);
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
      maxLength: {
        value: 100,
        message: 'Maximum characters are 100.',
      },
    },

    description: {
      required: 'Description is required',
      maxLength: {
        value: 800,
        message: 'Maximum characters are 800.',
      },
    },
  };

  useEffect(() => {
    register({ name: 'name' }, createOptions.name);
    register({ name: 'description' }, createOptions.description);
  }, []);

  useEffect(() => {
    if (id && opportunity) {
      setValue('name', opportunity.name);
      setValue('description', opportunity.description);
    }
  }, [id, opportunity]);

  useEffect(() => {
    if (success) {
      setShowCreate(false);
    }
  }, [success]);

  const watchName = watch('name', '');
  const watchDescription = watch('description', '');

  return (
    <Modal
      onClose={() => setShowCreate(false)}
      onOpen={() => setShowCreate(true)}
      open={showCreate}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header>Create Opportunity</Modal.Header>
      <Modal.Content>
        <Form
          id='create-opportunity'
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
              <label className='d-inline-block'>Opportunity Name</label>
              <span className='float-end'>({watchName.length}/ 100)</span>
              <Form.Input
                name='name'
                fluid
                placeholder='Enter opportunity name'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.name}
                value={watchName}
              />
              {errors && errors.name && (
                <Message error content={errors.name.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label className='d-inline-block'>Description</label>
              <span className='float-end'>
                ({watchDescription.length} / 800)
              </span>
              <Form.TextArea
                name='description'
                placeholder='Enter description'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.description}
                value={watchDescription}
              />
              {errors && errors.description && (
                <Message error content={errors.description.message} />
              )}
            </Form.Field>
          </Modal.Description>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          form='create-opportunity'
          content='Save'
          className='btn'
        />
      </Modal.Actions>
    </Modal>
  );
};

export default OpportunityCreate;
