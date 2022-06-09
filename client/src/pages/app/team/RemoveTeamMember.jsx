import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';

const RemoveTeamMember = ({ removeTeamMember, setRemoveTeamMember }) => {
  const error = null;
  return (
    <Modal
      onClose={() => setRemoveTeamMember(false)}
      onOpen={() => setRemoveTeamMember(true)}
      open={removeTeamMember}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Remove from Team</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to remove this person from your team?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' />
        <Button content='Remove' className='btn-danger' />
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveTeamMember;
