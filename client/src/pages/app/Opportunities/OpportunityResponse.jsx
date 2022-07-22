import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  opportunityResponseSelector,
} from '../../../features/opportunities/opportunityResponseSlice';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ResponseForm from '../../../components/ResponseForm';
import PublishResponse from './PublishResponse';

const OpportunityResponse = () => {
  const [viewSubmit, setViewSubmit] = useState(false);
  const [viewMessage, setViewMessage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [allQuestions, setAllQuestions] = useState([]);
  const { id } = useParams();
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
  });

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, opportunity } = useSelector(
    opportunityResponseSelector
  );
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  // hook to fetch items
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
    }
  }, [allQuestions]);

  const handleEdit = (data) => {
    setViewSubmit(true);
  };
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
                primary
                type='submit'
                form='create-opportunity'
                className='btn-secondary'
                floated='right'
              >
                Submit
              </Button>
              <PublishResponse
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
              <Form
                id='create-opportunity'
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
