import React from "react";
import {
  Header,
  Container,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import NavBar from "./Navbar";

const SideBar = () => (
    
 
     
    <Sidebar.Pushable
      as={Segment}
      className="sidebar"
    //   height={"100vh"}
    //   max-width={"240px"}
      
    >
      <Sidebar
        className="sidebar"

        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        direction='right'
      >
        <Menu.Item as="a">
        Manage
        <br/>
        <Menu.Item as="a">Oppertunities</Menu.Item>
        <Menu.Item as="a">Team</Menu.Item>
        </Menu.Item>
        <Menu.Item as="a">
        Account
        <br/>
        <Menu.Item as="a">Billing</Menu.Item>
        <Menu.Item as="a">Logout</Menu.Item>
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <Header as="h3">Application Content</Header>
          {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
    // <div className="w-auto"> 
    //   <NavBar />
    //   </div>
  
);

export default SideBar;
