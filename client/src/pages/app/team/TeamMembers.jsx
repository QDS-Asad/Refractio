import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';
import { fetchRoles, roleListSelector } from '../../../features/roles/roleList';
import {
  fetchTeamList,
  teamListSelector,
} from '../../../features/team/teamListSlice';
import CancelInvitation from './CancelInvitation';
import ChangeRole from './ChangeRole';
import DeleteAccount from './DeleteAccount';
import InviteTeamMember from './InviteTeamMember';
import RemoveTeamMember from './RemoveTeamMember';
import ResendInvitation from './ResendInvitation';
import { ROLES, USER_STATUS } from '../../../common/constants';
import { authLoginSelector } from '../../../features/auth/authLoginSlice';

const TeamMembers = () => {
  const [inviteTeamMember, setInviteTeamMember] = useState(false);
  const [removeTeamMember, setRemoveTeamMember] = useState(false);
  const [cancelInvitation, setCancelInvitation] = useState(false);
  const [resendInvitation, setResendInvitation] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [changeMemberRole, setChangeMemberRole] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState(0);

  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, members, page, limit, totalPages } = useSelector(
    teamListSelector
  );

  const { userLogin } = useSelector(authLoginSelector);

  const { roles } = useSelector(roleListSelector);

  // hook to fetch items
  useEffect(() => {
    !inviteTeamMember &&
      !cancelInvitation &&
      !resendInvitation &&
      !changeMemberRole &&
      !removeTeamMember &&
      dispatch(fetchTeamList(page, limit)) &&
      dispatch(fetchRoles());
  }, [
    inviteTeamMember,
    cancelInvitation,
    resendInvitation,
    changeMemberRole,
    removeTeamMember,
  ]);

  const removeTeamMemberHandler = (id) => {
    setSelectedMember(id);
    setRemoveTeamMember(true);
  };

  const resendInvitationHandler = (id) => {
    setSelectedMember(id);
    setResendInvitation(true);
  };

  const cancelInvitationHandler = (id) => {
    setSelectedMember(id);
    setCancelInvitation(true);
  };

  const deleteAccountHandler = (id) => {
    setSelectedMember(id);
    setDeleteAccount(true);
  };

  const onPageChange = (e, { activePage }) => {
    dispatch(fetchTeamList(activePage, limit));
  };

  const handleRoleChange = (newRoleId, userId) => {
    setSelectedMember(userId);
    setSelectedRole(newRoleId);
    setChangeMemberRole(true);
  };

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Team
          </Header>
        </Grid.Column>
        {(userLogin.role.roleId === ROLES.ADMIN ||
          userLogin.role.roleId === ROLES.ORGANIZER) && (
          <Grid.Column width={8}>
            <Button
              primary
              className='btn'
              floated='right'
              onClick={() => setInviteTeamMember(true)}
            >
              Add
            </Button>
            <InviteTeamMember
              inviteTeamMember={inviteTeamMember}
              setInviteTeamMember={setInviteTeamMember}
            />
            <RemoveTeamMember
              removeTeamMember={removeTeamMember}
              setRemoveTeamMember={setRemoveTeamMember}
              member={selectedMember}
            />
            <CancelInvitation
              cancelInvitation={cancelInvitation}
              setCancelInvitation={setCancelInvitation}
              member={selectedMember}
            />
            <ResendInvitation
              resendInvitation={resendInvitation}
              setResendInvitation={setResendInvitation}
              member={selectedMember}
            />
            <DeleteAccount
              deleteAccount={deleteAccount}
              setDeleteAccount={setDeleteAccount}
              member={selectedMember}
            />
            <ChangeRole
              changeMemberRole={changeMemberRole}
              setChangeMemberRole={setChangeMemberRole}
              member={selectedMember}
              roleId={selectedRole}
            />
          </Grid.Column>
        )}
      </Grid>
      <Grid>
        <Grid.Column>
          <Segment loading={loading}>
            {error && (
              <Message color='red' className='error-message mb-3'>
                {error}
              </Message>
            )}
            <Table basic='very' className='table-striped'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  {(userLogin.role.roleId === ROLES.ADMIN ||
                    userLogin.role.roleId === ROLES.ORGANIZER) && (
                    <Table.HeaderCell>Role</Table.HeaderCell>
                  )}
                  {(userLogin.role.roleId === ROLES.ADMIN ||
                    userLogin.role.roleId === ROLES.ORGANIZER) && (
                    <Table.HeaderCell></Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {members.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>
                      {user.status === 'invite_sent'
                        ? 'Pending Invitation'
                        : user.firstName + ' ' + user.lastName}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    {(userLogin.role.roleId === ROLES.ADMIN ||
                      userLogin.role.roleId === ROLES.ORGANIZER) && (
                      <Table.Cell>
                        {userLogin.role.roleId === ROLES.ORGANIZER &&
                        user.role.roleId === ROLES.ADMIN ? (
                          <Dropdown disabled={true} fluid>
                            <Dropdown.Item selected value={user.role.roleId}>
                              {user.role.name}
                            </Dropdown.Item>
                          </Dropdown>
                        ) : (
                          <Dropdown
                            onChange={(e, { value }) =>
                              handleRoleChange(value, user._id)
                            }
                            fluid
                            selection
                            disabled={userLogin.id === user._id || user.isOwner}
                            defaultValue={user.role.roleId}
                            options={roles.map((role) => {
                              return {
                                key: role.roleId,
                                text: role.name,
                                value: role.roleId,
                              };
                            })}
                          />
                        )}
                      </Table.Cell>
                    )}
                    {(userLogin.role.roleId === ROLES.ADMIN ||
                      userLogin.role.roleId === ROLES.ORGANIZER) && (
                      <Table.Cell className='clearfix'>
                        {userLogin.role.roleId === ROLES.ADMIN &&
                          userLogin.id !== user._id &&
                          !user.isOwner &&
                          user.status === USER_STATUS.ACTIVE && (
                            <Button
                              className='btn-link'
                              floated='right'
                              onClick={() => removeTeamMemberHandler(user._id)}
                            >
                              Remove
                            </Button>
                          )}
                        {user.role.roleId >= userLogin.role.roleId &&
                          user.status === USER_STATUS.INVITE_SENT && (
                            <>
                              <Button
                                className='btn-link'
                                floated='right'
                                onClick={() =>
                                  resendInvitationHandler(user._id)
                                }
                              >
                                Resend invitation
                              </Button>
                              <Button
                                className='btn-link'
                                floated='right'
                                onClick={() =>
                                  cancelInvitationHandler(user._id)
                                }
                              >
                                Cancel invitation
                              </Button>
                            </>
                          )}
                        {userLogin.id === user._id &&
                          user.isOwner &&
                          user.role.roleId === ROLES.ADMIN && (
                            <Button
                              className='btn-link-danger'
                              floated='right'
                              onClick={() => deleteAccountHandler(user._id)}
                            >
                              Delete Account
                            </Button>
                          )}
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='4' className='clearfix'>
                    <Pagination
                      floated='right'
                      boundaryRange={0}
                      defaultActivePage={page}
                      ellipsisItem={null}
                      firstItem={null}
                      lastItem={null}
                      siblingRange={2}
                      totalPages={totalPages}
                      secondary
                      prevItem={null}
                      nextItem={null}
                      onPageChange={onPageChange}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default TeamMembers;
