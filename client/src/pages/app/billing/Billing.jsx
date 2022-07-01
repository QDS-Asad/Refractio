import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PaymentHistory from './PaymentHistory';
import SubscriptionDetails from './SubscriptionDetails';

const Billing = () => {
  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Billing
          </Header>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <SubscriptionDetails />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <PaymentHistory />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Billing;
