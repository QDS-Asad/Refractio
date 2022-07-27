import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  fetchResponses,
  opportunityEvaluateSelector,
  submitEvaluation,
} from '../../../features/opportunities/opportunityEvaluateSlice';
import { Button, Grid, Header, Message, Form } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EvaluateForm from '../../../components/EvaluateForm';
import PublishEvaluation from './PublishEvaluation';
import { current } from '@reduxjs/toolkit';

const OpportunityEvaluate = () => {
  const [viewSubmit, setViewSubmit] = useState(false);
  const [viewMessage, setViewMessage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState(1);
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    trigger,
    watch,
    getValues,
  } = useForm({
    mode: 'onBlur',
  });
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, opportunity, responses } = useSelector(
    opportunityEvaluateSelector
  );
  // hook to fetch items
  useEffect(() => {
    dispatch(fetchResponses(id));
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (responses && responses.length > 0) {
      for (let i = 0; i < responses.length; i++) {
        register(
          { name: `comprehension_${responses[i].name}` },
          {
            required: 'Evaluation of comprehension is required.',
          }
        );
        register(
          { name: `qualityOfIdea_${responses[i].name}` },
          {
            required: 'Evaluation of quality of Idea-Response is required.',
          }
        );
        setValue((`comprehension_${responses[i].name}`, ''));
        setValue((`qualityOfIdea_${responses[i].name}`, ''));
      }
    }
  }, [responses]);
  const onDrafting = async () => {
    if (responses && responses.length > 0) {
      const responseId = responses[currentParticipant - 1]._id;
      const name = responses[currentParticipant - 1].name;
      draftEvaluation(
        values[`qualityOfIdea_${name}`],
        values[`comprehension_${name}`],
        responseId
      );
    }
  };
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };
  const handleEdit = (data) => {
    setViewSubmit(true);
  };
  const draftEvaluation = (comp = '', qual = '', resId) => {
    const body = {
      status: 'draft',
      comprehension: {
        score: comp,
      },
      qualityOfIdea: {
        score: qual,
      },
    };
    dispatch(submitEvaluation(resId, id, body));
  };
  const values = getValues();
  return (
    <>
      {opportunity && responses && (
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
                type='submit'
                form='submit-evaluation'
                className='btn-secondary'
                floated='right'
                disabled={loading || currentParticipant < responses.length}
              >
                Submit
              </Button>
              <PublishEvaluation
                viewSubmit={viewSubmit}
                setViewSubmit={setViewSubmit}
                onSubmittion={onDrafting}
              />
              <Button
                onClick={onDrafting}
                primary
                className='btn-outline me-3'
                floated='right'
                disabled={loading}
              >
                Save as Draft
              </Button>
            </Header>
            <div style={{ padding: '1em' }}>
              <Form
                id='submit-evaluation'
                error
                size='small'
                onSubmit={handleSubmit(handleEdit)}
                loading={loading}
              >
                {error && (
                  <Message color='red' className='error-message'>
                    {error}
                  </Message>
                )}
                {responses &&
                  responses.map(
                    (response, index) =>
                      currentParticipant === index + 1 && (
                        <EvaluateForm
                          setCurrentQuestion={setCurrentQuestion}
                          currentQuestion={currentQuestion}
                          response={response}
                          currentParticipant={currentParticipant}
                          setCurrentParticipant={setCurrentParticipant}
                          totalParticipants={responses.length}
                          quality={response.comprehension}
                          comprehension={response.qualityOfIdea}
                          handleChange={handleChange}
                          trigger={trigger}
                          setValue={setValue}
                          watch={watch}
                          draftEvaluation={draftEvaluation}
                          errors={errors}
                          allQuestions={
                            response.comprehension.length +
                            response.qualityOfIdea.length
                          }
                        />
                      )
                  )}
              </Form>
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
