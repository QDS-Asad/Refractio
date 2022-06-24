import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  changeMemberRoleSelector,
  changeRole,
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
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setChangeMemberRole(false)}
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
        <Button content='Cancel' onClick={() => setChangeMemberRole(false)} />
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
