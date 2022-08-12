import React, { memo } from 'react';
import { Button, Header, Divider, Message } from 'semantic-ui-react';
import RadioLabel from './RadioLabel';

const options = [
  { key: '1', text: '1', value: '1', subText: 'Strongly Disagree' },
  { key: '2', text: '2', value: '2', subText: 'Disagree' },
  { key: '3', text: '3', value: '3', subText: 'Neutral' },
  { key: '4', text: '4', value: '4', subText: 'Agree' },
  { key: '5', text: '5', value: '5', subText: 'Strongly Agree' },
];
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
    setValue,
    trigger,
    watch,
    errors,
    draftEvaluation,
  }) => {
    const comprehensionCheck = watch(`comprehension_${response.name}`, '');
    const qualityChecked = watch(`qualityOfIdea_${response.name}`, '');
    const handleChange = (e, { value }) => {
      if (currentQuestion === 1) {
        setValue(`comprehension_${response.name}`, value);
        trigger(`comprehension_${response.name}`);
      } else {
        setValue(`qualityOfIdea_${response.name}`, value);
        trigger(`qualityOfIdea_${response.name}`);
      }
    };
    return (
      <>
        <div
          style={{
            fontSize: 'large',
            fontWeight: '700',
          }}
          className='primary-dark-color pb-3 mb-3'>
          {response.name} -{' '}
          {currentQuestion === 1
            ? 'Evaluation of Comprehension'
            : 'Evaluation of Quality of Idea-Response'}
        </div>
        <div>
          {currentQuestion === 1
            ? comprehension.map((ques, index) => (
                <span key={index}>
                  <Header size='medium' color='grey'>
                    {ques.question}
                    <Header.Subheader className='mt-3' color='black'>
                      {ques.answer}
                    </Header.Subheader>
                  </Header>
                  <Divider />
                </span>
              ))
            : quality.map((ques, index) => (
                <span key={index}>
                  <Header size='medium' color='grey'>
                    {ques.question}
                    <Header.Subheader className='mt-3' color='black'>
                      {ques.answer}
                    </Header.Subheader>
                  </Header>
                  <Divider />
                </span>
              ))}
        </div>
        <div className='mb-3 mt-3'>
          <label style={{ fontSize: '13px' }} className='mb-3 mt-3'>
            <Header>
              {currentQuestion === 1
                ? 'This response demonstrates an excellent understanding of the subject matter of this opportunity.'
                : 'This is a well structured response. We need to consider this idea over others.'}
            </Header>
          </label>
          {currentQuestion === 1 ? (
            <>
              <RadioLabel
                rating={comprehensionCheck}
                options={options}
                name={`comprehension_${response.name}`}
                handleChange={handleChange}
                errors={errors}
                evaluation={response.opportunityEvaluations.status}
              />
              {errors && errors[`comprehension_${response.name}`] && (
                <Message
                  error
                  content={errors[`comprehension_${response.name}`].message}
                />
              )}
            </>
          ) : (
            <>
              <RadioLabel
                rating={qualityChecked}
                options={options}
                name={`qualityOfIdea_${response.name}`}
                handleChange={handleChange}
                errors={errors}
                evaluation={response.opportunityEvaluations.status}
              />
              {errors && errors[`qualityOfIdea_${response.name}`] && (
                <Message
                  error
                  content={errors[`qualityOfIdea_${response.name}`].message}
                />
              )}
            </>
          )}
          <div className='mt-5'>
            {currentParticipant <= totalParticipants && (
              <Button
                onClick={() => {
                  if (currentQuestion === 2) {
                    setCurrentParticipant((prev) => prev + 1);
                    setCurrentQuestion(1);
                    if (
                      !response.opportunityEvaluations.status ||
                      response.opportunityEvaluations.status !== 'publish'
                    ) {
                      draftEvaluation(
                        'draft',
                        comprehensionCheck,
                        qualityChecked,
                        response._id,
                        1
                      );
                    }
                  } else {
                    setCurrentQuestion((prev) => prev + 1);
                  }
                }}
                disabled={
                  (currentParticipant === totalParticipants &&
                    currentQuestion === 2) ||
                  (qualityChecked === '' && currentQuestion === 2) ||
                  (comprehensionCheck === '' && currentQuestion === 1)
                }
                primary
                className='btn float-end'
                content='Next'
                type='button'
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
                type='button'
              />
            )}
          </div>
        </div>
      </>
    );
  }
);

export default EvaluateForm;
