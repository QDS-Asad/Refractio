import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

const EmptyOpportunities = () => {
  return (
    <Grid
      verticalAlign='middle'
      columns={2}
      centered
      className='opportunities-tabs-height'
    >
      <Grid.Row>
        <Grid.Column className='text-center'>
          <Header as='h3' className='secondary-color'>
            START YOUR FIRST OPPORTUNITY
            <Header.Subheader>
              There are no opportunities. Start creating your first opportunity.
            </Header.Subheader>
          </Header>
          <Button primary className='btn'>
            Create New
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default EmptyOpportunities;
