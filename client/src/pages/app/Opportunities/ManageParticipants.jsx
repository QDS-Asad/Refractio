import React from 'react';
import { Modal, List, Header, Button } from 'semantic-ui-react';

const ManageParticipants = ({
  viewParticipant,
  setViewParticipant,
  opportunity,
}) => {
  return (
    <Modal
      onClose={() => setViewParticipant(false)}
      onOpen={() => setViewParticipant(true)}
      open={viewParticipant}
      dimmer='blurring'
      size='tiny'
    >
      <Modal.Header>
        {opportunity.participants.length > 0
          ? 'Manage Participants'
          : 'Add Participants'}
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          {opportunity.participants.map((participant) => (
            <List divided verticalAlign='middle' key={participant._id}>
              <List.Item>
                <List.Content floated='right'>
                  <button className='btn-link'>Remove</button>
                </List.Content>

                <List.Content>
                  <Header>
                    {participant.name}
                    <Header.Subheader>{participant.email}</Header.Subheader>
                  </Header>
                </List.Content>
              </List.Item>
            </List>
          ))}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Done'
          onClick={() => setViewParticipant(false)}
          className='btn'
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ManageParticipants;
