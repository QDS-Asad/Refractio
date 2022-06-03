import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { authLoginSelector } from '../features/auth/authLoginSlice';
const NavBar = () => {
  const { userLogin } = useSelector(authLoginSelector);
  return (
    <>
      <Menu>
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
