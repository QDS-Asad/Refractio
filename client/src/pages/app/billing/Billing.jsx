import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
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
          <Segment>
            <SubscriptionDetails />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <Segment>
            <PaymentHistory />
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Billing;
