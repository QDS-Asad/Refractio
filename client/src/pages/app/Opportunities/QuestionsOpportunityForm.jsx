import React from 'react';
import { Form, Header, Message } from 'semantic-ui-react';
function QuestionsOpportunityForm({
  handleChange,
  errors,
  watchComprehensionQ1,
  watchComprehensionQ2,
  watchQualityOfIdeaQ1,
  watchQualityOfIdeaQ2,
  watchQualityOfIdeaQ3,
  watchQualityOfIdeaQ4,
  watchQualityOfIdeaQ5,
  opportunity,
  userId,
}) {
  return (
    <>
      <Header>
        Evaluation of Comprehension
        <Header.Subheader>
          Publish question or prompt that will measure comprehension of the
          opportunity.
        </Header.Subheader>
      </Header>
      {((opportunity.status == 'completed' && watchComprehensionQ1) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 1 (Required)</label>
        <Form.Input
          name='comprehensionQ1'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.comprehensionQ1}
          value={watchComprehensionQ1}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. What is the best reason for Team to pursue Opportunity'
        />
        {errors && errors.comprehensionQ1 && (
          <Message error content={errors.comprehensionQ1.message} />
        )}
      </Form.Field>
      }

      {((opportunity.status == 'completed' && watchComprehensionQ2) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 2</label>
        <Form.Input
          name='comprehensionQ2'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.comprehensionQ2}
          value={watchComprehensionQ2}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. What is the best reason for Team to NOT pursue Opportunity'
        />
        {errors && errors.comprehensionQ2 && (
          <Message error content={errors.comprehensionQ2.message} />
        )}
      </Form.Field>
      }
      <Header>
        Evaluation of Quality of Idea-Response
        <Header.Subheader>
          Publish questions that will help participants structure their
          responses.
        </Header.Subheader>
      </Header>
      {((opportunity.status == 'completed' && watchQualityOfIdeaQ1) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 1 (Required)</label>
        <Form.Input
          name='qualityOfIdeaQ1'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.qualityOfIdeaQ1}
          value={watchQualityOfIdeaQ1}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. Describe the Stakeholders involved in the Idea you are submitting'
        />
        {errors && errors.qualityOfIdeaQ1 && (
          <Message error content={errors.qualityOfIdeaQ1.message} />
        )}
      </Form.Field>
      }
      {((opportunity.status == 'completed' && watchQualityOfIdeaQ2) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 2</label>
        <Form.Input
          name='qualityOfIdeaQ2'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.qualityOfIdeaQ2}
          value={watchQualityOfIdeaQ2}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. Describe the specific ACTION to take to pursue the Opportunity'
        />
        {errors && errors.qualityOfIdeaQ2 && (
          <Message error content={errors.qualityOfIdeaQ2.message} />
        )}
      </Form.Field>
      }
      {((opportunity.status == 'completed' && watchQualityOfIdeaQ3) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 3</label>
        <Form.Input
          name='qualityOfIdeaQ3'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.qualityOfIdeaQ3}
          value={watchQualityOfIdeaQ3}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. Describe the EXPECTED RESULTS from action taken to pursue Opportunity'
        />
        {errors && errors.qualityOfIdeaQ3 && (
          <Message error content={errors.qualityOfIdeaQ3.message} />
        )}
      </Form.Field>
      }
      {((opportunity.status == 'completed' && watchQualityOfIdeaQ4) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 4</label>
        <Form.Input
          name='qualityOfIdeaQ4'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.qualityOfIdeaQ4}
          value={watchQualityOfIdeaQ4}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. Describe the RISKS from action taken to pursue Opportunity'
        />
        {errors && errors.qualityOfIdeaQ4 && (
          <Message error content={errors.qualityOfIdeaQ4.message} />
        )}
      </Form.Field>
      }
      {((opportunity.status == 'completed' && watchQualityOfIdeaQ5) || opportunity.status !== 'completed') && <Form.Field>
        <label>Question 5</label>
        <Form.Input
          name='qualityOfIdeaQ5'
          fluid
          onChange={handleChange}
          onBlur={handleChange}
          error={!!errors.qualityOfIdeaQ5}
          value={watchQualityOfIdeaQ5}
          disabled={
            opportunity.status !== 'draft' || opportunity.createdById !== userId
          }
          placeholder='e.g. WHEN can or should Team work on pursuing Opportunity? What are DEPENDENCIES?'
        />
        {errors && errors.qualityOfIdeaQ5 && (
          <Message error content={errors.qualityOfIdeaQ5.message} />
        )}
      </Form.Field>
    }
    </>
  );
}

export default QuestionsOpportunityForm;
