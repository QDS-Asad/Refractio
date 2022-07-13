import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOpportunity,
  opportunityDetailSelector,
} from "../../../features/opportunities/opportunityDetailSlice";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Tab,
  Segment,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import OpportunityStatus from "../../../components/OpportunityStatus";
import PublishOpportunity from "./PublishOpportunity";
import ManageParticipants from "./ManageParticipants";
import OpportunityCreate from "./OpportunityCreate";

const OpportunityDetail = () => {
  const [viewParticipant, setViewParticipant] = useState(false);
  const [viewPublish, setViewPublish] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState(false);
  const { id } = useParams();

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, opportunity } = useSelector(
    opportunityDetailSelector
  );

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);

  const panes = [
    {
      menuItem: "Questions",
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {opportunity && (
            <>
              <Header>
                Evaluation of Comprehension
                <Header.Subheader>
                  Publish question or prompt that will measure comprehension of
                  the opportunity.
                </Header.Subheader>
              </Header>
              <Form.Field>
                <label>Question 1 (Required)</label>
                <Form.Input
                  name="q1"
                  fluid
                  placeholder="e.g. What is the best reason for Team to pursue Opportunity"
                />
              </Form.Field>

              <Form.Field>
                <label>Question 2</label>
                <Form.Input
                  name="q1"
                  fluid
                  placeholder="e.g. What is the best reason for Team to NOT pursue Opportunity"
                />
              </Form.Field>
              <Header>
                Evaluation of Quality of Idea-Response
                <Header.Subheader>
                  Publish questions that will help participants structure their
                  responses.
                </Header.Subheader>
              </Header>
              <Form.Field>
                <label>Question 1 (Required)</label>
                <Form.Input
                  name="q1"
                  fluid
                  placeholder="e.g. Describe the Stakeholders involved in the Idea you are submitting"
                />
              </Form.Field>

              <Form.Field>
                <label>Question 2</label>
                <Form.Input
                  name="q2"
                  fluid
                  placeholder="e.g. Describe the EXPECTED RESULTS from action taken to pursue Opportunity"
                />
              </Form.Field>

              <Form.Field>
                <label>Question 3</label>
                <Form.Input
                  name="q3"
                  fluid
                  placeholder="e.g. Describe the EXPECTED RESULTS from action taken to pursue Opportunity"
                />
              </Form.Field>

              <Form.Field>
                <label>Question 4</label>
                <Form.Input
                  name="q4"
                  fluid
                  placeholder="e.g. Describe the RISKS from action taken to pursue Opportunity"
                />
              </Form.Field>

              <Form.Field>
                <label>Question 5</label>
                <Form.Input
                  name="q5"
                  fluid
                  placeholder="e.g. WHEN can or should Team work on pursuing Opportunity? What are DEPENDENCIES?"
                />
              </Form.Field>
            </>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Information",
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {opportunity && (
            <Segment>
              <div className="clearfix">
                <Header floated="left">Opportunity Information</Header>
                {opportunity.status === "draft" && (
                  <>
                    <Button
                      className="btn-link"
                      floated="right"
                      onClick={() => setEditOpportunity((prev) => !prev)}
                    >
                      Edit
                    </Button>
                    <OpportunityCreate
                      showCreate={editOpportunity}
                      setShowCreate={setEditOpportunity}
                      opportunity={opportunity.name}
                    />
                  </>
                )}
              </div>

              <Header size="small">
                Opportunity Name
                <Header.Subheader className="mt-3">
                  {opportunity.name}
                </Header.Subheader>
              </Header>
              <Header size="small">
                Description
                <Header.Subheader className="mt-3">
                  {opportunity.description}
                </Header.Subheader>
              </Header>
            </Segment>
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          {opportunity && (
            <Header as="h3" className="primary-dark-color">
              {opportunity.name}{" "}
              <OpportunityStatus status={opportunity.status} />
              <Header.Subheader className="mt-3">
                <Image
                  src="/images/team.svg"
                  className="d-inline-block"
                  verticalAlign="middle"
                />
                <span className="secondary-color">
                  {opportunity.participants.length}
                </span>

                <span
                  className="ms-2 fw-bold primary-color"
                  onClick={() => setViewParticipant(true)}
                >
                  {opportunity.participants.length > 0
                    ? "View Participants"
                    : "Add Participants"}
                </span>
                <ManageParticipants
                  opportunity={opportunity}
                  viewParticipant={viewParticipant}
                  setViewParticipant={setViewParticipant}
                />
              </Header.Subheader>
            </Header>
          )}
        </Grid.Column>
        {opportunity && opportunity.status === "draft" && (
          <>
            <Grid.Column width={8}>
              <Button
                primary
                className="btn-secondary"
                floated="right"
                onClick={() => setViewPublish(true)}
              >
                Publish
              </Button>
              <PublishOpportunity
                viewPublish={viewPublish}
                setViewPublish={setViewPublish}
              />
              <Button primary className="btn-outline me-3" floated="right">
                Save as Draft
              </Button>
            </Grid.Column>

            <Grid.Column width={16}>
              <p>
                To publish an Opportunity you need at least one question for
                Comprehension and one for Quality of Idea-Response. You need to
                select the Team Members you want to respond with an Idea.
              </p>
            </Grid.Column>
          </>
        )}
      </Grid>
      <Grid>
        <Grid.Column>
          <Form id="create-opportunity" error size="small">
            {error && (
              <Message color="red" className="error-message">
                {error}
              </Message>
            )}
            <Tab menu={{ secondary: true, pointing: true }} panes={panes}></Tab>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default OpportunityDetail;
