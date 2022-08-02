import React from 'react';
import { Label } from 'semantic-ui-react';

const OpportunityStatus = ({ status }) => {
  let bgColor = '';
  switch (status.toLowerCase()) {
    case 'publish':
      bgColor = 'success-bg';
      break;
    case 'draft':
      bgColor = 'secondary-bg';
      break;
    case 'completed':
      bgColor = 'primary-bg';
      break;
    default:
      break;
  }
  return (
    <Label className={`${bgColor} white-color text-capitalize`}>
      {status.toLowerCase() === 'publish' ? 'Published' : status}
    </Label>
  );
};

export default OpportunityStatus;
