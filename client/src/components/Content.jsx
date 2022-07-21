import React from 'react';
import { Card, Divider, Button } from 'semantic-ui-react';
import { useState } from 'react';
const description =
  'You will benefit from the product by maintaining control over important company informationYou will benefit from the product by maintaining control over important company informationYou will benefit from the product by maintaining control over important company information  ...view more.';
const Content = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header className='my-3'>Home: Hero image</Card.Header>
        <Card.Description className='mb-3'>
          {showMore ? description : <>{description.substr(0, 203)}...</>}
          {description.length > 203 && (
            <a
              style={{ color: 'blue' }}
              onClick={() => setShowMore((prev) => !prev)}
            >
              {' '}
              {showMore ? 'Show Less' : 'Show More'}
            </a>
          )}
        </Card.Description>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button primary className='btn' content='Edit' />
        </div>
      </Card.Content>
    </Card>
  );
};

export default Content;
