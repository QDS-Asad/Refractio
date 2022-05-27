import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunities,
  opportunityListSelector,
} from '../../../features/opportunities/opportunityListSlice';
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Loader,
  Menu,
  Message,
  Segment,
  Image,
} from 'semantic-ui-react';
import AllOpportunities from './AllOpportunities';
import CompletedOpportunities from './CompletedOpportunities';
import EmptyOpportunities from './EmptyOpportunities';

const Opportunities = () => {
  const [activeItem, setActiveItem] = useState('all');

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, opportunities } = useSelector(
    opportunityListSelector
  );

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  const renderItems = () => {
    // loading state
    if (loading)
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
          <Image src='/images/card-dark.png' className='d-inline-block' />
          <Image src='/images/card-dark.png' className='d-inline-block' />
        </Segment>
      );

    // error state
    if (error) return <Message>{error}</Message>;

    // regular data workflow
    return (
      <>
        {opportunities.length === 0 && <EmptyOpportunities />}
        {opportunities.length > 0 && activeItem === 'all' && (
          <AllOpportunities opportunities={opportunities} />
        )}
        {opportunities.length > 0 && activeItem === 'completed' && (
          <CompletedOpportunities opportunities={opportunities} />
        )}
      </>
    );
  };

  return (
    <>
      <Grid>
        <Grid.Column floated='left' width={5}>
          <Header as='h3' className='primary-dark-color'>
            Opportunities
          </Header>
        </Grid.Column>
        <Grid.Column floated='right' width={2}>
          <Button primary className='btn'>
            Create New
          </Button>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <Menu pointing secondary>
            <Menu.Item
              name='All'
              active={activeItem === 'all'}
              onClick={() => setActiveItem('all')}
              className='opportunities-tabs'
            />
            <Menu.Item
              name='Completed'
              active={activeItem === 'completed'}
              onClick={() => setActiveItem('completed')}
              className='pportunities-tabs'
            />
          </Menu>
        </Grid.Column>
      </Grid>
      {renderItems()}
    </>
  );
};

export default Opportunities;
