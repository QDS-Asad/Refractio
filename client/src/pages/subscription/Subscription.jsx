import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Container,
  Form,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';

const Subscription = () => {
  return (
    <Container>
      <Card fluid>
        <Card.Content>
          <Grid className='px-3'>
            <Grid.Row columns={2}>
              <Grid.Column computer={16} largeScreen={10} widescreen={10}>
                <Card.Header as='h3' className='mb-4'>
                  Choose Plan
                </Card.Header>
                <Segment className='mx-2'>
                  <Checkbox
                    radio
                    label={
                      <label>
                        <strong className='fw-bold fs-5'>Team</strong>
                        <Header.Subheader className='mt-2'>
                          Max of 24 seats. 3 Opportunities can be published at
                          once.
                        </Header.Subheader>
                      </label>
                    }
                  />
                </Segment>

                <Card.Header as='h3' className='mt-4 mb-3'>
                  Choose Billing Cycle
                </Card.Header>
                <Segment className='mx-2'>
                  <Checkbox
                    radio
                    label={
                      <label>
                        <strong className='fw-bold fs-5 '>Pay Monthly</strong>
                        <Header.Subheader className='mt-2'>
                          $7 / per month
                        </Header.Subheader>
                      </label>
                    }
                  />
                </Segment>
                <Card.Header as='h3' className='mt-4 mb-3'>
                  Payment Method
                </Card.Header>
                <Form>
                  <Form.Field className='mb-3'>
                    <label>Name on card</label>
                    <Form.Input
                      name='text'
                      fluid
                      placeholder='Enter name on card'
                    />
                  </Form.Field>
                  <Form.Field className='mb-3'>
                    <label>Card number</label>
                    <Form.Input
                      name='text'
                      fluid
                      placeholder='0000 0000 0000 0000'
                    />
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Field className='mb-3'>
                      <label>Expiration Date</label>
                      <Form.Input name='text' fluid placeholder='MM/YY' />
                    </Form.Field>
                    <Form.Field className='mb-3'>
                      <label>CVV</label>
                      <Form.Input name='text' fluid placeholder='3 digits' />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <Checkbox label='Autorenewal subscription' />
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
                          $7
                        </List.Content>
                        <div>
                          <strong className='fw-bold fs-5 '>Team Plan</strong>
                          <Header.Subheader className='mt-2'>
                            $7 / per month
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
                        <List.Content floated='right'>$7</List.Content>
                        Sub Total:
                      </List.Item>
                      <List.Item>
                        <List.Content floated='right' className='fw-bold fs-4'>
                          $7
                        </List.Content>
                        <span className='fw-bold fs-4'>Total:</span>
                        <p className='mt-5'>
                          Unless you make any changes to your plan, you will be
                          billed automatically every month. You may cancel your
                          subscription at any time.
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
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Subscription;
