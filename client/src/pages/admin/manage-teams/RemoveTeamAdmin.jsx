import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  deleteTeamList,
  getTeamsSelector,
} from '../../../features/team/getTeamsSlice';

const RemoveTeamAdmin = ({ deleteTeam, setDeleteTeam, id, setId }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(getTeamsSelector);

  const handleRemove = () => {
    // dispatch team cancel invite;
    dispatch(deleteTeamList(id));
  };

  useEffect(() => {
    if (success) {
      setId(null);
      setDeleteTeam(false);
    }
  }, [success]);

  const closeModel = () => {
    setId(null);
    setDeleteTeam(false);
  };

  return (
    <Modal
      onClose={closeModel}
      onOpen={() => setDeleteTeam(true)}
      open={deleteTeam}
      dimmer='blurring'
      size='tiny'
      closeIcon>
      <Modal.Header color='red'>Delete Team</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to remove this team?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={closeModel} />
        <Button
          content='Remove'
          className='btn-danger'
          onClick={() => handleRemove()}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveTeamAdmin;
