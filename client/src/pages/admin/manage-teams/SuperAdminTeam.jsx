import * as React from 'react';
import { Table, Icon, Loader, Message, Button } from 'semantic-ui-react';
import { formatDate } from '../../../utils/dateHelper';
import refractioApi from '../../../common/refractioApi';

export const SuperAdminTeam = ({ user, remove }) => {
  const [activeIndex, setActiveIndex] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUser] = React.useState([]);
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
        `/users/team-users/${id}`
      );
      setUser(response.data);
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
          }}
          style={{ cursor: 'pointer' }}>
          <Icon name={activeIndex ? 'dropdown' : 'caret right'} />
          {user.teamName || 'N/A'}
        </Table.Cell>
        <Table.Cell className='text-capitalize'>
          {user.teamStatus === 'disabled' ? 'deleted' : user.teamStatus}
        </Table.Cell>
        <Table.Cell className='text-capitalize'>
          {user.teamStatus !== 'disabled' ? (
            <>
              {user.subscription.status || 'N/A'}{' '}
              {`${
                user.subscription.inactiveFor
                  ? `(Inactive for ${user.subscription.inactiveFor} day/s)`
                  : ''
              }`}
            </>
          ) : (
            'N/A'
          )}
        </Table.Cell>
        <Table.Cell>
          {user.teamStatus !== 'disabled'
            ? user.subscription.nextBillingAt
              ? formatDate(user.subscription.nextBillingAt)
              : 'N/A'
            : 'N/A'}
        </Table.Cell>
        <Table.Cell>{user.totalMembers}</Table.Cell>
        <Table.Cell className='clearfix'>
          {user.teamStatus !== 'disabled' && (
            <Button
              className='btn-link-danger'
              onClick={() => remove(user._id)}>
              Remove
            </Button>
          )}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        {activeIndex && (
          <div>
            <Table basic='very'>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>User Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {loading && (
                  <Table.Row>
                    <Table.Cell>
                      <Loader active={loading} inline='centered' />
                    </Table.Cell>
                    {error && (
                      <Table.Cell>
                        <Message color='red' className='error-message mb-3'>
                          {error}
                        </Message>
                      </Table.Cell>
                    )}
                  </Table.Row>
                )}
                {!loading &&
                  userDetails.length > 0 &&
                  userDetails.map((detail, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {detail.firstName
                          ? detail.firstName + ' ' + detail.lastName
                          : 'Pending Invitation'}
                      </Table.Cell>
                      <Table.Cell className='text-capitalize'>
                        {detail.role.name}
                      </Table.Cell>
                      <Table.Cell>{detail.email}</Table.Cell>
                      <Table.Cell className='text-capitalize'>
                        {detail.status}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Table.Row>
    </>
  );
};
