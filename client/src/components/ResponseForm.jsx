import React, { memo } from "react";
import { Form, TextArea, Message, Button } from "semantic-ui-react";

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
            paddingBottom: "1em",
            fontSize: "x-large",
            fontWeight: "700",
          }}
          className="float-start primary-dark-color"
        >
          {index + 1} / {allQuestions}
        </div>
        <Form.Field className="mb-3">
          <label style={{ fontSize: "large" }}>{opportunity}</label>
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
          <div style={{ marginTop: "2em" }} className="float-end">
            {allQuestions > index + 1 && (
              <Button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                primary
                className="btn"
                content="Next"
              />
            )}
          </div>
        </Form.Field>
      </>
    );
  }
);

export default ResponseForm;
