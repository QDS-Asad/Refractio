import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  fetchResponses,
  opportunityEvaluateSelector,
  resetEvaluation,
  submitEvaluation,
} from '../../../features/opportunities/opportunityEvaluateSlice';
import { Button, Grid, Header, Message, Form } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EvaluateForm from '../../../components/EvaluateForm';
import PublishEvaluation from './PublishEvaluation';

const OpportunityEvaluate = () => {
  const [viewSubmit, setViewSubmit] = useState(false);
  const [viewMessage, setViewMessage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState(1);
  const [publishResponse, setPublishResponse] = useState(null);
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
  const {
    loading,
    error,
    opportunity,
    responses,
    success,
    message,
  } = useSelector(opportunityEvaluateSelector);
  // hook to fetch items
  useEffect(() => {
    return () => {
      dispatch(resetEvaluation());
    };
  }, []);
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
        if (responses[i].opportunityEvaluations.comprehensionScore) {
          setValue(
            `comprehension_${responses[i].name}`,
            responses[i].opportunityEvaluations.comprehensionScore
          );
        } else {
          setValue(`comprehension_${responses[i].name}`, '');
        }
        if (responses[i].opportunityEvaluations.qualityOfIdeaScore) {
          setValue(
            `qualityOfIdea_${responses[i].name}`,
            responses[i].opportunityEvaluations.qualityOfIdeaScore
          );
        } else {
          setValue(`qualityOfIdea_${responses[i].name}`, '');
        }
      }
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].evaluation === 'pending') {
          setCurrentParticipant(i + 1);
          break;
        }
      }
    }
  }, [responses]);
  useEffect(() => {
    if (success) {
      setViewMessage(true);
      setTimeout(() => {
        setViewMessage(false);
      }, 4000);
    }
  }, [success]);
  const onDrafting = async () => {
    if (responses && responses.length > 0) {
      const responseId = responses[currentParticipant - 1]._id;
      const name = responses[currentParticipant - 1].name;
      draftEvaluation(
        'draft',
        values[`comprehension_${name}`],
        values[`qualityOfIdea_${name}`],
        responseId,
        0
      );
    }
  };
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };
  const handleSubmittion = (data) => {
    if (responses && responses.length > 0) {
      const responseId = responses[responses.length - 1]._id;
      const name = responses[responses.length - 1].name;
      setPublishResponse({
        responseId,
        comprehension: data[`comprehension_${name}`],
        quality: data[`qualityOfIdea_${name}`],
      });
      setViewSubmit(true);
    }
  };
  const onPublishResponse = () => {
    if (publishResponse) {
      draftEvaluation(
        'publish',
        publishResponse.comprehension,
        publishResponse.quality,
        publishResponse.responseId,
        0
      );
    }
  };
  const draftEvaluation = (
    status = 'draft',
    comp = '',
    qual = '',
    resId,
    flag = 0
  ) => {
    const body = {
      status,
      comprehension: {
        score: comp,
      },
      qualityOfIdea: {
        score: qual,
      },
    };
    dispatch(submitEvaluation(resId, id, body, flag));
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
                content={message}
                className='error-message mb-3'
              />
            )}
            <Header as='h3' className='primary-dark-color'>
              {opportunity.name}
              {!(
                responses[responses.length - 1] &&
                responses[responses.length - 1].opportunityEvaluations &&
                responses[responses.length - 1].opportunityEvaluations
                  .status === 'publish'
              ) && (
                <>
                  <Button
                    type='submit'
                    form='submit-evaluation'
                    className='btn-secondary'
                    floated='right'
                    disabled={loading || currentParticipant < responses.length}>
                    Submit
                  </Button>
                  <PublishEvaluation
                    viewSubmit={viewSubmit}
                    setViewSubmit={setViewSubmit}
                    onSubmittion={onPublishResponse}
                  />
                  <Button
                    onClick={onDrafting}
                    primary
                    type='button'
                    className='btn-outline me-3'
                    floated='right'
                    disabled={loading}>
                    Save as Draft
                  </Button>
                </>
              )}
            </Header>
            <div style={{ padding: '1em' }}>
              <Form
                id='submit-evaluation'
                error
                size='small'
                onSubmit={handleSubmit(handleSubmittion)}
                loading={loading}>
                {error && (
                  <Message color='red' className='error-message'>
                    {error}
                  </Message>
                )}
                {responses &&
                  responses.map(
                    (response, index) =>
                      currentParticipant === index + 1 && (
                        <span key={index}>
                          <EvaluateForm
                            setCurrentQuestion={setCurrentQuestion}
                            currentQuestion={currentQuestion}
                            response={response}
                            currentParticipant={currentParticipant}
                            setCurrentParticipant={setCurrentParticipant}
                            totalParticipants={responses.length}
                            comprehension={response.comprehension}
                            quality={response.qualityOfIdea}
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
                        </span>
                      )
                  )}
              </Form>
            </div>
          </Grid.Column>
          <>
            <Grid.Column
              width={5}
              style={{ backgroundColor: '#EDF1F6', height: '100%' }}>
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
