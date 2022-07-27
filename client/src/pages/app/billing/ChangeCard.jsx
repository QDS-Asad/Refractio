import React, { useEffect } from 'react';
// import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message, Modal, Checkbox } from 'semantic-ui-react';
import { authLoginSelector } from '../../../features/auth/authLoginSlice';
import {
  AddUserCard,
  changeCardSelector,
  changeUserCard,
  resetChangeCard,
} from '../../../features/billing/changeCardSlice';
const ChangeCard = ({ changeCard, setChangeCard, title }) => {
  const { register, setValue, handleSubmit, errors, trigger } = useForm({
    mode: 'onBlur',
    defaultValues: {
      autoRenew: true,
    },
  });

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(changeCardSelector);

  const { userLogin } = useSelector(authLoginSelector);

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const handleChangeCheckBox = (e) => {
    e.persist();
    setValue(e.target.name, e.target.checked);
    trigger(e.target.name);
  };

  const handleCreate = (data) => {
    // dispatch user change card;
    if (title === 'Change') {
      dispatch(changeUserCard(userLogin.id, data));
    } else {
      dispatch(AddUserCard(userLogin.id, data));
    }
  };

  const createOptions = {
    nameOnCard: {
      required: 'Name on card is required',
    },
    cardNumber: {
      required: 'Card number is required',
    },
    cardExpiry: {
      required: 'Card expiry is required',
      pattern: {
        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        message: 'Invalid expiry date.',
      },
    },
    cardCvv: {
      required: 'Card Cvv is required',
      maxLength: {
        value: 3,
        message: "Card cvc can't exceed from 3 numbers",
      },
      minLength: {
        value: 3,
        message: 'Enter at least 3 numbers',
      },
      pattern: {
        value: /^[0-9]*$/,
        message: 'Only numbers are allowed',
      },
    },
  };

  useEffect(() => {
    register({ name: 'nameOnCard' }, createOptions.nameOnCard);
    register({ name: 'cardNumber' }, createOptions.cardNumber);
    register({ name: 'cardExpiry' }, createOptions.cardExpiry);
    register({ name: 'cardCvv' }, createOptions.cardCvv);
    register({ name: 'autoRenew' });
  }, []);

  useEffect(() => {
    if (success) {
      setChangeCard(false);
      dispatch(resetChangeCard());
    }
  }, [success]);

  return (
    <Modal
      onClose={() => setChangeCard(false)}
      onOpen={() => setChangeCard(true)}
      open={changeCard}
      dimmer='blurring'
      size='small'
      closeIcon
    >
      <Modal.Header color='red'>{title} Card</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <Form
            id='change-card'
            onSubmit={handleSubmit(handleCreate)}
            loading={loading}
            error
          >
            <Form.Field className='mb-3'>
              <label>Name on card</label>
              <Form.Input
                name='nameOnCard'
                fluid
                placeholder='Enter name on card'
                error={!!errors.nameOnCard}
                onBlur={handleChange}
              />
              {errors && errors.nameOnCard && (
                <Message error content={errors.nameOnCard.message} />
              )}
            </Form.Field>
            <Form.Field className='mb-3'>
              <label>Card number</label>
              <Form.Input
                name='cardNumber'
                fluid
                placeholder='0000 0000 0000 0000'
                error={!!errors.cardNumber}
                onBlur={handleChange}
              />
              {/* <Controller
                as={InputMask}
                control={control}
                name='cardNumber'
                mask='9999 9999 9999 9999'
                placeholder='0000 0000 0000 0000'
                error={errors && errors.cardNumber && errors.cardNumber.message}
                onBlur={handleChange}
                defaultValue=''
              /> */}

              {/* <Controller
                name='cardNumber'
                control={control}
                defaultValue=''
                render={({ onBlur, value }) => (
                  <InputMask
                    mask='9999 9999 9999 9999'
                    value={value}
                    onBlur={handleChange}
                  >
                    {(inputProps) => (
                      <Form.Input
                        error={!!errors.cardNumber}
                        type='text'
                        fluid
                        placeholder='0000 0000 0000 0000'
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              /> */}

              {errors && errors.cardNumber && (
                <Message error content={errors.cardNumber.message} />
              )}
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field className='mb-3'>
                <label>Expiration Date</label>
                <Form.Input
                  name='cardExpiry'
                  fluid
                  placeholder='MM/YY'
                  error={!!errors.cardExpiry}
                  onBlur={handleChange}
                />

                {errors && errors.cardExpiry && (
                  <Message error content={errors.cardExpiry.message} />
                )}
              </Form.Field>
              <Form.Field className='mb-3'>
                <label>CVV</label>
                <Form.Input
                  name='cardCvv'
                  fluid
                  placeholder='3 digits'
                  error={!!errors.cardCvv}
                  onBlur={handleChange}
                />

                {errors && errors.cardCvv && (
                  <Message error content={errors.cardCvv.message} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Checkbox
                label='Autorenewal subscription'
                name='autoRenew'
                defaultChecked
                onBlur={handleChangeCheckBox}
              />
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
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ChangeCard;
