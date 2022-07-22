import React, { memo } from "react";
import { Form, TextArea, Message, Button, Header } from "semantic-ui-react";

const ResponseForm = memo(
  ({
    index,
    opportunity,
    handleChange,
    errors,
    watch,
    allQuestions,
    setCurrentQuestion,
  }) => {
    const watchAnswer = watch(`q${index + 1}`, "");
    return (
      <>
        <div
          style={{
            fontSize: "x-large",
            fontWeight: "700",
          }}
          className="float-start primary-dark-color pb-3"
        >
          {index + 1} / {allQuestions}
        </div>
        <Form.Field className="mb-3">
          <label>
            <Header>{opportunity}</Header>
          </label>
          <span className="float-end">({watchAnswer.length}/ 600)</span>
          <Form.Input
            name={`q${index + 1}`}
            control={TextArea}
            rows={7}
            value={watch(`q${index + 1}`)}
            onChange={handleChange}
            onBlur={handleChange}
            error={!!errors[`q${index + 1}`]}
            placeholder="Enter response..."
          />
          {errors && errors[`q${index + 1}`] && (
            <Message error content={errors[`q${index + 1}`].message} />
          )}
          <div className="mt-5">
            {allQuestions > index + 1 && (
              <Button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                primary
                className="btn float-end"
                content="Next"
              />
            )}
            {1 < index + 1 && (
              <Button
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                primary
                className="btn float-start"
                content="Back"
              />
            )}
          </div>
        </Form.Field>
      </>
    );
  }
);

export default ResponseForm;
