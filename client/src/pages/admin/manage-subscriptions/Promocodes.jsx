import React from 'react';
import {
  Grid,
  Header,
  Button,
  Card,
  List,
  Icon,
  Dropdown,
} from 'semantic-ui-react';
const Promocodes = () => {
  const codes = [
    {
      id: '1',
      code: 'j4h&jkkdnuw',
    },
    {
      id: '2',
      code: 'j4h&jkkdn31',
    },
    {
      id: '3',
      code: 'j4h&jkkdnud',
    },
    {
      id: '4',
      code: 'j4h&jkkdn39',
    },
    {
      id: '5',
      code: 'j4h&jkkdn32',
    },
  ];

  const handleCopyToClipboard = (e, text) => {
    navigator.clipboard.writeText(text);
    e.target.classList.remove('copy');
    e.target.classList.add('check');
    setTimeout(() => {
      e.target.classList.remove('check');
      e.target.classList.add('copy');
    }, 1000);
  };
  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Header as='h3' className='primary-dark-color' floated='left'>
            Promocodes management
          </Header>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button primary className='btn' floated='right'>
            Add
          </Button>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <Card>
            <Card.Content>
              <Card.Header>
                5% Codes
                <Dropdown icon='ellipsis horizontal' className='float-end'>
                  <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Remove</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <List>
                {codes.map((code) => (
                  <List.Item key={code.id}>
                    <List.Content floated='right'>
                      <Button icon size='mini' circular>
                        <Icon
                          name='copy'
                          onClick={(e) => handleCopyToClipboard(e, code.code)}
                        />
                      </Button>
                    </List.Content>
                    <span>{code.code}</span>
                  </List.Item>
                ))}
              </List>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Promocodes;
