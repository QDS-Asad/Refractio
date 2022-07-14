import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Image, Divider, Button } from "semantic-ui-react";
import OpportunityStatus from "./OpportunityStatus";
import { authLoginSelector } from "../features/auth/authLoginSlice";
import { useState } from "react";

const Opportunity = ({ opportunity }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const { userLogin } = useSelector(authLoginSelector);
  const application = opportunity.participants.filter(
    (o) => o.email === userLogin.email
  );
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header className="my-3">
          <Link
            className="secondary-color"
            to={`/opportunities/${opportunity._id}`}
          >
            {opportunity.name}
          </Link>
        </Card.Header>
        <Card.Meta className="mb-3">
          <Link to={`/opportunities/${opportunity._id}`}>
            <OpportunityStatus status={opportunity.status} />
          </Link>
        </Card.Meta>
        <Card.Description className="mb-3">
          {showMore ? (
            opportunity.description
          ) : (
            <>{opportunity.description.substr(0, 203)}...</>
          )}
          <a
            style={{ color: "blue" }}
            onClick={() => setShowMore((prev) => !prev)}
          >
            {" "}
            {showMore ? "Show Less" : "Show More"}
          </a>
        </Card.Description>
        {application.length > 0 ? (
          <>
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() =>
                  navigate({
                    pathname: `/opportunityresponse/${opportunity._id}`,
                  })
                }
                primary
                className="btn"
                content="Start"
              />
            </div>
          </>
        ) : (
          <>
            <Image
              src="/images/team.svg"
              className="d-inline-block"
              verticalAlign="middle"
            />
            <span className="secondary-color">
              {opportunity.participants.length}
            </span>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default Opportunity;
