import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOpportunity,
  fetchOpportunity,
  fetchResults,
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
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import OpportunityStatus from '../../../components/OpportunityStatus';
import PublishOpportunity from './PublishOpportunity';
import ManageParticipants from './ManageParticipants';
import OpportunityCreate from './OpportunityCreate';
import { useForm } from 'react-hook-form';
import QuestionsOpportunityForm from './QuestionsOpportunityForm';
import { authLoginSelector } from '../../../features/auth/authLoginSlice';
import DeleteOpportunity from './DeleteOpportunity';
import ResultsOpportunity from './ResultsOpportunity';
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
  const [viewDelete, setViewDelete] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [deleteText, setDeleteText] = useState(
    'Once the opportunity is deleted, it cannot be undone. Are you sure ?'
  );
  const { id } = useParams();
  const navigate = useNavigate();
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
  const onDeletingOpportunity = () => {
    setDeleteText(
      'Atleast 2 participants are required. Removing them would delete this opportunity.'
    );
    setViewDelete(true);
  };
  const onDeleteOpportunity = () => {
    dispatch(deleteOpportunity(id));
  };
  const handleSubmittion = (data) => {
    let apiData = questionFormationArray(data);
    setFormValues(apiData);
    setViewPublish(true);
  };
  const handleDraft = () => {
    let apiData = questionFormationArray({
      comprehensionQ1: watchComprehensionQ1,
      comprehensionQ2: watchComprehensionQ2,
      qualityOfIdeaQ1: watchQualityOfIdeaQ1,
      qualityOfIdeaQ2: watchQualityOfIdeaQ2,
      qualityOfIdeaQ3: watchQualityOfIdeaQ3,
      qualityOfIdeaQ4: watchQualityOfIdeaQ4,
      qualityOfIdeaQ5: watchQualityOfIdeaQ5,
    });
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
  const {
    loading,
    error,
    opportunity,
    success,
    message,
    deleted,
    evaluation,
  } = useSelector(opportunityDetailSelector);
  const { userLogin } = useSelector(authLoginSelector);
  // hook to fetch items
  useEffect(() => {
    if (!deleted) {
      dispatch(fetchOpportunity(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (opportunity) {
      opportunity.comprehension.questions.forEach((question) => {
        setValue(`comprehensionQ${question.order}`, question.question);
      });
      opportunity.qualityOfIdea.questions.forEach((question) => {
        setValue(`qualityOfIdeaQ${question.order}`, question.question);
      });
      if (opportunity.status === 'completed') {
        dispatch(fetchResults(id));
      }
    }
  }, [opportunity]);
  useEffect(() => {
    if (success) {
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 4000);
    }
  }, [success]);
  useEffect(() => {
    if (deleted) {
      navigate({
        pathname: '/opportunities',
      });
    }
  }, [deleted]);
  if (opportunity && userLogin.id !== opportunity.createdById) {
    return <Navigate to='/' replace />;
  }
  const watchComprehensionQ1 = watch('comprehensionQ1', '');
  const watchComprehensionQ2 = watch('comprehensionQ2', '');
  const watchQualityOfIdeaQ1 = watch('qualityOfIdeaQ1', '');
  const watchQualityOfIdeaQ2 = watch('qualityOfIdeaQ2', '');
  const watchQualityOfIdeaQ3 = watch('qualityOfIdeaQ3', '');
  const watchQualityOfIdeaQ4 = watch('qualityOfIdeaQ4', '');
  const watchQualityOfIdeaQ5 = watch('qualityOfIdeaQ5', '');

  const panes = [
    opportunity &&
    opportunity.status === 'completed' &&
    userLogin.id === opportunity.createdById
      ? {
          menuItem: 'Results',
          render: () => (
            <Tab.Pane loading={loading} attached={false}>
              <ResultsOpportunity
                evaluation={evaluation}
                opportunity={opportunity}
              />
            </Tab.Pane>
          ),
        }
      : null,
  ];
  if (!panes[0]) {
    panes.pop();
  }
  panes.push(
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
              userId={userLogin.id}
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
                {opportunity.status === 'draft' &&
                  userLogin.id === opportunity.createdById && (
                    <>
                      <Button
                        className='btn-link'
                        floated='right'
                        type='button'
                        onClick={() => setEditOpportunity(true)}
                        disabled={loading}>
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
    }
  );

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
                  className='ms-2 fw-bold primary-color hoverable'
                  onClick={() => !loading && setViewParticipant(true)}>
                  {opportunity.participants.length > 0
                    ? 'View Participants'
                    : 'Add Participants'}
                </span>
                <ManageParticipants
                  opportunity={opportunity}
                  viewParticipant={viewParticipant}
                  setViewParticipant={setViewParticipant}
                  userId={userLogin.id}
                  onDeletingOpportunity={onDeletingOpportunity}
                />
              </Header.Subheader>
            </Header>
          )}
        </Grid.Column>
        {opportunity && (
          <Grid.Column width={8}>
            {opportunity.status === 'draft' &&
              userLogin.id === opportunity.createdById && (
                <>
                  <Button
                    primary
                    className='btn-secondary my-1 me-3'
                    floated='right'
                    type='submit'
                    form='create-opportunity'>
                    Publish
                  </Button>
                  <PublishOpportunity
                    viewPublish={viewPublish}
                    setViewPublish={setViewPublish}
                    onSubmittion={onPublishResponse}
                  />
                  <Button
                    onClick={handleDraft}
                    primary
                    className='btn-outline me-3 my-1'
                    floated='right'
                    disabled={loading}>
                    Save as Draft
                  </Button>
                </>
              )}
            {userLogin.id === opportunity.createdById && (
              <>
                <DeleteOpportunity
                  viewDelete={viewDelete}
                  setViewDelete={setViewDelete}
                  deleteText={deleteText}
                  setDeleteText={setDeleteText}
                  onSubmittion={onDeleteOpportunity}
                />
                <Button
                  onClick={() => setViewDelete(true)}
                  negative
                  className='me-3 my-1'
                  floated='right'
                  disabled={loading}>
                  Delete
                </Button>
              </>
            )}
          </Grid.Column>
        )}

        {opportunity &&
          opportunity.status === 'draft' &&
          userLogin.id === opportunity.createdById && (
            <Grid.Column width={16}>
              <p>
                To publish an Opportunity you need at least one question for
                Comprehension and one for Quality of Idea-Response. You need to
                select the Team Members you want to respond with an Idea.
              </p>
            </Grid.Column>
          )}
      </Grid>
      <Grid>
        <Grid.Column>
          {displayMessage && (
            <Message header={message} success className='success-message' />
          )}
          <Form
            id='create-opportunity'
            error
            size='small'
            onSubmit={handleSubmit(handleSubmittion)}>
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
