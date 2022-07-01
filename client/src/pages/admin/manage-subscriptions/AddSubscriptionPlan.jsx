import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import {
  addPlanSelector,
  addSubscriptionPlan,
} from '../../../features/plans/addPlanSlice';

const AddSubscriptionPlan = ({ addPlan, setAddPlan }) => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(addPlanSelector);

  const handleCreate = (data) => {
    dispatch(addSubscriptionPlan(data));
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
    pricePerMonth: {
      required: 'Monthly price is required',
    },
    pricePerYear: {
      required: 'Annual price is required',
    },
  };

  useEffect(() => {
    register({ name: 'name' }, createOptions.name);
    register({ name: 'description' }, createOptions.description);
    register({ name: 'pricePerMonth' }, createOptions.pricePerMonth);
    register({ name: 'pricePerYear' }, createOptions.pricePerYear);
  }, []);

  useEffect(() => {
    if (success) {
      setAddPlan(false);
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setAddPlan(false)}
      onOpen={() => setAddPlan(true)}
      open={addPlan}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header>Add Subscription Plan</Modal.Header>
      <Modal.Content>
        <Form
          id='add-plan'
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
              <label>Name</label>
              <Form.Input
                name='name'
                fluid
                placeholder='Enter name'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.name}
              />
              {errors && errors.name && (
                <Message error content={errors.name.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Description</label>
              <Form.TextArea
                name='description'
                placeholder='Enter description'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.description}
              />
              {errors && errors.description && (
                <Message error content={errors.description.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Price per month</label>
              <Form.Input
                icon='dollar sign'
                iconPosition='left'
                name='pricePerMonth'
                fluid
                placeholder='Enter price $'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.pricePerMonth}
              />
              {errors && errors.pricePerMonth && (
                <Message error content={errors.pricePerMonth.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Price annually</label>
              <Form.Input
                icon='dollar sign'
                iconPosition='left'
                name='pricePerYear'
                fluid
                placeholder='Enter price $'
                onChange={handleChange}
                onBlur={handleChange}
                error={!!errors.pricePerYear}
              />
              {errors && errors.pricePerYear && (
                <Message error content={errors.pricePerYear.message} />
              )}
            </Form.Field>
          </Modal.Description>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          form='add-plan'
          content='Save'
          className='btn'
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddSubscriptionPlan;
