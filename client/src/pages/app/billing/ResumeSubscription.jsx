import React, { useEffect } from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ResumeUserSubscription,
  resetSubscriptionResume,
  subscriptionResumeSelector,
} from '../../../features/subscriptions/subscriptionResumeSlice';
const ResumeSubscription = ({ resumeSubscription, setResumeSubscription }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(subscriptionResumeSelector);

  const handleResume = () => {
    dispatch(ResumeUserSubscription());
  };

  useEffect(() => {
    if (success) {
      setResumeSubscription(false);
      dispatch(resetSubscriptionResume());
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setResumeSubscription(false)}
      onOpen={() => setResumeSubscription(true)}
      open={resumeSubscription}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Resume Subscription</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to resume subscription?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' onClick={() => setResumeSubscription(false)} />
        <Button
          content='Resume Subscription'
          className='btn'
          onClick={() => handleResume()}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ResumeSubscription;
