import React from 'react';
import { Header, Menu, Segment, Sidebar } from 'semantic-ui-react';

const SideBar = () => (
  <Sidebar.Pushable as={Segment} className='sidebar' max-width={'240px'}>
    <Sidebar
      className='sidebar'
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
      <Menu.Item as='a' floated='left'>
        Manage
        <br />
      </Menu.Item>
      <br />

      <Menu.Item as='a'>Oppertunities</Menu.Item>
      <Menu.Item as='a'>Team</Menu.Item>
      <br />
      <Menu.Item as='a'>
        Account
        <br />
      </Menu.Item>
      <br />
      <Menu.Item as='a'>Billing</Menu.Item>
      <Menu.Item as='a'>Logout</Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic>
        <Header as='h3'>Application Content</Header>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default SideBar;
