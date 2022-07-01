import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Grid, List, Message, Segment } from 'semantic-ui-react';
import { SUBSCRIPTION_STATUS } from '../../../common/constants';
import {
  fetchSubscriptionDetail,
  subscriptionDetailSelector,
} from '../../../features/subscriptions/subscriptionDetailSlice';
import { formatDate } from '../../../utils/dateHelper';
import CancelSubscription from './CancelSubscription';
import ChangeCard from './ChangeCard';
import ResumeSubscription from './ResumeSubscription';

const SubscriptionDetails = () => {
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [resumeSubscription, setResumeSubscription] = useState(false);
  const [changeCard, setChangeCard] = useState(false);

  const cancelSubscriptionHandler = () => {
    setCancelSubscription(true);
  };

  const resumeSubscriptionHandler = () => {
    setResumeSubscription(true);
  };

  const changeCardHandler = () => {
    setChangeCard(true);
  };

  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, subscription } = useSelector(
    subscriptionDetailSelector
  );

  useEffect(() => {
    !changeCard &&
      !cancelSubscription &&
      !resumeSubscription &&
      dispatch(fetchSubscriptionDetail());
  }, [changeCard, cancelSubscription, resumeSubscription]);

  return (
    <Segment loading={loading}>
      <Card.Header as='h3' className='py-2'>
        Subscription Details
      </Card.Header>
      {error && (
        <Message color='red' className='error-message mb-3'>
          {error}
        </Message>
      )}
      {subscription && (
        <List divided relaxed='very'>
          <List.Item className='px-3'>
            <List.Content>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <p className='pt-2 fw-bold'>Plan</p>
                  </Grid.Column>

                  <Grid.Column>
                    <p className='pt-2'>
                      {subscription.planName}, {subscription.interval}ly
                    </p>
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
                  {subscription.status === SUBSCRIPTION_STATUS.ACTIVE && (
                    <p className='pt-2'>
                      ${subscription.amount} -{' '}
                      {formatDate(subscription.nextBillingAt)}{' '}
                      {subscription.autoRenew && (
                        <span>(Billed automatically)</span>
                      )}
                    </p>
                  )}
                  {subscription.status === SUBSCRIPTION_STATUS.CANCELED && (
                    <p className='pt-2'>Canceled</p>
                  )}
                </Grid.Column>
                <Grid.Column>
                  {subscription.status === SUBSCRIPTION_STATUS.ACTIVE && (
                    <>
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
                    </>
                  )}
                  {subscription.status === SUBSCRIPTION_STATUS.CANCELED && (
                    <>
                      <Button
                        className='btn-link'
                        floated='right'
                        onClick={() => resumeSubscriptionHandler()}
                      >
                        Resume Subscription
                      </Button>
                      <ResumeSubscription
                        resumeSubscription={resumeSubscription}
                        setResumeSubscription={setResumeSubscription}
                      />
                    </>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </List.Item>
          {subscription.PaymentMethod && (
            <List.Item className='px-3'>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <p className='pt-2 fw-bold'>Payment Method</p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className='pt-2'>
                      <span className='text-capitalize'>
                        {subscription.PaymentMethod.brand}
                      </span>{' '}
                      <span className='text-capitalize'>
                        {subscription.PaymentMethod.type}
                      </span>{' '}
                      **** **** **** {subscription.PaymentMethod.last4Digits}
                    </p>
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
          )}
        </List>
      )}
    </Segment>
  );
};

export default SubscriptionDetails;
