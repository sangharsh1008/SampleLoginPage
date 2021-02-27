import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

function NavBar(props) {
  const logOut = ()=>{
    console.log(props);
    return  props.isUserLogged && <Button onClick={()=>{
      props.dispatch({ type:'userLoggedIn',payload:{isUserLogged:false}})
    }}>Log out</Button>
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            {props.isUserLogged? 'Logout' : 'Login' }
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="/category/electronics">
              Electronics
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/jewelery">
              Jewelery
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/men clothing">
              Men Clothing
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/women clothing">
              Women Clothing
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {logOut()}
      </Navbar.Collapse>
    </Navbar>
  );
}

function stateToProps(state) {
  console.log(state);
  return {
    isUserLogged:state.reducer.isUserLogged,
  };
}
export default connect(stateToProps)(NavBar);
