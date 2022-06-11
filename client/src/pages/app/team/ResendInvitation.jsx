import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';

const ResendInvitation = ({ resendInvitation, setResendInvitation }) => {
  const error = null;
  return (
    <Modal
      onClose={() => setResendInvitation(false)}
      onOpen={() => setResendInvitation(true)}
      open={resendInvitation}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Resend Invitation</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to resend invitation to this person?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='No' onClick={() => setResendInvitation(false)} />
        <Button
          content='Yes'
          className='btn'
          onClick={() => setResendInvitation(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ResendInvitation;
