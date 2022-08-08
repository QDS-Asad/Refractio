import * as React from 'react';
import { Button, Table, Icon, Loader, Message } from 'semantic-ui-react';
import refractioApi from '../../common/refractioApi';
import { formatDate } from '../../utils/dateHelper';

export const SuperAdminUser = ({ user, removeTeamMemberHandler }) => {
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
        `/users/user-details/${id}`
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
          style={{ cursor: 'pointer' }}
        >
          <Icon name={activeIndex ? 'dropdown' : 'caret right'} />
          {user.firstName
            ? user.firstName + ' ' + user.lastName
            : 'Pending Invitation'}
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        {/* <Table.Cell className='clearfix'>
          <Button
            className='btn-link'
            floated='right'
            onClick={() => removeTeamMemberHandler(user._id)}
          >
            Remove
          </Button>
        </Table.Cell> */}
      </Table.Row>
      <Table.Row>
        {activeIndex && (
          <div>
            <Table basic='very'>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Team Name</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell>User Status</Table.HeaderCell>
                  <Table.HeaderCell>Team Status</Table.HeaderCell>
                  <Table.HeaderCell>Subscription Status</Table.HeaderCell>
                  <Table.HeaderCell>Next Billing At</Table.HeaderCell>
                  <Table.HeaderCell>Total Members</Table.HeaderCell>
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
                  userDetails.map((detail) => (
                    <Table.Row key={detail.teamId}>
                      <Table.Cell>{detail.teamName}</Table.Cell>
                      <Table.Cell>{detail.role.name}</Table.Cell>
                      <Table.Cell>
                        {detail.userStatus === 'disabled'
                          ? 'deleted'
                          : detail.userStatus}
                      </Table.Cell>
                      <Table.Cell>{detail.teamStatus}</Table.Cell>
                      <Table.Cell>
                        {detail.subscription.status || 'N/A'}
                      </Table.Cell>
                      <Table.Cell>
                        {detail.subscription.nextBillingAt
                          ? formatDate(detail.subscription.nextBillingAt)
                          : 'N/A'}
                      </Table.Cell>
                      <Table.Cell>
                        {detail.totalMembers + ' member/s'}
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
