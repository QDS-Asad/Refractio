import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { Header, Menu, Segment, Sidebar, Image } from 'semantic-ui-react';
import { authLoginSelector, logoutUser } from '../features/auth/authLoginSlice';
import { ROLES } from '../common/constants';
import NavBar from './Navbar';

const SideBar = () => {
  const { userLogin } = useSelector(authLoginSelector);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Sidebar.Pushable
      as={Segment}
      className='vw-100 min-vh-100 top-0 start-0 m-0 border-0 rounded-0'
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

        {(userLogin.role.roleId === ROLES.ADMIN ||
          userLogin.role.roleId === ROLES.ORGANIZER ||
          userLogin.role.roleId === ROLES.PARTICIPANT) && (
          <Menu.Item as={NavLink} to='/opportunities'>
            <Image src='/images/opportunities.svg' verticalAlign='middle' />
            <span className='ps-2'>Opportunities</span>
          </Menu.Item>
        )}

        {(userLogin.role.roleId === ROLES.ADMIN ||
          userLogin.role.roleId === ROLES.ORGANIZER ||
          userLogin.role.roleId === ROLES.PARTICIPANT) && (
          <Menu.Item as={NavLink} to='/team'>
            <Image src='/images/team.svg' verticalAlign='middle' />
            <span className='ps-2'>Team</span>
          </Menu.Item>
        )}

        {userLogin.role.roleId === ROLES.SUPER_ADMIN && (
          <Menu.Item as={NavLink} to='/admin/users'>
            <Image src='/images/team.svg' verticalAlign='middle' />
            <span className='ps-2'>Users management</span>
          </Menu.Item>
        )}
        {userLogin.role.roleId === ROLES.SUPER_ADMIN && (
          <Menu.Item as={NavLink} to='/admin/orders'>
            <Image src='/images/manage-orders.svg' verticalAlign='middle' />
            <span className='ps-2'>Orders management</span>
          </Menu.Item>
        )}
        {userLogin.role.roleId === ROLES.SUPER_ADMIN && (
          <Menu.Item as={NavLink} to='/admin/subscriptions'>
            <Image
              src='/images/manage-subscription.svg'
              verticalAlign='middle'
            />
            <span className='ps-2'>Subscription management</span>
          </Menu.Item>
        )}
        {userLogin.role.roleId === ROLES.SUPER_ADMIN && (
          <Menu.Item as={NavLink} to='/admin/opportunities'>
            <Image
              src='/images/manage-opportunities.svg'
              verticalAlign='middle'
            />
            <span className='ps-2'>Opportunities management</span>
          </Menu.Item>
        )}
        {userLogin.role.roleId === ROLES.SUPER_ADMIN && (
          <Menu.Item as={NavLink} to='/admin/content'>
            <Image src='/images/manage-content.svg' verticalAlign='middle' />
            <span className='ps-2'>Content management (Landing)</span>
          </Menu.Item>
        )}

        <Menu.Item>
          <Menu.Menu>
            <Menu.Item name='Account' className='fs-6 text-uppercase' />
          </Menu.Menu>
        </Menu.Item>
        {userLogin.role.roleId === ROLES.ADMIN && (
          <Menu.Item as={NavLink} to='/billing'>
            <Image src='/images/billing.svg' verticalAlign='middle' />
            <span className='ps-2'>Billing</span>
          </Menu.Item>
        )}

        <Menu.Item as='a' onClick={logoutHandler}>
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
};

export default SideBar;
