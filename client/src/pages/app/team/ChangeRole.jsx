import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  changeMemberRoleSelector,
  changeRole,
  resetChangeRole,
} from '../../../features/team/changeMemberRoleSlice';

const ChangeRole = ({
  changeMemberRole,
  setChangeMemberRole,
  member,
  roleId,
}) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(changeMemberRoleSelector);

  const handleRoleChange = () => {
    dispatch(changeRole(member, roleId));
  };

  useEffect(() => {
    if (success) {
      setChangeMemberRole(false);
      dispatch(resetChangeRole());
    }
  }, [success]);

  const closeModel = () => {
    setChangeMemberRole(false);
    dispatch(resetChangeRole());
  };

  return (
    <Modal
      onClose={closeModel}
      onOpen={() => setChangeMemberRole(true)}
      open={changeMemberRole}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Change Role</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to change this person role?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={closeModel} />
        <Button
          content='Change'
          className='btn'
          onClick={() => handleRoleChange(member)}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ChangeRole;
