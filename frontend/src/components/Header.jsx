
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useGlobalContext} from '../context';

const Header = () => {
  console.log(useGlobalContext());
    const {submitLogout,update_form_btn,currentUser} = useGlobalContext();

    if (currentUser) {
        return (
          <div>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand>Authentication App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <form onSubmit={e => submitLogout(e)}>
                      <Button type="submit" variant="light">Log out</Button>
                    </form>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
              <div className="center">
                <h2>You're logged in!</h2>
              </div>
            </div>
        );
      }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Authentication App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
