import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Image, Divider, Button } from 'semantic-ui-react';
import OpportunityStatus from './OpportunityStatus';
import { authLoginSelector } from '../features/auth/authLoginSlice';
import { useState } from 'react';

const style = { color: 'blue', cursor: 'pointer' };
const Opportunity = ({ opportunity }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const { userLogin } = useSelector(authLoginSelector);
  const application = opportunity.participants.includes(userLogin.id);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header className='my-3'>
          <Link
            className='secondary-color'
            to={`/opportunities/${opportunity._id}`}
          >
            {opportunity.name}
          </Link>
        </Card.Header>
        <Card.Meta className='mb-3'>
          <Link to={`/opportunities/${opportunity._id}`}>
            <OpportunityStatus status={opportunity.status} />
          </Link>
        </Card.Meta>
        <Card.Description className='mb-3'>
          {opportunity.description.length > 203 ? (
            <>
              {showMore ? (
                opportunity.description
              ) : (
                <>{opportunity.description.substr(0, 203)}... </>
              )}
              <span style={style} onClick={() => setShowMore((prev) => !prev)}>
                {' '}
                {showMore ? 'Show Less' : 'Show More'}
              </span>
            </>
          ) : (
            opportunity.description
          )}
        </Card.Description>
        {application.length > 0 ? (
          <>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() =>
                  navigate({
                    pathname: `/opportunityresponse/${opportunity._id}`,
                  })
                }
                primary
                className='btn'
                content='Start'
              />
            </div>
            <div
              className='mt-3'
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                onClick={() =>
                  navigate({
                    pathname: `/opportunityevaluate/${opportunity._id}`,
                  })
                }
                primary
                className='btn'
                content='Evaluate'
              />
            </div>
          </>
        ) : (
          <>
            <Image
              src='/images/team.svg'
              className='d-inline-block'
              verticalAlign='middle'
            />
            <span className='secondary-color'>
              {opportunity.participants.length}
            </span>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default Opportunity;
