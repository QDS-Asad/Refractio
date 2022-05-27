import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Image, Segment, Button, Label } from 'semantic-ui-react';

const AllOpportunities = ({ opportunities }) => {
  return (
    <Grid stackable columns={4}>
      {opportunities.map((opportunity) => (
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={8}
          largeScreen={5}
          widescreen={4}
        >
          <Card fluid to='/opportunity' as={Link}>
            <Card.Content>
              <Card.Header className='secondary-color my-3'>
                {opportunity.name}
              </Card.Header>
              <Card.Meta className='mb-3'>
                <Label className='primary-bg white-color text-capitalize'>
                  {opportunity.status}
                </Label>
              </Card.Meta>
              <Card.Description className='mb-3'>
                {opportunity.description}
              </Card.Description>
              <Image
                src='/images/team.svg'
                className='d-inline-block'
                verticalAlign='middle'
              />{' '}
              <span className='secondary-color'>
                {opportunity.participants.length}
              </span>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default AllOpportunities;
