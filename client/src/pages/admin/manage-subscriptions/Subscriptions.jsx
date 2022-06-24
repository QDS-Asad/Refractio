import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Header,
  Button,
  Card,
  Dropdown,
  List,
  Loader,
  Message,
} from 'semantic-ui-react';
import {
  fetchPlans,
  planListSelector,
} from '../../../features/plans/planListSlice';
import AddSubscriptionPlan from './AddSubscriptionPlan';
import EditSubscriptionPlan from './EditSubscriptionPlan';
import RemoveSubscriptionPlan from './RemoveSubscriptionPlan';
const Subscriptions = () => {
  const [addPlan, setAddPlan] = useState(false);
  const [editPlan, setEditPlan] = useState(false);
  const [removePlan, setRemovePlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { loading, error, plans } = useSelector(planListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    !addPlan && !editPlan && !removePlan && dispatch(fetchPlans());
  }, [dispatch, addPlan, editPlan, removePlan]);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setEditPlan(true);
  };
  const handleRemove = (plan) => {
    setSelectedPlan(plan);
    setRemovePlan(true);
  };
  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Subscription management
          </Header>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button
            primary
            className='btn'
            floated='right'
            onClick={() => setAddPlan(true)}
          >
            Add
          </Button>
          <AddSubscriptionPlan addPlan={addPlan} setAddPlan={setAddPlan} />
          <EditSubscriptionPlan
            editPlan={editPlan}
            setEditPlan={setEditPlan}
            plan={selectedPlan}
          />
          <RemoveSubscriptionPlan
            removePlan={removePlan}
            setRemovePlan={setRemovePlan}
            plan={selectedPlan}
          />
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
                <Card.Header>
                  {plan.name}
                  <Dropdown icon='ellipsis horizontal' className='float-end'>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(plan)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRemove(plan)}>
                        Remove
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <List>
                  <List.Item>{plan.description}</List.Item>
                  {plan.prices && plan.prices.map((price) => (
                    <List.Item>${price.amount} / per {price.interval}</List.Item>
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
