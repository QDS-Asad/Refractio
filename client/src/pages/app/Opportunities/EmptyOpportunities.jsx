import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import { ROLES } from '../../../common/constants';

const EmptyOpportunities = ({ setShowCreate, roleId }) => {
  return (
    <Grid
      verticalAlign='middle'
      columns={2}
      centered
      className='opportunities-tabs-height'
    >
      <Grid.Row>
        <Grid.Column className='text-center'>
          {roleId === ROLES.ADMIN || roleId === ROLES.ORGANIZER ? (
            <>
              <Header as='h3' className='secondary-color'>
                START YOUR FIRST OPPORTUNITY
                <Header.Subheader>
                  There are no opportunities. Start creating your first
                  opportunity.
                </Header.Subheader>
              </Header>
              <Button
                primary
                className='btn'
                onClick={() => setShowCreate(true)}
              >
                Create New
              </Button>
            </>
          ) : (
            <Header as='h3' className='secondary-color'>
              EMPTY OPPORTUNITIES
              <Header.Subheader>
                There are no opportunities for you to respond.
              </Header.Subheader>
            </Header>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default EmptyOpportunities;
