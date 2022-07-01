import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  editPlanSelector,
  editSubscriptionPlan,
  reset,
} from '../../../features/plans/editPlanSlice';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

const EditSubscriptionPlan = ({ editPlan, setEditPlan, plan }) => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      pricePerMonth: '',
      pricePerYear: '',
    },
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(editPlanSelector);

  const handleEdit = (data) => {
    dispatch(editSubscriptionPlan(plan.id, data));
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
    if (plan) {
      const fields = ['name', 'description'];
      fields.forEach((field) => {
        setValue(field, plan[field]);
        trigger(field);
      });
      let perMonth = plan.prices.find((a) => a.interval === 'month');
      let perYear = plan.prices.find((a) => a.interval === 'year');
      setValue('pricePerMonth', perMonth != null ? perMonth.amount : 0);
      setValue('pricePerYear', perYear != null ? perYear.amount : 0);
    }
  }, [plan]);

  useEffect(() => {
    if (success) {
      setEditPlan(false);
      dispatch(reset());
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setEditPlan(false)}
      onOpen={() => setEditPlan(true)}
      open={editPlan}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header>Edit Subscription Plan</Modal.Header>
      <Modal.Content>
        <Form
          id='edit-plan'
          onSubmit={handleSubmit(handleEdit)}
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
                value={watch('name')}
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
                value={watch('description')}
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
                value={watch('pricePerMonth')}
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
                value={watch('pricePerYear')}
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
          form='edit-plan'
          content='Save'
          className='btn'
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditSubscriptionPlan;
