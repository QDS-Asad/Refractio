import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Header,
  Input,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';
import {
  orderListSelector,
  sortList,
} from '../../../features/orders/orderListSlice';

const ManageOrders = () => {
  const {
    loading,
    error,
    orders,
    page,
    totalPages,
    column,
    direction,
  } = useSelector(orderListSelector);
  const dispatch = useDispatch();

  const onPageChange = (e, { activePage }) => {
    //dispatch(fetchTeamList(activePage, limit));
  };

  const onSortChange = (columnName) => {
    let sortDirection = 'ascending';
    if (columnName === column) {
      sortDirection = direction === 'ascending' ? 'descending' : 'ascending';
    }
    // dispatch sort event
    dispatch(sortList(columnName, sortDirection));
  };

  return (
    <>
      <Grid>
        <Grid.Column computer={12} tablet={10} mobile={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Orders management
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
                    sorted={column === 'orderId' ? direction : null}
                    onClick={() => onSortChange('orderId')}
                  >
                    #Order
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'date' ? direction : null}
                    onClick={() => onSortChange('date')}
                  >
                    Date
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'user' ? direction : null}
                    onClick={() => onSortChange('user')}
                  >
                    Client Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'plan' ? direction : null}
                    onClick={() => onSortChange('plan')}
                  >
                    Plan
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'subscription' ? direction : null}
                    onClick={() => onSortChange('subscription')}
                  >
                    Subscription
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'status' ? direction : null}
                    onClick={() => onSortChange('status')}
                  >
                    Status
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'amount' ? direction : null}
                    onClick={() => onSortChange('amount')}
                  >
                    Total
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.map((order) => (
                  <Table.Row key={order._id}>
                    <Table.Cell>{order.orderId}</Table.Cell>
                    <Table.Cell>{order.date}</Table.Cell>
                    <Table.Cell>{order.user}</Table.Cell>
                    <Table.Cell>{order.plan}</Table.Cell>
                    <Table.Cell>
                      Autocomplete: {order.subscription ? 'On' : 'Off'}
                    </Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>${order.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='7' className='clearfix'>
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

export default ManageOrders;
