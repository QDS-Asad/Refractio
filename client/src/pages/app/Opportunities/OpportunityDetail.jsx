import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpportunity,
  opportunityDetailSelector,
  resetOpportunity,
  updateOpportunity,
} from '../../../features/opportunities/opportunityDetailSlice';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Tab,
  Segment,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import OpportunityStatus from '../../../components/OpportunityStatus';
import PublishOpportunity from './PublishOpportunity';
import ManageParticipants from './ManageParticipants';
import OpportunityCreate from './OpportunityCreate';
import { useForm } from 'react-hook-form';
import QuestionsOpportunityForm from './QuestionsOpportunityForm';
const maxLengthObject = {
  value: 120,
  message: 'Maximum characters are 120.',
};
const questionFormationArray = (data) => {
  let apiData = {
    comprehension: {
      questions: [],
    },
    qualityOfIdea: {
      questions: [],
    },
  };
  if (data.comprehensionQ1) {
    apiData.comprehension.questions.push({
      order: 1,
      question: data.comprehensionQ1,
    });
  }
  if (data.comprehensionQ2) {
    apiData.comprehension.questions.push({
      order: 2,
      question: data.comprehensionQ2,
    });
  }
  if (data.qualityOfIdeaQ1) {
    apiData.qualityOfIdea.questions.push({
      order: 1,
      question: data.qualityOfIdeaQ1,
    });
  }
  if (data.qualityOfIdeaQ2) {
    apiData.qualityOfIdea.questions.push({
      order: 2,
      question: data.qualityOfIdeaQ2,
    });
  }
  if (data.qualityOfIdeaQ3) {
    apiData.qualityOfIdea.questions.push({
      order: 3,
      question: data.qualityOfIdeaQ3,
    });
  }
  if (data.qualityOfIdeaQ4) {
    apiData.qualityOfIdea.questions.push({
      order: 4,
      question: data.qualityOfIdeaQ4,
    });
  }
  if (data.qualityOfIdeaQ5) {
    apiData.qualityOfIdea.questions.push({
      order: 5,
      question: data.qualityOfIdeaQ5,
    });
  }
  return apiData;
};
const OpportunityDetail = () => {
  const [viewParticipant, setViewParticipant] = useState(false);
  const [viewPublish, setViewPublish] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const { id } = useParams();
  const { register, setValue, handleSubmit, errors, trigger, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      comprehensionQ1: '',
      comprehensionQ2: '',
      qualityOfIdeaQ1: '',
      qualityOfIdeaQ2: '',
      qualityOfIdeaQ3: '',
      qualityOfIdeaQ4: '',
      qualityOfIdeaQ5: '',
    },
  });
  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };
  const onPublishResponse = () => {
    dispatch(updateOpportunity(id, 'publish', formValues));
    setViewPublish(false);
  };
  const handleSubmittion = (data) => {
    let apiData = questionFormationArray(data);
    setFormValues(apiData);
    debugger;
    setViewPublish(true);
  };
  const handleDraft = (data) => {
    let apiData = questionFormationArray(data);
    dispatch(updateOpportunity(id, 'draft', apiData));
  };
  const createOptions = {
    comprehensionQ1: {
      required: 'Atleast one question for comprehension is required',
      maxLength: maxLengthObject,
    },
    comprehensionQ2: {
      maxLength: maxLengthObject,
    },
    qualityOfIdeaQ1: {
      required: 'Atleast one question for quality of idea-response is required',
      maxLength: maxLengthObject,
    },
    qualityOfIdeaQ2: {
      maxLength: maxLengthObject,
    },
    qualityOfIdeaQ3: {
      maxLength: maxLengthObject,
    },
    qualityOfIdeaQ4: {
      maxLength: maxLengthObject,
    },
    qualityOfIdeaQ5: {
      maxLength: maxLengthObject,
    },
  };
  useEffect(() => {
    register({ name: 'comprehensionQ1' }, createOptions.comprehensionQ1);
    register({ name: 'comprehensionQ2' }, createOptions.comprehensionQ2);
    register({ name: 'qualityOfIdeaQ1' }, createOptions.qualityOfIdeaQ1);
    register({ name: 'qualityOfIdeaQ2' }, createOptions.qualityOfIdeaQ2);
    register({ name: 'qualityOfIdeaQ3' }, createOptions.qualityOfIdeaQ3);
    register({ name: 'qualityOfIdeaQ4' }, createOptions.qualityOfIdeaQ4);
    register({ name: 'qualityOfIdeaQ5' }, createOptions.qualityOfIdeaQ5);
    return () => {
      dispatch(resetOpportunity());
    };
  }, []);
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
  useEffect(() => {
    if (opportunity) {
      opportunity.comprehension.questions.forEach((question) => {
        setValue(`comprehensionQ${question.order}`, question.question);
      });
      opportunity.qualityOfIdea.questions.forEach((question) => {
        setValue(`qualityOfIdeaQ${question.order}`, question.question);
      });
    }
  }, [opportunity]);
  const watchComprehensionQ1 = watch('comprehensionQ1', '');
  const watchComprehensionQ2 = watch('comprehensionQ2', '');
  const watchQualityOfIdeaQ1 = watch('qualityOfIdeaQ1', '');
  const watchQualityOfIdeaQ2 = watch('qualityOfIdeaQ2', '');
  const watchQualityOfIdeaQ3 = watch('qualityOfIdeaQ3', '');
  const watchQualityOfIdeaQ4 = watch('qualityOfIdeaQ4', '');
  const watchQualityOfIdeaQ5 = watch('qualityOfIdeaQ5', '');

  const panes = [
    {
      menuItem: 'Questions',
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {opportunity && (
            <QuestionsOpportunityForm
              handleChange={handleChange}
              errors={errors}
              watchComprehensionQ1={watchComprehensionQ1}
              watchComprehensionQ2={watchComprehensionQ2}
              watchQualityOfIdeaQ1={watchQualityOfIdeaQ1}
              watchQualityOfIdeaQ2={watchQualityOfIdeaQ2}
              watchQualityOfIdeaQ3={watchQualityOfIdeaQ3}
              watchQualityOfIdeaQ4={watchQualityOfIdeaQ4}
              watchQualityOfIdeaQ5={watchQualityOfIdeaQ5}
              opportunity={opportunity}
            />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Information',
      render: () => (
        <Tab.Pane loading={loading} attached={false}>
          {opportunity && (
            <Segment>
              <div className='clearfix'>
                <Header floated='left'>Opportunity Information</Header>
                {opportunity.status === 'draft' && (
                  <>
                    <Button
                      className='btn-link'
                      floated='right'
                      type='button'
                      onClick={() => setEditOpportunity(true)}
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <OpportunityCreate
                      showCreate={editOpportunity}
                      setShowCreate={setEditOpportunity}
                      id={opportunity._id}
                    />
                  </>
                )}
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
            <Header as='h3' className='primary-dark-color'>
              {opportunity.name}{' '}
              <OpportunityStatus status={opportunity.status} />
              <Header.Subheader className='mt-3'>
                <Image
                  src='/images/team.svg'
                  className='d-inline-block'
                  verticalAlign='middle'
                />
                <span className='secondary-color'>
                  {opportunity.participants.length}
                </span>

                <span
                  className='ms-2 fw-bold primary-color'
                  onClick={() => !loading && setViewParticipant(true)}
                >
                  {opportunity.participants.length > 0
                    ? 'View Participants'
                    : 'Add Participants'}
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
        {opportunity && opportunity.status === 'draft' && (
          <>
            <Grid.Column width={8}>
              <Button
                primary
                className='btn-secondary'
                floated='right'
                type='submit'
                form='create-opportunity'
              >
                Publish
              </Button>
              <PublishOpportunity
                viewPublish={viewPublish}
                setViewPublish={setViewPublish}
                onSubmittion={onPublishResponse}
              />
              <Button
                onClick={handleSubmit(handleDraft)}
                primary
                className='btn-outline me-3'
                floated='right'
              >
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
          <Form
            id='create-opportunity'
            error
            size='small'
            onSubmit={handleSubmit(handleSubmittion)}
          >
            {error && (
              <Message color='red' className='error-message'>
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
