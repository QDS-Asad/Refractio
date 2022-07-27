import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const DeleteOpportunity = ({
  viewDelete,
  setViewDelete,
  onSubmittion,
  deleteText,
  setDeleteText,
}) => {
  const onClose = () => {
    setViewDelete(false);
    setDeleteText(
      'Once the opportunity is deleted, it cannot be undone. Are you sure ?'
    );
  };
  return (
    <Modal
      onClose={onClose}
      onOpen={() => setViewDelete(true)}
      open={viewDelete}
      dimmer='blurring'
      size='tiny'
    >
      <Modal.Header>Delete Opportunity</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>{deleteText}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={onClose} />
        <Button
          content='Delete Now'
          onClick={() => {
            onSubmittion();
            setViewDelete(false);
          }}
          className='btn'
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteOpportunity;
