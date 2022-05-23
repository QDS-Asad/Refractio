import React, { Component } from 'react'
import { Menu, Header,Container } from 'semantic-ui-react'
const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}



  const NavBar = () => {


    return (
      <div>
    <Container className='nav '>
      <Menu stackable>
        
        <Menu.Item position={"right"}>Dominic Keller</Menu.Item>     
      </Menu>
    </Container>

       
      </div>
    )
  }

export default NavBar;
