import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <div>
      <Container className='nav '>
        <Menu stackable>
          <Menu.Item position={'right'}>Dominic Keller</Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};

export default NavBar;
