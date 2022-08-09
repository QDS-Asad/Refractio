import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Header,
  Input,
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
    //dispatch(fetchTeamList(activePage, limit));
  };

  // const onSortChange = (columnName) => {
  //   let sortDirection = 'ascending';
  //   if (columnName === column) {
  //     sortDirection = direction === 'ascending' ? 'descending' : 'ascending';
  //   }
  //   // dispatch sort event
  //   dispatch(sortList(columnName, sortDirection));
  // };
  useEffect(() => {
    dispatch(fetchOpportunityList(page, limit));
  }, [dispatch]);
  return (
    <>
      <Grid>
        <Grid.Column computer={12} tablet={10} mobile={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Opportunities management
          </Header>
        </Grid.Column>
        <Grid.Column computer={4} tablet={6} mobile={16}>
          <Input icon='search' iconPosition='left' placeholder='Search' />
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
                  <Table.HeaderCell
                  // sorted={column === 'name' ? direction : null}
                  // onClick={() => onSortChange('name')}
                  >
                    Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                  // sorted={column === 'status' ? direction : null}
                  // onClick={() => onSortChange('status')}
                  >
                    Status
                  </Table.HeaderCell>
                  <Table.HeaderCell
                  // sorted={column === 'type' ? direction : null}
                  // onClick={() => onSortChange('type')}
                  >
                    Participants
                  </Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {opportunities.map((opportunity) => (
                  <Table.Row key={opportunity._id}>
                    <Table.Cell>{opportunity.name}</Table.Cell>
                    <Table.Cell>
                      {opportunity.status === 'disabled'
                        ? 'deleted'
                        : opportunity.status}
                    </Table.Cell>
                    <Table.Cell>{opportunity.totalParticipants}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button className='btn-link' floated='center'>
                        Remove
                      </Button>
                    </Table.Cell>
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
