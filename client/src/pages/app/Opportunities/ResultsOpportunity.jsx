import React, { memo, useState } from 'react';
import { Button, Divider, Grid, Header, List } from 'semantic-ui-react';
const ResultsOpportunity = memo(({ evaluation }) => {
  const [currentParticipant, setCurrentParticipant] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

  return (
    evaluation.length > 0 && (
      <Grid>
        <Grid.Column width={5} className='Results'>
          <Header as='h3' className='primary-dark-color mb-3'>
            Participants
          </Header>
          <List divided verticalAlign='middle'>
            {evaluation.map(
              (
                {
                  firstName,
                  lastName,
                  totalQualityOfIdeaAverageEvaluationScore,
                  totalComprehensionAverageEvaluationScore,
                },
                index
              ) => (
                <List.Item
                  style={{
                    backgroundColor:
                      index === currentParticipant ? '#EEF2F7' : '',
                  }}
                  onClick={() => setCurrentParticipant(index)}
                  key={index}
                  className='participantsList'>
                  {firstName + ' ' + lastName}
                  <List.Content floated='right'>
                    {totalQualityOfIdeaAverageEvaluationScore}
                  </List.Content>
                  <div className='participantsScore'>
                    Comprehension score:{' '}
                    {totalComprehensionAverageEvaluationScore}
                  </div>
                  <div className='participantsScore'>
                    Quality score: {totalQualityOfIdeaAverageEvaluationScore}
                  </div>
                </List.Item>
              )
            )}
          </List>
        </Grid.Column>
        <Grid.Column width={11}>
          <Button.Group>
            <Button
              onClick={() => setCurrentSection(1)}
              className={currentSection === 1 ? 'btn' : ''}>
              Evaluation of Comprehension
            </Button>
            <Button
              onClick={() => setCurrentSection(2)}
              className={currentSection === 2 ? 'btn' : ''}>
              Evaluation of Quality of Idea-Response
            </Button>
          </Button.Group>
          <div className='mt-4'>
            {currentSection === 1
              ? evaluation[currentParticipant].comprehension.qa.map(
                  ({ question, answer, order }, index) => (
                    <span key={index}>
                      <Header
                        className='mb-4'
                        style={{ fontSize: 15 }}
                        size='medium'
                        color='grey'>
                        Question {order}: {question}
                        <Header.Subheader className='mt-3' color='black'>
                          {answer}
                        </Header.Subheader>
                      </Header>
                    </span>
                  )
                )
              : evaluation[currentParticipant].qualityOfIdea.qa.map(
                  ({ question, answer, order }, index) => (
                    <span key={index}>
                      <Header
                        className='mb-4'
                        style={{ fontSize: 15 }}
                        size='medium'
                        color='grey'>
                        Question {order}: {question}{' '}
                        <Header.Subheader className='mt-3' color='black'>
                          {answer}
                        </Header.Subheader>
                      </Header>
                    </span>
                  )
                )}
            <Grid>
              <Grid.Column width={6}>
                {currentSection === 1
                  ? evaluation[currentParticipant].comprehension.evaluation.map(
                      ({ firstName, lastName, evaluation: score }, index) => (
                        <div key={index} className='indivisualScore mb-3'>
                          <span>{firstName + ' ' + lastName}</span>
                          <span> {score}</span>
                        </div>
                      )
                    )
                  : evaluation[currentParticipant].qualityOfIdea.evaluation.map(
                      ({ firstName, lastName, evaluation: score }, index) => (
                        <div key={index} className='indivisualScore mb-3'>
                          <span>{firstName + ' ' + lastName}</span>
                          <span> {score}</span>
                        </div>
                      )
                    )}
                <Divider />
                <div className='indivisualScore'>
                  <span>Total</span>
                  <span>
                    {currentSection === 1
                      ? evaluation[currentParticipant]
                          .totalComprehensionAverageEvaluationScore
                      : evaluation[currentParticipant]
                          .totalQualityOfIdeaAverageEvaluationScore}
                  </span>
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </Grid.Column>
      </Grid>
    )
  );
});

export default ResultsOpportunity;
