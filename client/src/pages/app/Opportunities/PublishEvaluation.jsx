import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const PublishEvaluation = ({ viewSubmit, setViewSubmit, onSubmittion }) => {
  return (
    <Modal
      onClose={() => setViewSubmit(false)}
      onOpen={() => setViewSubmit(true)}
      open={viewSubmit}
      dimmer='blurring'
      size='tiny'
    >
      <Modal.Header>Submit Evaluation</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          Once you submit your evaluation, you won't be able to edit them.
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={() => setViewSubmit(false)} />
        <Button
          content='Submit'
          onClick={() => {
            setViewSubmit(false);
            onSubmittion();
          }}
          className='btn'
        />
      </Modal.Actions>
    </Modal>
  );
};

export default PublishEvaluation;
