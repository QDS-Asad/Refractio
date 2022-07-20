import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, List, Header, Button, Message } from 'semantic-ui-react';
import {
  fetchMemberList,
  teamMembersSelector,
  addMemberOpportunity,
  removeMemberOpportunity,
} from '../../../features/team/teamParticipantsSlice';

const ManageParticipants = ({
  viewParticipant,
  setViewParticipant,
  opportunity,
}) => {
  const dispatch = useDispatch();
  // fetch data from our store
  const { loading, error, members } = useSelector(teamMembersSelector);
  useEffect(() => {
    dispatch(fetchMemberList());
  }, []);

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
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          {members.map((member) => (
            <List divided verticalAlign='middle' key={member._id}>
              <List.Item>
                {opportunity.participants.includes(member._id) ? (
                  <List.Content floated='right'>
                    <button
                      onClick={() =>
                        dispatch(
                          removeMemberOpportunity(opportunity._id, member._id)
                        )
                      }
                      disabled={loading}
                      className='btn-link'
                    >
                      Remove
                    </button>
                  </List.Content>
                ) : (
                  <List.Content floated='right'>
                    <button
                      onClick={() =>
                        dispatch(
                          addMemberOpportunity(opportunity._id, member._id)
                        )
                      }
                      disabled={loading}
                      className='btn-link'
                    >
                      Add
                    </button>
                  </List.Content>
                )}

                <List.Content>
                  <Header>
                    {`${member.firstName} ${member.lastName}`}
                    <Header.Subheader>{member.email}</Header.Subheader>
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
