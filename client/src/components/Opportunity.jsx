import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import OpportunityStatus from './OpportunityStatus';

const Opportunity = ({ opportunity }) => {
  return (
    <Card fluid to={`/opportunities/${opportunity._id}`} as={Link}>
      <Card.Content>
        <Card.Header className='secondary-color my-3'>
          {opportunity.name}
        </Card.Header>
        <Card.Meta className='mb-3'>
          <OpportunityStatus status={opportunity.status} />
        </Card.Meta>
        <Card.Description className='mb-3'>
          {opportunity.description}
        </Card.Description>
        <Image
          src='/images/team.svg'
          className='d-inline-block'
          verticalAlign='middle'
        />
        <span className='secondary-color'>
          {opportunity.participants.length}
        </span>
      </Card.Content>
    </Card>
  );
};

export default Opportunity;
