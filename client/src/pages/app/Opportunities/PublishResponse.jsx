import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const PublishResponse = ({ viewSubmit, setViewSubmit, onSubmittion }) => {
  return (
    <Modal
      onClose={() => setViewSubmit(false)}
      onOpen={() => setViewSubmit(true)}
      open={viewSubmit}
      dimmer='blurring'
      size='tiny'
    >
      <Modal.Header>Submit Response</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          Once your response is submitted it cannot be edited. Are you sure you
          want to submit?
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={() => setViewSubmit(false)} />
        <Button
          content='Submit'
          onClick={() => {
            setViewSubmit(false);
            onSubmittion('draft');
          }}
          className='btn'
        />
      </Modal.Actions>
    </Modal>
  );
};

export default PublishResponse;
