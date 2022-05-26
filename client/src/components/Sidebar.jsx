import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Menu, Segment, Sidebar, Image } from 'semantic-ui-react';
import NavBar from './Navbar';

const SideBar = () => (
  <Sidebar.Pushable
    as={Segment}
    className='  vw-100 vh-100 top-0 start-0 m-0 border-0 rounded-0'
  >
    <Sidebar
      as={Menu}
      animation='slide along'
      inverted
      vertical
      visible
      className='primary-bg'
    >
      <Menu.Item header>
        <Header
          as='h3'
          image='/logo.svg'
          content='Refractio'
          className='text-light'
          textAlign='center'
        />
      </Menu.Item>
      <Menu.Item>
        <Menu.Menu>
          <Menu.Item name='Manage' className='fs-6 text-uppercase' />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item as='a' active>
        <Image src='/images/opportunities.svg' verticalAlign='middle' />
        <span className='ps-2'>Oppertunities</span>
      </Menu.Item>
      <Menu.Item as='a'>
        <Image src='/images/team.svg' verticalAlign='middle' />
        <span className='ps-2'>Team</span>
      </Menu.Item>
      <Menu.Item>
        <Menu.Menu>
          <Menu.Item name='Account' className='fs-6 text-uppercase' />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item as='a'>
        <Image src='/images/billing.svg' verticalAlign='middle' />
        <span className='ps-2'>Billing</span>
      </Menu.Item>
      <Menu.Item as='a'>
        <Image src='/images/logout.svg' verticalAlign='middle' />
        <span className='ps-2'>Logout</span>
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher className='sidebar-pusher'>
      <NavBar />
      <Segment basic className='px-4 py-3'>
        <Outlet />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default SideBar;
