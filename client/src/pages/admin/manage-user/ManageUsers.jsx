import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';
import {
  fetchTeamList,
  getUsersSelector,
} from '../../../features/team/getUsersSlice';

const ManageUsers = () => {
  const [, setInviteTeamMember] = useState(false);
  const { loading, error, members, page, limit, totalPages } = useSelector(
    getUsersSelector
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamList(page, limit));
  }, [dispatch]);

  const removeTeamMemberHandler = () => {};

  const onPageChange = (e, { activePage }) => {
    dispatch(fetchTeamList(activePage, limit));
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
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {members.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>
                      {user.firstName + ' ' + user.lastName}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>

                    <Table.Cell className='clearfix'>
                      <Button
                        className='btn-link'
                        floated='right'
                        onClick={() => removeTeamMemberHandler(user._id)}>
                        Remove
                      </Button>
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
