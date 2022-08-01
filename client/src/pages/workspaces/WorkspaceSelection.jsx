import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, List, Button, Icon, Loader, Message } from 'semantic-ui-react';
import { USER_STATUS } from '../../common/constants';
import {
  authLoginSelector,
  logoutUser,
} from '../../features/auth/authLoginSlice';
import {
  joinNewWorkspace,
  resetJoinWorkspace,
  workspaceJoinSelector,
} from '../../features/workspace/workspaceJoinSlice';
import {
  fetchWorkspaces,
  workspaceListSelector,
} from '../../features/workspace/workspaceListSlice';
import {
  createWorkspace,
  removeSelf,
  selectWorkspace,
  workspaceSelectSelector,
} from '../../features/workspace/workspaceSelectSlice';

const WorkspaceSelection = () => {
  const { userLogin } = useSelector(authLoginSelector);
  const { loading, error, workspaces } = useSelector(workspaceListSelector);
  const {
    loading: selectLoading,
    error: selectError,
    userWorkspace,
  } = useSelector(workspaceSelectSelector);

  const { loading: joinLoading, error: joinError, workspaceJoin } = useSelector(
    workspaceJoinSelector
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkspaces(userLogin.id));
    if (workspaceJoin) {
      dispatch(resetJoinWorkspace());
    }
  }, [workspaceJoin]);

  useEffect(() => {
    if (userWorkspace && userWorkspace.status === USER_STATUS.ACTIVE) {
      navigate('/');
    }
  }, [userWorkspace]);

  const handleTeamSelection = (teamId) => {
    dispatch(selectWorkspace(teamId));
  };

  const createNewTeam = () => {
    dispatch(createWorkspace());
    navigate('/subscription');
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const handleInvitation = (teamId) => {
    dispatch(joinNewWorkspace(userLogin.id, teamId));
  };

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header className='fw-light'>
            Teams for <strong className='fw-bold'>{userLogin.email}</strong>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Loader active={loading} inline='centered' />
          {error && (
            <Message color='red' className='error-message mb-3'>
              {error}
            </Message>
          )}
          <Loader active={selectLoading} inline='centered' />
          {selectError && (
            <Message color='red' className='error-message mb-3'>
              {selectError}
            </Message>
          )}
          <List selection animated divided relaxed='very'>
            {workspaces.activeTeamList.map((workspace) => (
              <List.Item
                key={workspace.teamId}
                onClick={() => handleTeamSelection(workspace.teamId)}
              >
                <List.Content floated='right'>
                  <Icon name='arrow right' className='my-2' />
                </List.Content>
                <List.Content>
                  <List.Header>{workspace.name}</List.Header>
                  <List.Description>
                    {workspace.totalMembers} members
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Card.Content>
      </Card>

      <Card fluid className='my-5'>
        <Card.Content>
          <List relaxed='very'>
            <List.Item>
              <List.Content floated='right' className='pt-1'>
                <Button basic onClick={createNewTeam}>
                  Create Another Team
                </Button>
              </List.Content>
              <List.Content>
                <List.Header className='pt-3'>
                  Want to use Refractio with a different team?
                </List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>

      {workspaces.invitedTeamList.length > 0 && (
        <Card fluid>
          <Card.Content>
            <Card.Header className='fw-light'>
              Invitations for{' '}
              <strong className='fw-bold'>{userLogin.email}</strong>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            {joinError && (
              <Message color='red' className='error-message mb-3'>
                {joinError}
              </Message>
            )}
            <List divided relaxed='very'>
              {workspaces.invitedTeamList.map((workspace) => (
                <List.Item
                  key={workspace.teamId}
                  onClick={() => handleInvitation(workspace.teamId)}
                >
                  <List.Content floated='right'>
                    <Button basic loading={joinLoading}>
                      Join
                    </Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>{workspace.name}</List.Header>
                    <List.Description>
                      {workspace.totalMembers} members
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Card.Content>
        </Card>
      )}
      <div className='text-center'>
        <div>Not seeing your team?</div>
        <span className='primary-color cursor-pointer' onClick={logout}>
          Try a different email/Logout
        </span>{' '}
        {workspaces.invitedTeamList.length === 0 &&
          workspaces.activeTeamList.length === 0 && (
            <>
              |{' '}
              <span
                className='primary-color cursor-pointer'
                onClick={() => dispatch(removeSelf())}
              >
                Remove account
              </span>
            </>
          )}
      </div>
    </>
  );
};

export default WorkspaceSelection;
