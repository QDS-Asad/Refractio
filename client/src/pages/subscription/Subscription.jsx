import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  List,
  Loader,
  Message,
  Radio,
  Segment,
} from 'semantic-ui-react';
import {
  authLoginSelector,
  updateUserStatus,
} from '../../features/auth/authLoginSlice';
import {
  fetchPlans,
  planListSelector,
} from '../../features/plans/planListSlice';
import {
  resetUserSubscription,
  subscriptionSelector,
  userSubscription,
} from '../../features/subscriptions/subscriptionSlice';
import {
  cancelWorkspace,
  workspaceSelectSelector,
} from '../../features/workspace/workspaceSelectSlice';

const Subscription = () => {
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      autoRenew: true,
    },
  });
  const [prices, setPrices] = useState([]);

  const { userLogin } = useSelector(authLoginSelector);

  const { userWorkspace } = useSelector(workspaceSelectSelector);

  const { loading, error, plans } = useSelector(planListSelector);

  const { loading: formLoading, error: formError, success } = useSelector(
    subscriptionSelector
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCreate = (data) => {
    // dispatch user subscription;
    dispatch(userSubscription(userLogin.id, data));
  };

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const handlePlanChange = (e, change) => {
    e.persist();
    setValue(change.name, change.value);
    trigger(change.name);
    setPrices(plans.find((a) => a.id === change.value).prices);
  };

  const handlePriceChange = (e, change) => {
    e.persist();
    setValue(change.name, change.value);
    trigger(change.name);
  };

  const handleChangeCheckBox = (e) => {
    e.persist();
    setValue(e.target.name, e.target.checked);
    trigger(e.target.name);
  };

  const createOptions = {
    planId: {
      required: 'Plan is required',
    },
    priceId: {
      required: 'Pricing is required',
    },
    teamName: {
      required: 'Team name is required',
      maxLength: {
        value: 50,
        message: "Team name can't exceed from 50 characters",
      },
    },
    nameOnCard: {
      required: 'Name on card is required',
    },
    cardNumber: {
      required: 'Card number is required',
    },
    cardExpiry: {
      required: 'Card expiry is required',
      pattern: {
        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        message: 'Invalid expiry date.',
      },
    },
    cardCvv: {
      required: 'Card Cvv is required',
      maxLength: {
        value: 3,
        message: "Card cvc can't exceed from 3 numbers",
      },
      minLength: {
        value: 3,
        message: 'Enter at least 3 numbers',
      },
      pattern: {
        value: /^[0-9]*$/,
        message: 'Only numbers are allowed',
      },
    },
  };

  const handleGoToApplication = () => {
    navigate('/');
    dispatch(resetUserSubscription());
  };

  const cancelNewWorkspace = () => {
    dispatch(cancelWorkspace());
    navigate('/workspaces');
  };

  useEffect(() => {
    register({ name: 'planId' }, createOptions.planId);
    register({ name: 'priceId' }, createOptions.priceId);
    register({ name: 'teamName' }, createOptions.teamName);
    register({ name: 'nameOnCard' }, createOptions.nameOnCard);
    register({ name: 'cardNumber' }, createOptions.cardNumber);
    register({ name: 'cardExpiry' }, createOptions.cardExpiry);
    register({ name: 'cardCvv' }, createOptions.cardCvv);
    register({ name: 'autoRenew' });
    register({ name: 'couponCode' });
    dispatch(fetchPlans());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(updateUserStatus());
    }
  }, [success]);

  return (
    <Container>
      {userWorkspace && userWorkspace.isRegistered && (
        <Button className='btn' onClick={cancelNewWorkspace}>
          Back
        </Button>
      )}

      <Card fluid>
        <Card.Content>
          {success ? (
            <Grid className='px-3' centered columns={2}>
              <Grid.Column className='text-center'>
                <Icon name='check circle' size='huge' color='green' />
                <h3>Subscription completed successfully!</h3>
                <Button className='btn' onClick={handleGoToApplication}>
                  Go to Application
                </Button>
              </Grid.Column>
            </Grid>
          ) : (
            <Grid className='px-3'>
              <Grid.Row columns={2}>
                <Grid.Column computer={16} largeScreen={10} widescreen={10}>
                  <Card.Header as='h3' className='mb-4'>
                    Choose Plan
                  </Card.Header>
                  <Loader active={loading} inline='centered' />
                  {error && (
                    <Message color='red' className='error-message mb-3'>
                      {error}
                    </Message>
                  )}
                  {plans.map((plan) => (
                    <Segment className='mx-2' key={plan.id}>
                      <Form.Field>
                        <Radio
                          name='planId'
                          value={plan.id}
                          checked={plan.id === watch('planId')}
                          label={
                            <label>
                              <strong className='fw-bold fs-5'>
                                {plan.name}
                              </strong>
                              <Header.Subheader className='mt-2'>
                                {plan.description}
                              </Header.Subheader>
                            </label>
                          }
                          onChange={handlePlanChange}
                        />
                        {errors && errors.planId && (
                          <Message error content={errors.planId.message} />
                        )}
                      </Form.Field>
                    </Segment>
                  ))}
                  {prices.length > 0 && (
                    <>
                      <Card.Header as='h3' className='mt-4 mb-3'>
                        Choose Billing Cycle
                      </Card.Header>
                      {prices.map((price) => (
                        <Segment className='mx-2' key={price.id}>
                          <Form.Field>
                            <Radio
                              name='priceId'
                              value={price.id}
                              checked={price.id === watch('priceId')}
                              label={
                                <label>
                                  <strong className='fw-bold fs-5 '>
                                    Pay{' '}
                                    <span className='text-capitalize'>
                                      {price.interval}ly
                                    </span>
                                  </strong>
                                  <Header.Subheader className='mt-2'>
                                    ${price.amount} / per {price.interval}
                                  </Header.Subheader>
                                </label>
                              }
                              onChange={handlePriceChange}
                            />
                            {errors && errors.priceId && (
                              <Message error content={errors.priceId.message} />
                            )}
                          </Form.Field>
                        </Segment>
                      ))}
                    </>
                  )}

                  <Card.Header as='h3' className='mt-4 mb-3'>
                    Payment Method
                  </Card.Header>
                  {formError && (
                    <Message color='red' className='error-message mb-3'>
                      {formError}
                    </Message>
                  )}
                  <Form
                    id='subscription'
                    onSubmit={handleSubmit(handleCreate)}
                    loading={formLoading}
                    error
                  >
                    <Form.Field className='mb-3'>
                      <label>Team Name</label>
                      <Form.Input
                        name='teamName'
                        fluid
                        placeholder='Enter team name'
                        error={!!errors.teamName}
                        onBlur={handleChange}
                      />

                      {errors && errors.teamName && (
                        <Message error content={errors.teamName.message} />
                      )}
                    </Form.Field>
                    <Form.Field className='mb-3'>
                      <label>Name on card</label>
                      <Form.Input
                        name='nameOnCard'
                        fluid
                        placeholder='Enter name on card'
                        error={!!errors.nameOnCard}
                        onBlur={handleChange}
                      />

                      {errors && errors.nameOnCard && (
                        <Message error content={errors.nameOnCard.message} />
                      )}
                    </Form.Field>
                    <Form.Field className='mb-3'>
                      <label>Card number</label>
                      <Form.Input
                        name='cardNumber'
                        fluid
                        placeholder='0000 0000 0000 0000'
                        error={!!errors.cardNumber}
                        onBlur={handleChange}
                      />

                      {errors && errors.cardNumber && (
                        <Message error content={errors.cardNumber.message} />
                      )}
                    </Form.Field>
                    <Form.Group widths='equal'>
                      <Form.Field className='mb-3'>
                        <label>Expiration Date</label>
                        <Form.Input
                          name='cardExpiry'
                          fluid
                          placeholder='MM/YY'
                          error={!!errors.cardExpiry}
                          onBlur={handleChange}
                        />

                        {errors && errors.cardExpiry && (
                          <Message error content={errors.cardExpiry.message} />
                        )}
                      </Form.Field>
                      <Form.Field className='mb-3'>
                        <label>CVC</label>
                        <Form.Input
                          name='cardCvv'
                          fluid
                          placeholder='3 digits'
                          error={!!errors.cardCvv}
                          onBlur={handleChange}
                        />

                        {errors && errors.cardCvv && (
                          <Message error content={errors.cardCvv.message} />
                        )}
                      </Form.Field>
                    </Form.Group>
                    <Form.Field>
                      <Checkbox
                        label='Autorenewal subscription'
                        name='autoRenew'
                        onBlur={handleChangeCheckBox}
                        defaultChecked={true}
                      />
                    </Form.Field>
                    <Button type='submit' fluid primary className='mt-3 btn'>
                      Pay
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column
                  computer={16}
                  largeScreen={6}
                  widescreen={6}
                  className='mt-5'
                >
                  <Card fluid>
                    <Card.Content>
                      <List divided relaxed='very'>
                        <List.Item className='py-4'>
                          <Card.Header as='h3' className='text-uppercase'>
                            Summary of Your Purchase
                          </Card.Header>
                        </List.Item>
                        <List.Item className='py-4'>
                          <List.Content floated='right' className='fs-3 my-3'>
                            $
                            {prices &&
                            prices.find((a) => a.id === watch('priceId'))
                              ? prices.find((a) => a.id === watch('priceId'))
                                  .amount
                              : 0}
                          </List.Content>
                          <div>
                            <strong className='fw-bold fs-5 '>
                              {plans &&
                              plans.find((a) => a.id === watch('planId')) ? (
                                plans.find((a) => a.id === watch('planId')).name
                              ) : (
                                <>Select Plan</>
                              )}
                            </strong>
                            <Header.Subheader className='mt-2'>
                              $
                              {prices &&
                              prices.find((a) => a.id === watch('priceId')) ? (
                                <>
                                  {
                                    prices.find(
                                      (a) => a.id === watch('priceId')
                                    ).amount
                                  }{' '}
                                  / per&nbsp;
                                  {
                                    prices.find(
                                      (a) => a.id === watch('priceId')
                                    ).interval
                                  }
                                </>
                              ) : (
                                <>0 / per month</>
                              )}
                            </Header.Subheader>
                          </div>
                        </List.Item>
                        <List.Item className='pt-4 pb-5'>
                          <Form.Field className='mb-3'>
                            <label className='mb-2'>Coupon code</label>
                            <Form.Input
                              name='email'
                              fluid
                              placeholder='Enter coupon code'
                              tabIndex='1'
                              action
                            >
                              <input />
                              <Button type='submit' className='btn text-center'>
                                Apply
                              </Button>
                            </Form.Input>
                          </Form.Field>
                        </List.Item>
                        <List.Item>
                          <List.Content floated='right'>$0</List.Content>
                          Discount:
                        </List.Item>
                        <List.Item>
                          <List.Content floated='right'>
                            $
                            {prices &&
                            prices.find((a) => a.id === watch('priceId'))
                              ? prices.find((a) => a.id === watch('priceId'))
                                  .amount
                              : 0}
                          </List.Content>
                          Sub Total:
                        </List.Item>
                        <List.Item>
                          <List.Content
                            floated='right'
                            className='fw-bold fs-4'
                          >
                            $
                            {prices &&
                            prices.find((a) => a.id === watch('priceId'))
                              ? prices.find((a) => a.id === watch('priceId'))
                                  .amount
                              : 0}
                          </List.Content>
                          <span className='fw-bold fs-4'>Total:</span>
                          <p className='mt-5'>
                            Unless you make any changes to your plan, you will
                            be billed automatically every month. You may cancel
                            your subscription at any time.
                          </p>
                          <a
                            href='mailto:help@refractio.com'
                            className='primary-dark-color'
                          >
                            help@refractio.com
                          </a>
                        </List.Item>
                      </List>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Subscription;
