import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react';
const DeleteAccount = ({ deleteAccount, setDeleteAccount, member }) => {
  const error = null;
  return (
    <Modal
      onClose={() => setDeleteAccount(false)}
      onOpen={() => setDeleteAccount(true)}
      open={deleteAccount}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Delete Account</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to delete account?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' onClick={() => setDeleteAccount(false)} />
        <Button
          content='Delete'
          className='btn-danger'
          onClick={() => setDeleteAccount(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteAccount;
