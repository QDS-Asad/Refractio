import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  opportunityEvaluateSelector,
} from '../../../features/opportunities/opportunityEvaluateSlice';
import { Button, Grid, Header, Message } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import EvaluateForm from '../../../components/EvaluateForm';
import PublishEvaluation from './PublishEvaluation';

const OpportunityEvaluate = () => {
  const [viewSubmit, setViewSubmit] = useState(false);
  const [viewMessage, setViewMessage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [comprehensionRating, setComprehensionRating] = useState('1');
  const [ideaRating, setIdeaRating] = useState('1');
  const { id } = useParams();

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { error, opportunity } = useSelector(opportunityEvaluateSelector);
  const handleComprehensionChange = (e, { value }) => {
    setComprehensionRating(value);
  };
  const handleIdeaChange = (e, { value }) => {
    setIdeaRating(value);
  };
  // hook to fetch items
  useEffect(() => {
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);

  const onSubmittion = async () => {
    setViewMessage(true);
    setTimeout(() => {
      setViewMessage(false);
    }, 3000);
  };
  return (
    <>
      {opportunity && (
        <Grid stretched>
          <Grid.Column width={11}>
            {viewMessage && (
              <Message
                positive
                content='Your response has been saved.'
                className='error-message mb-3'
              />
            )}
            <Header as='h3' className='primary-dark-color'>
              {opportunity.name}
              <Button
                onClick={() => setViewSubmit(true)}
                className='btn-secondary'
                floated='right'
              >
                Submit
              </Button>
              <PublishEvaluation
                viewSubmit={viewSubmit}
                setViewSubmit={setViewSubmit}
                onSubmittion={onSubmittion}
              />
              <Button
                onClick={onSubmittion}
                primary
                className='btn-outline me-3'
                floated='right'
              >
                Save as Draft
              </Button>
            </Header>
            <div style={{ padding: '1em' }}>
              {error && (
                <Message color='red' className='error-message'>
                  {error}
                </Message>
              )}
              <EvaluateForm
                handleIdeaChange={handleIdeaChange}
                ideaRating={ideaRating}
                comprehensionRating={comprehensionRating}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
                handleComprehensionChange={handleComprehensionChange}
                quality={opportunity.comprehension.question}
                comprehension={opportunity.qualityOfIdea.questions}
                allQuestions={
                  [
                    ...opportunity.comprehension.question,
                    ...opportunity.qualityOfIdea.questions,
                  ].length
                }
              />
            </div>
          </Grid.Column>
          <>
            <Grid.Column
              width={5}
              style={{ backgroundColor: '#EDF1F6', height: '100%' }}
            >
              <div className='clearfix'>
                <Header floated='left'>Opportunity Information</Header>
              </div>
              <Header size='small'>
                Opportunity Name
                <Header.Subheader className='mt-3'>
                  {opportunity.name}
                </Header.Subheader>
              </Header>
              <Header size='small'>
                Description
                <Header.Subheader className='mt-3'>
                  {opportunity.description}
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </>
        </Grid>
      )}
    </>
  );
};

export default OpportunityEvaluate;
