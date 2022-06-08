import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Menu } from 'semantic-ui-react';
import { authLoginSelector } from '../features/auth/authLoginSlice';
const NavBar = ({ showLogo = false }) => {
  const { userLogin } = useSelector(authLoginSelector);
  return (
    <>
      <Menu>
        {showLogo && (
          <Menu.Menu position='left'>
            <Menu.Item header className='logo'>
              <Header
                as='h4'
                image='/logo-dark.svg'
                content='Refractio'
                className='primary-dark-color ms-4'
                textAlign='center'
              />
            </Menu.Item>
          </Menu.Menu>
        )}

        <Menu.Menu position='right'>
          <Menu.Item
            as='a'
            name={userLogin.fullName}
            className='me-4'
            style={{ color: '#98A6AD', minHeight: '4.5rem' }}
          />
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default NavBar;
