import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Image, Divider, Button } from "semantic-ui-react";
import OpportunityStatus from "./OpportunityStatus";
import { authLoginSelector } from "../features/auth/authLoginSlice";

const Opportunity = ({ opportunity }) => {
  const navigate = useNavigate();
  const { userLogin } = useSelector(authLoginSelector);
  const application = opportunity.participants.filter(
    (o) => o.email === userLogin.email
  );
  return application.length > 0 ? (
    <Card fluid>
      <Card.Content>
        <Card.Header className="secondary-color my-3">
          {opportunity.name}
        </Card.Header>
        <Card.Meta className="mb-3">
          <OpportunityStatus status={opportunity.status} />
        </Card.Meta>
        <Card.Description className="mb-3">
          {opportunity.description}
        </Card.Description>
        <Divider />
        <Button
          onClick={() =>
            navigate({ pathname: `/opportunityresponse/${opportunity._id}` })
          }
          primary
          className="btn"
          content="Start"
        />
      </Card.Content>
    </Card>
  ) : (
    <Card fluid to={`/opportunities/${opportunity._id}`} as={Link}>
      <Card.Content>
        <Card.Header className="secondary-color my-3">
          {opportunity.name}
        </Card.Header>
        <Card.Meta className="mb-3">
          <OpportunityStatus status={opportunity.status} />
        </Card.Meta>
        <Card.Description className="mb-3">
          {opportunity.description}
        </Card.Description>
        <Image
          src="/images/team.svg"
          className="d-inline-block"
          verticalAlign="middle"
        />
        <span className="secondary-color">
          {opportunity.participants.length}
        </span>
      </Card.Content>
    </Card>
  );
};

export default Opportunity;
