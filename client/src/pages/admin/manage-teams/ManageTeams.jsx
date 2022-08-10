import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';
import {
  fetchAllTeamList,
  getTeamsSelector,
  resetGetTeam,
} from '../../../features/team/getTeamsSlice';
import { SuperAdminTeam } from './SuperAdminTeam';

const ManageTeams = () => {
  const { loading, error, members, page, limit, totalPages } = useSelector(
    getTeamsSelector
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTeamList(page, limit));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetGetTeam());
    };
  }, []);

  const onPageChange = (e, { activePage }) => {
    dispatch(fetchAllTeamList(activePage, limit));
  };

  return (
    <>
      <Grid>
        <Grid.Column computer={12} tablet={10} mobile={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Team management
          </Header>
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
                  <Table.HeaderCell>Team Name</Table.HeaderCell>
                  <Table.HeaderCell>Team Status</Table.HeaderCell>
                  <Table.HeaderCell>Subscription Status</Table.HeaderCell>
                  <Table.HeaderCell>Next Billing At</Table.HeaderCell>
                  <Table.HeaderCell>Total Members</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {members.map((user) => (
                  <SuperAdminTeam user={user} />
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

export default ManageTeams;
