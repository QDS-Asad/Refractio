import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  opportunityDetailSelector,
} from '../../../features/opportunities/opportunityDetailSlice';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  List,
  Message,
  Modal,
  Segment,
  Tab,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import OpportunityStatus from '../../../components/OpportunityStatus';

const OpportunityEdit = () => {
  const [viewParticipant, setViewParticipant] = useState(false);
  const { id } = useParams();

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, opportunity } = useSelector(
    opportunityDetailSelector
  );

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);
  const panes = [
    {
      menuItem: 'Questions',
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {opportunity && (
            <>
              <Header>
                Evaluation of Comprehension
                <Header.Subheader>
                  Publish question or prompt that will measure comprehension of
                  the opportunity.
                </Header.Subheader>
              </Header>
              <Form.Field>
                <label>Question 1 (Required)</label>
                <Form.Input
                  name='q1'
                  fluid
                  placeholder='e.g. What is the best reason for Team to pursue Opportunity'
                />
              </Form.Field>

              <Form.Field>
                <label>Question 2</label>
                <Form.Input
                  name='q1'
                  fluid
                  placeholder='e.g. What is the best reason for Team to NOT pursue Opportunity'
                />
              </Form.Field>
              <Header>
                Evaluation of Quality of Idea-Response
                <Header.Subheader>
                  Publish questions that will help participants structure their
                  responses.
                </Header.Subheader>
              </Header>
              <Form.Field>
                <label>Question 1 (Required)</label>
                <Form.Input
                  name='q1'
                  fluid
                  placeholder='e.g. Describe the Stakeholders involved in the Idea you are submitting'
                />
              </Form.Field>

              <Form.Field>
                <label>Question 2</label>
                <Form.Input
                  name='q2'
                  fluid
                  readOnly
                  placeholder='e.g. Describe the EXPECTED RESULTS from action taken to pursue Opportunity'
                />
              </Form.Field>

              <Form.Field>
                <label>Question 3</label>
                <Form.Input
                  name='q3'
                  fluid
                  readOnly
                  placeholder='e.g. Describe the EXPECTED RESULTS from action taken to pursue Opportunity'
                />
              </Form.Field>

              <Form.Field>
                <label>Question 4</label>
                <Form.Input
                  name='q4'
                  fluid
                  readOnly
                  placeholder='e.g. Describe the RISKS from action taken to pursue Opportunity'
                />
              </Form.Field>

              <Form.Field>
                <label>Question 5</label>
                <Form.Input
                  name='q5'
                  fluid
                  readOnly
                  placeholder='e.g. WHEN can or should Team work on pursuing Opportunity? What are DEPENDENCIES?'
                />
              </Form.Field>
            </>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Information',
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {opportunity && (
            <Segment>
              <div className='clearfix'>
                <Header floated='left'>Opportunity Information</Header>
                <Button className='btn-link' floated='right'>
                  Edit
                </Button>
              </div>

              <Header size='small'>
                Opportunity Name
                <Header.Subheader className='mt-3'>
                  {opportunity.name}
                </Header.Subheader>
              </Header>
              <Header size='small'>
                Description
                <Header.Subheader className='mt-3'>
                  {opportunity.description}
                </Header.Subheader>
              </Header>
            </Segment>
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          {opportunity && (
            <Header as='h3' className='primary-dark-color'>
              {opportunity.name}
              <OpportunityStatus status={opportunity.status} />
              <Header.Subheader className='mt-3'>
                <Image
                  src='/images/team.svg'
                  className='d-inline-block'
                  verticalAlign='middle'
                />
                <span className='secondary-color'>
                  {opportunity && opportunity.participants.length}
                </span>

                <Modal
                  onClose={() => setViewParticipant(false)}
                  onOpen={() => setViewParticipant(true)}
                  open={viewParticipant}
                  trigger={
                    <span className='ms-2 fw-bold primary-color'>
                      View Participants
                    </span>
                  }
                  dimmer='blurring'
                  size='tiny'
                >
                  <Modal.Header>Add Participants</Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      <p>
                        Participants will be notified of opportunity via e-mail
                        once it’s published.
                      </p>
                      {opportunity &&
                        opportunity.participants.map((participant) => (
                          <List
                            divided
                            verticalAlign='middle'
                            key={participant._id}
                          >
                            <List.Item>
                              <List.Content floated='right'>
                                <button className='btn btn-outline'>Add</button>
                              </List.Content>

                              <List.Content>
                                <Header>
                                  {participant.name}
                                  <Header.Subheader>
                                    {participant.email}
                                  </Header.Subheader>
                                </Header>
                              </List.Content>
                            </List.Item>
                          </List>
                        ))}
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      content='Add Participants'
                      onClick={() => setViewParticipant(false)}
                      className='btn'
                    />
                    <p className='mt-3'>
                      If a Team Member is not in the list above, please add them
                      first in “Team” section.
                    </p>
                  </Modal.Actions>
                </Modal>
              </Header.Subheader>
            </Header>
          )}
        </Grid.Column>
        <Grid.Column width={8}>
          {opportunity && (
            <>
              <Button primary className='btn-secondary' floated='right'>
                Publish
              </Button>
              <Button primary className='btn-outline me-3' floated='right'>
                Save as Draft
              </Button>
            </>
          )}
        </Grid.Column>
        {opportunity && opportunity.status === 'Draft' && (
          <Grid.Column width={16}>
            <p>
              To publish an Opportunity you need at least one question for
              Comprehension and one for Quality of Idea-Response. You need to
              select the Team Members you want to respond with an Idea.
            </p>
          </Grid.Column>
        )}
      </Grid>
      <Grid>
        <Grid.Column>
          <Form id='create-opportunity' error size='small'>
            {error && (
              <Message color='red' className='error-message'>
                {error}
              </Message>
            )}
            <Tab menu={{ secondary: true, pointing: true }} panes={panes}></Tab>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default OpportunityEdit;
