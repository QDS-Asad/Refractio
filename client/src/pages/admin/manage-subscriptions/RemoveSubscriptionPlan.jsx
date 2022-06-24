import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  removePlanSelector,
  removeSubscriptionPlan,
} from '../../../features/plans/removePlanSlice';

const RemoveSubscriptionPlan = ({ removePlan, setRemovePlan, plan }) => {
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, success } = useSelector(removePlanSelector);

  const handleRemove = () => {
    dispatch(removeSubscriptionPlan(plan.id));
  };

  useEffect(() => {
    if (success) {
      setRemovePlan(false);
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setRemovePlan(false)}
      onOpen={() => setRemovePlan(true)}
      open={removePlan}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Remove Subscription Plan</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to remove “{plan && plan.name}”?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={() => setRemovePlan(false)} />
        <Button
          content='Remove'
          className='btn-danger'
          onClick={handleRemove}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveSubscriptionPlan;
