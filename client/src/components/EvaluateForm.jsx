import React, { memo } from 'react';
import { useState } from 'react';
import { Button, Header, Divider } from 'semantic-ui-react';
import RadioLabel from './RadioLabel';

const options = [
  { key: '1', text: '1', value: '1', subText: 'Strongly Disagree' },
  { key: '2', text: '2', value: '2', subText: 'Disagree' },
  { key: '3', text: '3', value: '3', subText: 'Neutral' },
  { key: '4', text: '4', value: '4', subText: 'Agree' },
  { key: '5', text: '5', value: '5', subText: 'Strongly Agree' },
];
const answer =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.";
const EvaluateForm = memo(
  ({
    setCurrentQuestion,
    quality,
    comprehension,
    currentQuestion,
    response,
    setCurrentParticipant,
    currentParticipant,
    totalParticipants,
  }) => {
    const [comprehensionRating, setComprehensionRating] = useState('1');
    const [ideaRating, setIdeaRating] = useState('1');
    const handleComprehensionChange = (e, { value }) => {
      setComprehensionRating(value);
    };
    const handleIdeaChange = (e, { value }) => {
      setIdeaRating(value);
    };
    return (
      <>
        <div
          style={{
            fontSize: 'large',
            fontWeight: '700',
          }}
          className='primary-dark-color pb-3 mb-3'
        >
          {response.name} -{' '}
          {currentQuestion === 1
            ? 'Evaluation of comprehension'
            : 'Evaluation of Quality of Idea-Response'}
        </div>
        <div>
          {currentQuestion === 1
            ? comprehension.map((ques, index) => (
                <>
                  <Header key={index} size='medium' color='grey'>
                    {ques.question}
                    <Header.Subheader className='mt-3' color='black'>
                      {ques.answer}
                    </Header.Subheader>
                  </Header>
                  <Divider />
                </>
              ))
            : quality.map((ques, index) => (
                <>
                  <Header key={index} size='medium' color='grey'>
                    {ques.question}
                    <Header.Subheader className='mt-3' color='black'>
                      {ques.answer}
                    </Header.Subheader>
                  </Header>
                  <Divider />
                </>
              ))}
        </div>
        <div className='mb-3 mt-3'>
          <label style={{ fontSize: '13px' }} className='mb-3 mt-3'>
            <Header>
              This responses demonstrates an excellent understanding of the
              subject matter of this opportunity.
            </Header>
          </label>
          <RadioLabel
            handleIdeaChange={handleIdeaChange}
            handleComprehensionChange={handleComprehensionChange}
            currentQuestion={currentQuestion}
            ideaRating={ideaRating}
            comprehensionRating={comprehensionRating}
            options={options}
          />
          <div className='mt-5'>
            {currentParticipant <= totalParticipants && (
              <Button
                onClick={() => {
                  if (currentQuestion === 2) {
                    setCurrentParticipant((prev) => prev + 1);
                    setCurrentQuestion(1);
                  } else {
                    setCurrentQuestion((prev) => prev + 1);
                  }
                }}
                disabled={
                  currentParticipant === totalParticipants &&
                  currentQuestion === 2
                }
                primary
                className='btn float-end'
                content='Next'
              />
            )}
            {currentParticipant >= 1 && (
              <Button
                onClick={() => {
                  if (currentQuestion === 1) {
                    setCurrentParticipant((prev) => prev - 1);
                    setCurrentQuestion(2);
                  } else {
                    setCurrentQuestion((prev) => prev - 1);
                  }
                }}
                disabled={currentParticipant === 1 && currentQuestion === 1}
                primary
                className='btn float-start'
                content='Back'
              />
            )}
          </div>
        </div>
      </>
    );
  }
);

export default EvaluateForm;
