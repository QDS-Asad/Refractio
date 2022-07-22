import React from 'react';
import { Grid } from 'semantic-ui-react';
import Content from '../../../components/Content.jsx';
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ManageContent = () => {
  return (
    <Grid stackable columns={4}>
      {data.map((opportunity) => (
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={8}
          largeScreen={5}
          widescreen={4}
          key={opportunity._id}
        >
          <Content />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ManageContent;
