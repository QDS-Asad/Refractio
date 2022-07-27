import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Message, Pagination, Segment, Table } from 'semantic-ui-react';
import {
  billingListSelector,
  fetchBillingList,
} from '../../../features/billing/billingListSlice';
import { formatDate } from '../../../utils/dateHelper';

const PaymentHistory = () => {
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, billing, page, limit, totalPages } = useSelector(
    billingListSelector
  );

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchBillingList(page, limit));
  }, []);

  const onPageChange = (e, { activePage }) => {
    dispatch(fetchBillingList(activePage, limit));
  };

  return (
    <Segment loading={loading}>
      <Header as='h3' className='py-2'>
        Payment History
      </Header>
      {error && (
        <Message color='red' className='error-message mb-3'>
          {error}
        </Message>
      )}
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='px-2'>Status</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {billing.map((payment) => (
            <Table.Row
              key={payment._id}
              negative={payment.status !== 'Approved'}
            >
              <Table.Cell className='px-2'>{payment.status}</Table.Cell>
              <Table.Cell>{formatDate(payment.createdAt)}</Table.Cell>
              <Table.Cell>{payment.description}</Table.Cell>
              <Table.Cell>${payment.amount}</Table.Cell>
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
  );
};

export default PaymentHistory;
