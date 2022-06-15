import React, { useState } from 'react';
import { Button, Card, Grid, List } from 'semantic-ui-react';
import CancelSubscription from './CancelSubscription';
import ChangeCard from './ChangeCard';

const SubscriptionDetails = () => {
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [changeCard, setChangeCard] = useState(false);

  const cancelSubscriptionHandler = () => {
    setCancelSubscription(true);
  };

  const changeCardHandler = () => {
    setChangeCard(true);
  };

  return (
    <>
      <Card.Header as='h3' className='py-2'>
        Subscription Details
      </Card.Header>
      <List divided relaxed='very'>
        <List.Item className='px-3'>
          <List.Content>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <p className='pt-2 fw-bold'>Plan</p>
                </Grid.Column>

                <Grid.Column>
                  <p className='pt-2'>Team, monthly</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </List.Content>
        </List.Item>
        <List.Item className='px-3'>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <p className='pt-2 fw-bold'>Next Payment</p>
              </Grid.Column>
              <Grid.Column>
                <p className='pt-2'>
                  $7 - April 19, 2021 (Billed automatically)
                </p>
              </Grid.Column>
              <Grid.Column>
                <Button
                  className='btn-link'
                  floated='right'
                  onClick={() => cancelSubscriptionHandler()}
                >
                  Cancel Subscription
                </Button>
                <CancelSubscription
                  cancelSubscription={cancelSubscription}
                  setCancelSubscription={setCancelSubscription}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Item>
        <List.Item className='px-3'>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <p className='pt-2 fw-bold'>Payment Method</p>
              </Grid.Column>
              <Grid.Column>
                <p className='pt-2'>Master Card **** **** **** 9804</p>
              </Grid.Column>
              <Grid.Column>
                <Button
                  className='btn-link'
                  floated='right'
                  onClick={() => changeCardHandler()}
                >
                  Change
                </Button>
                <ChangeCard
                  changeCard={changeCard}
                  setChangeCard={setChangeCard}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Item>
      </List>
    </>
  );
};

export default SubscriptionDetails;
