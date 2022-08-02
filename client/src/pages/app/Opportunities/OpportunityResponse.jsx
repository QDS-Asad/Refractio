import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  opportunityResponseSelector,
  resetResponse,
  respondOpportunity,
} from '../../../features/opportunities/opportunityResponseSlice';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ResponseForm from '../../../components/ResponseForm';
import PublishResponse from './PublishResponse';
import {
  resetGetResponse,
  getOpportunityResponse,
  opportunityGetResponseSelector,
} from '../../../features/opportunities/opportunityGetResponseSlice';

const apiResponseFormat = (allQuestions, opportunity, data) => {
  let comprehensionAnswer = [];
  let qualityAnswer = [];
  allQuestions.map((question, index) => {
    if (index >= opportunity.comprehension.questions.length) {
      qualityAnswer.push({
        answer: data[`q${index + 1}`] || '',
        questionId: question._id,
      });
    } else {
      comprehensionAnswer.push({
        answer: data[`q${index + 1}`] || '',
        questionId: question._id,
      });
    }
    return question;
  });
  return {
    comprehension: {
      answers: comprehensionAnswer,
    },
    qualityOfIdea: {
      answers: qualityAnswer,
    },
  };
};
const OpportunityResponse = () => {
  const [viewSubmit, setViewSubmit] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [allQuestions, setAllQuestions] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [answerArray, setAnswer] = useState(null);
  const [responsePublished, setResponsePublished] = useState(false);
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
  const { loading, error, opportunity, success, message } = useSelector(
    opportunityResponseSelector
  );
  const {
    loading: responseLoading,
    error: responseError,
    response,
  } = useSelector(opportunityGetResponseSelector);
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  // hook to fetch items
  useEffect(() => {
    return () => {
      dispatch(resetResponse());
      dispatch(resetGetResponse());
    };
  }, []);
  useEffect(() => {
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (opportunity && opportunity.comprehension.questions) {
      setAllQuestions([
        ...opportunity.comprehension.questions,
        ...opportunity.qualityOfIdea.questions,
      ]);
    }
  }, [opportunity]);
  useEffect(() => {
    if (allQuestions.length > 0) {
      for (let i = 1; i <= allQuestions.length; i++) {
        register(
          { name: `q${i}` },
          {
            required: 'Answer is required',
            maxLength: {
              value: 600,
              message: 'Maximum characters are 600.',
            },
          }
        );
        setValue((`q${i}`, ''));
      }
      dispatch(getOpportunityResponse(id));
    }
  }, [allQuestions]);
  useEffect(() => {
    if (success) {
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 4000);
    }
  }, [success]);
  useEffect(() => {
    if (response) {
      if (response.comprehension) {
        response.comprehension.answers.map((answer, idx) => {
          if (answer.answer) {
            setValue(`q${idx + 1}`, answer.answer);
          }
          return answer;
        });
      }
      if (response.qualityOfIdea) {
        response.qualityOfIdea.answers.map((answer, idx) => {
          if (answer.answer) {
            setValue(
              `q${response.comprehension.answers.length + idx + 1}`,
              answer.answer
            );
          }
          return answer;
        });
      }
      if (response.status === 'publish') {
        setResponsePublished(true);
      } else {
        setResponsePublished(false);
      }
    }
  }, [response]);
  const handleEdit = (data) => {
    setAnswer(apiResponseFormat(allQuestions, opportunity, data));
    setViewSubmit(true);
  };
  const onSubmittion = async (status) => {
    let finalobject = { ...answerArray, status };
    dispatch(respondOpportunity(id, finalobject));
  };
  const values = getValues();

  const handleDraft = () => {
    const apiData = apiResponseFormat(allQuestions, opportunity, values);
    let finalobject = { ...apiData, status: 'draft' };
    dispatch(respondOpportunity(id, finalobject));
  };
  return (
    <>
      {opportunity && (
        <Grid stretched>
          <Grid.Column width={11}>
            {displayMessage && (
              <Message header={message} success className='success-message' />
            )}
            <Header as='h3' className='primary-dark-color'>
              {opportunity.name}
              {!responsePublished && (
                <>
                  <Button
                    primary
                    type='submit'
                    form='create-opportunity'
                    className='btn-secondary'
                    floated='right'
                    disabled={loading || responseLoading}>
                    Submit
                  </Button>
                  <PublishResponse
                    viewSubmit={viewSubmit}
                    setViewSubmit={setViewSubmit}
                    onSubmittion={onSubmittion}
                  />
                  <Button
                    onClick={handleDraft}
                    primary
                    className='btn-outline me-3'
                    floated='right'
                    disabled={loading || responseLoading}>
                    Save as Draft
                  </Button>
                </>
              )}
            </Header>
            <div style={{ padding: '1em' }}>
              <Form
                id='create-opportunity'
                error
                size='small'
                onSubmit={handleSubmit(handleEdit)}
                loading={loading || responseLoading}>
                {error && (
                  <Message color='red' className='error-message'>
                    {error}
                  </Message>
                )}
                {responseError && (
                  <Message color='red' className='error-message'>
                    {responseError}
                  </Message>
                )}
                {allQuestions.map((o, index) => (
                  <div key={index}>
                    {currentQuestion === index + 1 && (
                      <ResponseForm
                        opportunity={o}
                        index={index}
                        handleChange={handleChange}
                        errors={errors}
                        watch={watch}
                        allQuestions={allQuestions.length}
                        setCurrentQuestion={setCurrentQuestion}
                        loading={loading || responseLoading}
                        responsePublished={responsePublished}
                      />
                    )}
                  </div>
                ))}
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

export default OpportunityResponse;
