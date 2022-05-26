import React, { useState } from 'react';
import {
  Button,
  Container,
  Dimmer,
  Grid,
  Header,
  Loader,
  Menu,
} from 'semantic-ui-react';

const Oppertunities = () => {
  const [activeItem, setActiveItem] = useState('all');
  const [opertunities, setOpertunities] = useState([]);

  return (
    <>
      <Grid>
        <Grid.Column floated='left' width={5}>
          <Header as='h3'>Oppertunities</Header>
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
              className='oppertunities-tabs'
            />
            <Menu.Item
              name='Completed'
              active={activeItem === 'completed'}
              onClick={() => setActiveItem('completed')}
              className='oppertunities-tabs'
            />
          </Menu>
        </Grid.Column>
      </Grid>
      {opertunities.length === 0 && (
        <Grid
          verticalAlign='middle'
          columns={2}
          centered
          className='oppertunities-tabs-height'
        >
          <Grid.Row>
            <Grid.Column className='text-center'>
              {/* <Dimmer active>
                <Loader />
              </Dimmer> */}
              <Header as='h3' style={{ color: '#6C757D' }}>
                START YOUR FIRST OPPORTUNITY
                <Header.Subheader>
                  There are no opportunities. Start creating your first
                  opportunity.
                </Header.Subheader>
              </Header>
              <Button primary className='btn'>
                Create New
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default Oppertunities;
