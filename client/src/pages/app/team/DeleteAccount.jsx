import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import { logoutUser } from '../../../features/auth/authLoginSlice';
import {
  deleteMemberSelector,
  resetDeleteTeamMember,
  deleteMember,
} from '../../../features/team/deleteMemberSlice';
const style = { color: 'blue', cursor: 'pointer' };
const DeleteAccount = ({
  deleteAccount,
  setDeleteAccount,
  transferOwnership,
}) => {
  const [deleteWorkspace, setDeleteWorkspace] = useState(false);
  const dispatch = useDispatch();

  const { error, success } = useSelector(deleteMemberSelector);

  const deleteWorkSpace = () => {
    // dispatch team cancel invite;
    setDeleteAccount(false);
    // dispatch(deleteMember());
    setDeleteWorkspace(true);
  };

  useEffect(() => {
    if (success) {
      dispatch(resetDeleteTeamMember());
      setDeleteAccount(false);
      dispatch(logoutUser());
    }
  }, [success]);

  const closeModel = () => {
    setDeleteAccount(false);
    dispatch(resetDeleteTeamMember());
  };

  return (
    <>
      <Modal
        onClose={() => setDeleteAccount(false)}
        onOpen={() => setDeleteAccount(true)}
        open={deleteAccount}
        dimmer='blurring'
        size='tiny'
        closeIcon>
        <Modal.Header color='red'>
          Options to Delete Account or Team
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {error && (
              <Message color='red' className='error-message mb-3'>
                {error}
              </Message>
            )}
            <p>
              You are the Administrator with billing responsibility for the{' '}
              <b>Team</b>.
            </p>
            <p>
              You can{' '}
              <span onClick={transferOwnership} style={style}>
                transfer ownership
              </span>{' '}
              to another Administrator of Team or{' '}
              <span onClick={deleteWorkSpace} style={style}>
                delete this team
              </span>{' '}
              completely.{' '}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Close' onClick={closeModel} />
        </Modal.Actions>
      </Modal>
      <Modal
        onClose={() => setDeleteWorkspace(false)}
        onOpen={() => setDeleteWorkspace(true)}
        open={deleteWorkspace}
        dimmer='blurring'
        size='tiny'>
        <Modal.Header>Delete workspace</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            Once you delete your workspace, it cannot be undone. Are you sure
            you want to delete?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Cancel' onClick={() => setDeleteWorkspace(false)} />
          <Button
            content='delete'
            onClick={() => {
              setDeleteWorkspace(false);
              dispatch(deleteMember());
            }}
            className='btn'
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteAccount;
