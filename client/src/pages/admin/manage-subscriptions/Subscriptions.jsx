import React, { useState } from 'react';
import { Grid, Header, Button, Card, Dropdown, List } from 'semantic-ui-react';
import AddSubscriptionPlan from './AddSubscriptionPlan';
import RemoveSubscriptionPlan from './RemoveSubscriptionPlan';
const Subscriptions = () => {
  const [addPlan, setAddPlan] = useState(false);
  const [removePlan, setRemovePlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = [
    {
      id: '1',
      name: 'Plan : Team',
      description: 'Max of 24 seats. 3 Opportunities can be published at once.',
      pricePerMonth: 7,
      priceAnnually: 70,
    },
  ];

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
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
          <RemoveSubscriptionPlan
            removePlan={removePlan}
            setRemovePlan={setRemovePlan}
            plan={selectedPlan}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          {plans.map((plan) => (
            <Card key={plan.id}>
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
                  <List.Item>${plan.pricePerMonth} / per month</List.Item>
                  <List.Item>${plan.priceAnnually} / annually</List.Item>
                </List>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Subscriptions;
