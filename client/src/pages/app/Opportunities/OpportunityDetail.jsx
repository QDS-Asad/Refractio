import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  opportunityDetailSelector,
} from '../../../features/opportunities/opportunityDetailSlice';
import {
  Button,
  Grid,
  Header,
  Image,
  List,
  Message,
  Modal,
  Tab,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import OpportunityStatus from '../../../components/OpportunityStatus';

const OpportunityDetail = () => {
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
            </>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Information',
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          Tab 2 Content
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Grid>
        <Grid.Column floated='left' width={5}>
          {opportunity && (
            <Header as='h3' className='primary-dark-color'>
              {opportunity.name}{' '}
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
                  <Modal.Header>Manage Participants</Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      {opportunity &&
                        opportunity.participants.map((participant) => (
                          <List
                            divided
                            verticalAlign='middle'
                            key={participant._id}
                          >
                            <List.Item>
                              <List.Content floated='right'>
                                <button className='btn-link'>Remove</button>
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
                      content='Done'
                      onClick={() => setViewParticipant(false)}
                      className='btn'
                    />
                  </Modal.Actions>
                </Modal>
              </Header.Subheader>
            </Header>
          )}
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          {error && (
            <Message color='red' className='error-message'>
              {error}
            </Message>
          )}
          <Tab menu={{ secondary: true, pointing: true }} panes={panes}></Tab>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default OpportunityDetail;
