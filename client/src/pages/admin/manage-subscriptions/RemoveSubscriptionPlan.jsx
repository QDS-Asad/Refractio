import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';

const RemoveSubscriptionPlan = ({ removePlan, setRemovePlan, plan }) => {
  const error = null;
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
          onClick={() => setRemovePlan(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveSubscriptionPlan;
