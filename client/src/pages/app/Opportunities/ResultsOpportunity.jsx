import React, { memo, useState } from 'react';
import { Button, Divider, Grid, Header, List } from 'semantic-ui-react';
const participants = [
  {
    name: 'Alexa Richardson',
    comp: 5,
    qual: 4,
    score: 22,
  },
  {
    name: 'Alexa Richardson',
    comp: 5,
    qual: 4,
    score: 22,
  },
  {
    name: 'Alexa Richardson',
    comp: 5,
    qual: 4,
    score: 22,
  },
  {
    name: 'Alexa Richardson',
    comp: 5,
    qual: 4,
    score: 22,
  },
  {
    name: 'Alexa Richardson',
    comp: 5,
    qual: 4,
    score: 22,
  },
];
const responses = [
  {
    question:
      'Question 1: Describe the risks from action taken to pursue Opportunity',
    answer:
      'Si sine causa, nollem me tamen laudandis maioribus meis corrupisti nec voluptas sit. Quid ex ea voluptate velit esse, uam ob aliquam quaerat voluptatem ut alterum. Et quidem se ipsam causam ista, quae ab illo inventore veritatis et dolore. At vero eos censes tantas res gessisse sine causa, nollem me ab illo.',
  },
  {
    question:
      'Question 2: Describe the risks from action taken to pursue Opportunity',
    answer:
      'Si sine causa, nollem me tamen laudandis maioribus meis corrupisti nec voluptas sit. Quid ex ea voluptate velit esse, uam ob aliquam quaerat voluptatem ut alterum. Et quidem se ipsam causam ista, quae ab illo inventore veritatis et dolore. At vero eos censes tantas res gessisse sine causa, nollem me ab illo.',
  },
];
const scoring = [
  {
    name: 'Grigoriy Kozhukhov',
    score: 2,
  },
  {
    name: 'Sofia Manzano',
    score: 1,
  },
  {
    name: 'Uzoma Buchi',
    score: 1,
  },
  {
    name: 'Xun Guiying',
    score: 1,
  },
];
const ResultsOpportunity = memo(() => {
  const [currentParticipant, setCurrentParticipant] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <Grid>
      <Grid.Column width={5} className='Results'>
        <Header as='h3' className='primary-dark-color mb-3'>
          Participants
        </Header>
        <List divided verticalAlign='middle'>
          {participants.map(({ name, score, qual, comp }, index) => (
            <List.Item
              style={{
                backgroundColor: index === currentParticipant ? '#EEF2F7' : '',
              }}
              onClick={() => setCurrentParticipant(index)}
              key={index}
              className='participantsList'
            >
              {name}
              <List.Content floated='right'>{score}</List.Content>
              <div className='participantsScore'>
                Comprehension score: {comp}
              </div>
              <div className='participantsScore'>Quality score: {qual}</div>
            </List.Item>
          ))}
        </List>
      </Grid.Column>
      <Grid.Column width={11}>
        <Button.Group>
          <Button
            onClick={() => setCurrentSection(1)}
            className={currentSection === 1 ? 'btn' : ''}
          >
            Evaluation of Comprehension
          </Button>
          <Button
            onClick={() => setCurrentSection(2)}
            className={currentSection === 2 ? 'btn' : ''}
          >
            Evaluation of Quality of Idea-Response
          </Button>
        </Button.Group>
        <div className='mt-4'>
          {responses.map(({ question, answer }, index) => (
            <span key={index}>
              <Header
                className='mb-4'
                style={{ fontSize: 15 }}
                size='medium'
                color='grey'
              >
                {question}
                <Header.Subheader className='mt-3' color='black'>
                  {answer}
                </Header.Subheader>
              </Header>
            </span>
          ))}
          <Grid>
            <Grid.Column width={6}>
              {scoring.map(({ name, score }, index) => (
                <div key={index} className='indivisualScore mb-3'>
                  <span>{name}</span>
                  <span> {score}</span>
                </div>
              ))}
              <Divider />
              <div className='indivisualScore'>
                <span>Total</span>
                <span>5</span>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Grid.Column>
    </Grid>
  );
});

export default ResultsOpportunity;
