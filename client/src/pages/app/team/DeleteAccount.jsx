import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  deleteMemberSelector,
  resetDeleteTeamMember,
  deleteMember,
} from '../../../features/team/deleteMemberSlice';
const DeleteAccount = ({
  deleteAccount,
  setDeleteAccount,
  member,
  transferOwnership,
}) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(deleteMemberSelector);

  const deleteWorkSpace = () => {
    // dispatch team cancel invite;
    setDeleteAccount(false);
    dispatch(deleteMember(member));
  };

  useEffect(() => {
    if (success) {
      setDeleteAccount(false);
      dispatch(resetDeleteTeamMember());
    }
  }, [success]);

  const closeModel = () => {
    setDeleteAccount(false);
    dispatch(resetDeleteTeamMember());
  };

  return (
    <Modal
      onClose={() => setDeleteAccount(false)}
      onOpen={() => setDeleteAccount(true)}
      open={deleteAccount}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Deactivate Account</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>
            You are the primary owner of your team so you can't deactivate your
            account.
          </p>
          <p>
            You can{' '}
            <a onClick={transferOwnership} style={{ color: 'blue' }}>
              transfer ownership
            </a>{' '}
            to another member or{' '}
            <a onClick={deleteWorkSpace} style={{ color: 'blue' }}>
              delete this workspace
            </a>
            .{' '}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' onClick={closeModel} />
        {/* <Button
          content='Delete'
          className='btn-danger'
          onClick={() => setDeleteAccount(false)}
        /> */}
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteAccount;
