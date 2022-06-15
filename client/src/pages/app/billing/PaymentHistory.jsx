import React from 'react';
import { Header, Pagination, Table } from 'semantic-ui-react';

const PaymentHistory = () => {
  const payments = [
    {
      id: 1,
      status: 'Canceled',
      date: '19/10/2021',
      description: 'Team Plan',
      amount: '7$',
    },
    {
      id: 2,
      status: 'Approved',
      date: '19/09/2021',
      description: 'Team Plan',
      amount: '7$',
    },
    {
      id: 3,
      status: 'Approved',
      date: '19/08/2021',
      description: 'Team Plan',
      amount: '7$',
    },
    {
      id: 4,
      status: 'Failed',
      date: '19/07/2021',
      description: 'Team Plan',
      amount: '7$',
    },
    {
      id: 5,
      status: 'Approved',
      date: '19/06/2021',
      description: 'Team Plan',
      amount: '7$',
    },
    {
      id: 6,
      status: 'Approved',
      date: '19/5/2021',
      description: 'Team Plan',
      amount: '7$',
    },
    {
      id: 7,
      status: 'Approved',
      date: '19/04/2021',
      description: 'Team Plan',
      amount: '7$',
    },
  ];

  return (
    <>
      <Header as='h3' className='py-2'>
        Payment History
      </Header>
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
          {payments.map((payment) => (
            <Table.Row
              key={payment.id}
              negative={payment.status !== 'Approved'}
            >
              <Table.Cell className='px-2'>{payment.status}</Table.Cell>
              <Table.Cell>{payment.date}</Table.Cell>
              <Table.Cell>{payment.description}</Table.Cell>
              <Table.Cell>{payment.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4' className='clearfix'>
              <Pagination
                floated='right'
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={2}
                totalPages={3}
                secondary
                prevItem={null}
                nextItem={null}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default PaymentHistory;
