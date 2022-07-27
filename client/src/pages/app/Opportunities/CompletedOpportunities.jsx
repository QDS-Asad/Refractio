import React from 'react';
import { Grid } from 'semantic-ui-react';
import Opportunity from '../../../components/Opportunity.jsx';

const CompletedOpportunities = ({ opportunities }) => {
  return (
    <Grid stackable columns={4}>
      {opportunities.map((opportunity) => (
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={8}
          largeScreen={5}
          widescreen={4}
          key={opportunity._id}
        >
          <Opportunity opportunity={opportunity} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default CompletedOpportunities;
