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
  fetchOpportunityList,
  opportunityManageListSelector,
} from '../../../features/opportunities/opportunityManageListSlice';

const ManageOpportunities = () => {
  const {
    loading,
    error,
    opportunities,
    page,
    totalPages,
    limit,
  } = useSelector(opportunityManageListSelector);
  const dispatch = useDispatch();

  const onPageChange = (e, { activePage }) => {
    dispatch(fetchOpportunityList(activePage, limit));
  };
  useEffect(() => {
    dispatch(fetchOpportunityList(page, limit));
  }, [dispatch]);
  return (
    <>
      <Grid>
        <Grid.Column computer={16} tablet={16} mobile={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Opportunities management
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
            <Table sortable basic='very' className='table-striped'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Participants</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {opportunities.map((opportunity) => (
                  <Table.Row key={opportunity._id}>
                    <Table.Cell>{opportunity.name}</Table.Cell>
                    <Table.Cell className='text-capitalize'>
                      {opportunity.status === 'disabled'
                        ? 'deleted'
                        : opportunity.status}
                    </Table.Cell>
                    <Table.Cell>{opportunity.totalParticipants}</Table.Cell>
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

export default ManageOpportunities;
