import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  removeMember,
  removeMemberSelector,
  resetRemoveTeamMember,
} from '../../../features/team/removeMemberSlice';

const RemoveTeamMember = ({
  removeTeamMember,
  setRemoveTeamMember,
  member,
}) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(removeMemberSelector);

  const handleRemove = (data) => {
    // dispatch team cancel invite;
    dispatch(removeMember(data));
  };

  useEffect(() => {
    if (success) {
      setRemoveTeamMember(false);
      dispatch(resetRemoveTeamMember());
    }
  }, [success]);
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
        <Button content='Cancel' onClick={() => setRemoveTeamMember(false)} />
        <Button
          content='Remove'
          className='btn-danger'
          onClick={() => handleRemove(member)}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveTeamMember;
