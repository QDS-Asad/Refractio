import * as React from 'react';
import { Button, Table, Icon, Loader, Message } from 'semantic-ui-react';
import refractioApi from '../../common/refractioApi';

export const SuperAdminUser = ({ user, removeTeamMemberHandler }) => {
  const [activeIndex, setActiveIndex] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (activeIndex) {
      getUserInfo(user._id);
    }
  }, [activeIndex]);

  const getUserInfo = async (id) => {
    try {
      setLoading(true);
      let { data: response } = await refractioApi.get(
        `/users/user-details/${id}`
      );
      setUser(response.data[0]);
      setLoading(false);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Table.Row key={user._id}>
        <Table.Cell
          onClick={() => {
            setActiveIndex((prev) => !prev);
          }}>
          <Icon name='dropdown' />
          {user.firstName + ' ' + user.lastName}
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>

        <Table.Cell className='clearfix'>
          <Button
            className='btn-link'
            floated='right'
            onClick={() => removeTeamMemberHandler(user._id)}>
            Remove
          </Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Loader active={loading} inline='centered' />
        {error && (
          <Message color='red' className='error-message mb-3'>
            {error}
          </Message>
        )}
        {activeIndex && <Table.Cell>{user.email}</Table.Cell>}
      </Table.Row>
    </>
  );
};
