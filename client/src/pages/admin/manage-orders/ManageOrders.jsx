import React from 'react';
import { useEffect } from 'react';
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
  fetchOrderList,
  orderListSelector,
  resetAdminOrders,
} from '../../../features/orders/orderListSlice';
import { formatDate } from '../../../utils/dateHelper';

const ManageOrders = () => {
  const { loading, error, orders, page, totalPages, limit } = useSelector(
    orderListSelector
  );
  const dispatch = useDispatch();

  const onPageChange = (e, { activePage }) => {
    dispatch(fetchOrderList(activePage, limit));
  };
  useEffect(() => {
    return () => {
      dispatch(resetAdminOrders());
    };
  }, []);
  useEffect(() => {
    dispatch(fetchOrderList(page, limit));
  }, [dispatch]);
  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Orders management
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
                  <Table.HeaderCell>#Order</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Client Name</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.map((order, index) => (
                  <Table.Row key={order._id}>
                    <Table.Cell>{index + 1 + (page - 1) * limit}</Table.Cell>
                    <Table.Cell>
                      {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                    </Table.Cell>
                    <Table.Cell>
                      {order.firstName
                        ? order.firstName + ' ' + order.lastName
                        : 'N/A'}
                    </Table.Cell>
                    <Table.Cell>{order.description || 'N/A'}</Table.Cell>
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
