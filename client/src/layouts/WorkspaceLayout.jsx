import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authLoginSelector } from '../features/auth/authLoginSlice';
import { Grid, Header } from 'semantic-ui-react';
import { workspaceListSelector } from '../features/workspace/workspaceListSlice';

const WorkspaceLayout = () => {
  const { loading, userLogin } = useSelector(authLoginSelector);
  const { workspaces } = useSelector(workspaceListSelector);

  if (!loading && !userLogin) {
    return <Navigate to='/auth/login' />;
  }
  return (
    <Grid verticalAlign='middle' centered style={{ minHeight: '100vh' }}>
      <Grid.Row>
        <Grid.Column computer={6} tablet={10} mobile={15}>
          <Header
            as='h3'
            image='/logo-dark.svg'
            content='Refractio'
            className='primary-dark-color mt-3'
            textAlign='center'
          />
          <Header as='h2' className='text-center my-5'>
            Welcome back!
            {workspaces && workspaces.activeTeamList.length > 0 && (
              <Header.Subheader>Choose a team.</Header.Subheader>
            )}
          </Header>
          <Outlet />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkspaceLayout;
