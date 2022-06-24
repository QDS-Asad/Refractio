import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  cancelMember,
  cancelMemberSelector,
} from '../../../features/team/cancelMemberSlice';

const CancelInvitation = ({
  cancelInvitation,
  setCancelInvitation,
  member,
}) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(cancelMemberSelector);

  const handleCancel = (data) => {
    // dispatch team cancel invite;
    dispatch(cancelMember(data));
  };

  useEffect(() => {
    if (success) {
      setCancelInvitation(false);
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setCancelInvitation(false)}
      onOpen={() => setCancelInvitation(true)}
      open={cancelInvitation}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Cancel Invitation</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to cancel invitation for this person?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='No' onClick={() => setCancelInvitation(false)} />
        <Button
          content='Yes'
          className='btn-danger'
          onClick={() => handleCancel(member)}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CancelInvitation;
