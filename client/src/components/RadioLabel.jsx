import React, { memo } from 'react';
import { Radio } from 'semantic-ui-react';

function RadioLabel({
  options,
  currentQuestion,
  comprehensionRating,
  ideaRating,
  handleComprehensionChange,
  handleIdeaChange,
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {options.map((option, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          key={index}
        >
          <div style={{ alignSelf: 'center' }}>
            {currentQuestion === 1 ? (
              <Radio
                key={option.key}
                value={option.value}
                checked={ideaRating === option.value}
                onChange={handleIdeaChange}
              />
            ) : (
              <Radio
                key={option.key}
                value={option.value}
                checked={comprehensionRating === option.value}
                onChange={handleComprehensionChange}
              />
            )}
          </div>
          <div style={{ alignSelf: 'center' }}>{option.text}</div>
          <div>{option.subText}</div>
        </div>
      ))}
    </div>
  );
}

export default memo(RadioLabel);
