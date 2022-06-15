import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';

const CancelInvitation = ({ cancelInvitation, setCancelInvitation }) => {
  const error = null;
  return (
    <Modal
      onClose={() => setCancelInvitation(false)}
      onOpen={() => setCancelInvitation(true)}
      open={cancelInvitation}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Cancel Invitation</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to cancel invitation for this person?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='No' onClick={() => setCancelInvitation(false)} />
        <Button
          content='Yes'
          className='btn-danger'
          onClick={() => setCancelInvitation(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CancelInvitation;
