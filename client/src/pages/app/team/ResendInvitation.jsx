import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Message, Modal } from 'semantic-ui-react';
import {
  resendInviteMember,
  resendInviteMemberSelector,
  resetResendInvite,
} from '../../../features/team/resendInviteMemberSlice';

const ResendInvitation = ({
  resendInvitation,
  setResendInvitation,
  member,
}) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(resendInviteMemberSelector);

  const handleResend = (data) => {
    // dispatch team cancel invite;
    dispatch(resendInviteMember(data));
  };

  useEffect(() => {
    if (success) {
      setResendInvitation(false);
      dispatch(resetResendInvite());
    }
  }, [success]);
  return (
    <Modal
      onClose={() => setResendInvitation(false)}
      onOpen={() => setResendInvitation(true)}
      open={resendInvitation}
      dimmer='blurring'
      size='tiny'
      closeIcon
    >
      <Modal.Header color='red'>Resend Invitation</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <p>Do you want to resend invitation to this person?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='No' onClick={() => setResendInvitation(false)} />
        <Button
          content='Yes'
          className='btn'
          onClick={() => handleResend(member)}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ResendInvitation;
