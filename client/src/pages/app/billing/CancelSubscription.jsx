import React, { useEffect } from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CancelUserSubscription,
  resetSubscriptionCancel,
  subscriptionCancelSelector,
} from '../../../features/subscriptions/subscriptionCancelSlice';
const CancelSubscription = ({ cancelSubscription, setCancelSubscription }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(subscriptionCancelSelector);

  const handleCancel = () => {
    dispatch(CancelUserSubscription());
  };

  useEffect(() => {
    if (success) {
      setCancelSubscription(false);
      dispatch(resetSubscriptionCancel());
    }
  }, [success]);

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
          onClick={() => handleCancel()}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CancelSubscription;
