import React, { memo } from 'react';
import { Form } from 'semantic-ui-react';

function RadioLabel({
  options,
  rating,
  handleChange,
  name,
  errors,
  evaluation,
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {options.map((option, index) => (
        <Form.Group key={index} inline>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            className='radiolabelcustom'
          >
            <div style={{ alignSelf: 'center' }}>
              <Form.Radio
                key={option.key}
                value={option.value}
                name={name}
                checked={rating === option.value}
                onChange={handleChange}
                error={!!errors[name]}
                disabled={evaluation && evaluation === 'publish'}
              />
            </div>
            <div
              style={{
                alignSelf: 'center',
                color: !!errors[name] ? '#9f3a38' : 'black',
              }}
            >
              {option.text}
            </div>
            <div style={{ color: !!errors[name] ? '#9f3a38' : 'black' }}>
              {option.subText}
            </div>
          </div>
        </Form.Group>
      ))}
    </div>
  );
}

export default memo(RadioLabel);
