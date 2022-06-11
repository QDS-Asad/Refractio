import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';
const CancelSubscription = ({ cancelSubscription, setCancelSubscription }) => {
  const error = null;
  return (
    <Modal
      onClose={() => setCancelSubscription(false)}
      onOpen={() => setCancelSubscription(true)}
      open={cancelSubscription}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Cancel Subscription</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>
            If you cancel your subscription you will not be able to use
            Refractio for your team and all associated data will be deleted.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' onClick={() => setCancelSubscription(false)} />
        <Button
          content='Cancel Subscription'
          className='btn-danger'
          onClick={() => setCancelSubscription(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CancelSubscription;
