import React from 'react';
import { Button, Form, Message, Modal, Checkbox } from 'semantic-ui-react';
const ChangeCard = ({ changeCard, setChangeCard }) => {
  const error = null;
  return (
    <Modal
      onClose={() => setChangeCard(false)}
      onOpen={() => setChangeCard(true)}
      open={changeCard}
      dimmer='blurring'
      size='small'
      closeIcon
    >
      <Modal.Header color='red'>Change Card</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <Form id='change-card'>
            <Form.Field className='mb-3'>
              <label>Name on card</label>
              <Form.Input name='text' fluid placeholder='Enter name on card' />
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Card number</label>
              <Form.Input name='text' fluid placeholder='0000 0000 0000 0000' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field className='mb-3'>
                <label>Expiration Date</label>
                <Form.Input name='text' fluid placeholder='MM/YY' />
              </Form.Field>
              <Form.Field className='mb-3'>
                <label>CVV</label>
                <Form.Input name='text' fluid placeholder='3 digits' />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Checkbox label='Autorenewal subscription' />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' onClick={() => setChangeCard(false)} />
        <Button
          type='submit'
          form='change-card'
          content='Save'
          className='btn'
          onClick={() => setChangeCard(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ChangeCard;
