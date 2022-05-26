import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <>
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item
            as='a'
            name='Dominic Kelle'
            className='me-4'
            style={{ color: '#98A6AD', minHeight: '4.5rem' }}
          />
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default NavBar;
