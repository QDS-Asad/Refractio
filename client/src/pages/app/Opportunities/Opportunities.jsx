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
  Message,
  Segment,
  Image,
  Tab,
} from 'semantic-ui-react';
import AllOpportunities from './AllOpportunities';
import CompletedOpportunities from './CompletedOpportunities';
import EmptyOpportunities from './EmptyOpportunities';
import OpportunityCreate from './OpportunityCreate';
import { authLoginSelector } from '../../../features/auth/authLoginSlice';
import { ROLES } from '../../../common/constants';

const Opportunities = () => {
  const [showCreate, setShowCreate] = useState(false);
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, opportunities, completedOpportunities } = useSelector(
    opportunityListSelector
  );

  const { userLogin } = useSelector(authLoginSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  const renderItems = (activeItem) => {
    // loading state
    if (loading)
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
          {/* <Image src='/images/card-dark.png' className='d-inline-block' />
          <Image src='/images/card-dark.png' className='d-inline-block' /> */}
        </Segment>
      );

    // error state
    if (error) return <Message>{error}</Message>;

    // regular data workflow
    return (
      <>
        {opportunities.length === 0 && (
          <EmptyOpportunities
            roleId={userLogin.role.roleId}
            setShowCreate={setShowCreate}
          />
        )}
        {opportunities.length > 0 && activeItem === 'all' && (
          <AllOpportunities opportunities={opportunities} />
        )}
        {opportunities.length > 0 && activeItem === 'completed' && (
          <CompletedOpportunities opportunities={completedOpportunities} />
        )}
        <OpportunityCreate
          showCreate={showCreate}
          setShowCreate={setShowCreate}
        />
      </>
    );
  };

  const panes = [
    {
      menuItem: 'All',
      render: () => <Tab.Pane attached={false}>{renderItems('all')}</Tab.Pane>,
    },
    {
      menuItem: 'Completed',
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {renderItems('completed')}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Opportunities
          </Header>
        </Grid.Column>
        {(userLogin.role.roleId === ROLES.ADMIN ||
          userLogin.role.roleId === ROLES.ORGANIZER) && (
          <Grid.Column width={8}>
            <Button
              primary
              className='btn'
              onClick={() => setShowCreate(true)}
              floated='right'
            >
              Create New
            </Button>
          </Grid.Column>
        )}
      </Grid>
      <Grid>
        <Grid.Column>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Opportunities;
