import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Card, List, Loader, Message } from 'semantic-ui-react';
import {
  fetchPlans,
  planListSelector,
} from '../../../features/plans/planListSlice';
const Subscriptions = () => {
  const { loading, error, plans } = useSelector(planListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Subscription management
          </Header>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={4}>
        <Loader active={loading} inline='centered' />
        {error && (
          <Message color='red' className='error-message mb-3'>
            {error}
          </Message>
        )}
        {plans.map((plan) => (
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            largeScreen={4}
            widescreen={4}
            key={plan.id}
          >
            <Card>
              <Card.Content>
                <Card.Header>{plan.name}</Card.Header>
              </Card.Content>
              <Card.Content>
                <List>
                  <List.Item>{plan.description}</List.Item>
                  {plan.prices &&
                    plan.prices.map((price) => (
                      <List.Item key={price.id}>
                        ${price.amount} / per {price.interval}
                      </List.Item>
                    ))}
                </List>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </>
  );
};

export default Subscriptions;
