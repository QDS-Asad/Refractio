import React, { useEffect, useState } from 'react';
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
import { USER_STATUS } from '../../../common/constants';
import { fetchRoles, roleListSelector } from '../../../features/roles/roleList';

const ManageUsers = () => {
  const [, setInviteTeamMember] = useState(false);
  const { loading, error, users, page, totalPages } = {
    users: [],
    totalPages: 2,
  };

  const { roles } = useSelector(roleListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const handleRoleChange = (newRoleId, userId) => {};

  const removeTeamMemberHandler = () => {};
  const resendInvitationHandler = () => {};
  const cancelInvitationHandler = () => {};

  const onPageChange = (e, { activePage }) => {
    //dispatch(fetchTeamList(activePage, limit));
  };

  return (
    <>
      <Grid>
        <Grid.Column computer={12} tablet={10} mobile={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            User management
          </Header>
        </Grid.Column>
        <Grid.Column computer={4} tablet={6} mobile={16}>
          <Button
            primary
            className='btn'
            floated='right'
            onClick={() => setInviteTeamMember(true)}>
            Add
          </Button>
          {/* <InviteTeamMember
          inviteTeamMember={inviteTeamMember}
          setInviteTeamMember={setInviteTeamMember}
        /> */}
        </Grid.Column>
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
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Plan</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>
                      {user.status === 'invite_sent'
                        ? 'Pending Invitation'
                        : user.fullName}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        onChange={(e, { value }) =>
                          handleRoleChange(value, user._id)
                        }
                        fluid
                        selection
                        defaultValue={user.role.roleId}
                        options={roles.map((role) => {
                          return {
                            key: role.roleId,
                            text: role.name,
                            value: role.roleId,
                          };
                        })}
                      />
                    </Table.Cell>
                    <Table.Cell>{user.status}</Table.Cell>
                    <Table.Cell>{user.plan}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>

                    <Table.Cell className='clearfix'>
                      {user.status === USER_STATUS.ACTIVE && (
                        <Button
                          className='btn-link'
                          floated='right'
                          onClick={() => removeTeamMemberHandler(user._id)}>
                          Remove
                        </Button>
                      )}
                      {user.status === USER_STATUS.INVITE_SENT && (
                        <>
                          <Button
                            className='btn-link'
                            floated='right'
                            onClick={() => resendInvitationHandler(user._id)}>
                            Resend invitation
                          </Button>
                          <Button
                            className='btn-link'
                            floated='right'
                            onClick={() => cancelInvitationHandler(user._id)}>
                            Cancel invitation
                          </Button>
                        </>
                      )}
                      {/* {userLogin.id === user._id &&
                        user.role.roleId === ROLES.ADMIN && (
                          <Button
                            className='btn-link-danger'
                            floated='right'
                            onClick={() => deleteAccountHandler(user._id)}
                          >
                            Delete Account
                          </Button>
                        )} */}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='5' className='clearfix'>
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

export default ManageUsers;
