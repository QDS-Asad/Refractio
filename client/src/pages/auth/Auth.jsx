import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const Auth = ({ children }) => {
  return (
    <Grid celled className='auth vh-100'>
      <Grid.Row>
        <Grid.Column width={6} className='p-4'>
          <Header
            className='position-absolute'
            as='h1'
            image='/logo192.png'
            content='Refractio'
          />
          <div className='d-flex justify-content-center align-items-center h-100'>
            {children}
          </div>
        </Grid.Column>
        <Grid.Column width={10} className='primary-bg'>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='logo'>
              <Header
                as='h1'
                image='/logo192.png'
                content='Refractio'
                className='text-light'
              />
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Auth;
