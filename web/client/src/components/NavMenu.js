import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>web</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {/* <LinkContainer to={'/'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Home
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/counter'}>
          <NavItem>
            <Glyphicon glyph='education' /> Counter
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/fetchdata'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Fetch data
          </NavItem>
        </LinkContainer> */}
        <LinkContainer to={'/restcalls'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> REST Calls
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/jsonedit'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> JSON Edit
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/createdata'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Create Data Source
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/createentity'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Create Entity
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
