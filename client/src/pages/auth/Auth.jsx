import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';

const Auth = () => {
  const isMobile = useMediaQuery({
    query: '(max-height: 600px)',
  });
  return (
    <Grid celled className='auth vh-100'>
      <Grid.Row>
        <Grid.Column mobile='16' computer='5' className='p-4'>
          <Header
            className='position-absolute'
            as='h2'
            image='/logo-dark.svg'
            content='Refractio'
          />
          <div
            className={`d-flex justify-content-center align-items-center h-100 pt-5 ${isMobile &&
              'mt-5'}`}>
            <Outlet />
          </div>
        </Grid.Column>
        <Grid.Column only='computer' width={11} className='primary-bg'>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='logo'>
              <Header
                as='h1'
                image='/logo192.png'
                content='Refractio'
                className='text-light fs-heading fw-light'
              />
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Auth;
