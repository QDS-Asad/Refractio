import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Header, Icon, Menu } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { authLoginSelector } from '../features/auth/authLoginSlice';
import EditProfile from './EditProfile';
const NavBar = ({ showLogo = false, setVisible }) => {
  const [editProfile, setEditProfile] = useState(false);
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
        {setVisible && (
          <MediaQuery maxWidth={800}>
            <Menu.Menu position='left'>
              <Menu.Item onClick={() => setVisible((prev) => !prev)} header>
                <Icon name='content' size='large' />
              </Menu.Item>
            </Menu.Menu>
          </MediaQuery>
        )}
        <Menu.Menu position='right'>
          <Dropdown
            item
            text={`${userLogin.firstName} ${userLogin.lastName} `}
            className='me-4'
            style={{ color: '#98A6AD', minHeight: '4.5rem' }}>
            <Dropdown.Menu>
              <Dropdown.Item
                icon='edit'
                text='Edit Profile'
                onClick={() => setEditProfile(true)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <EditProfile
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        userInfo={userLogin}
      />
    </>
  );
};

export default NavBar;
