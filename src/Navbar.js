import React, { Component } from 'react';
import SearchInput, {createFilter} from 'react-search-input'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  Form, Input } from 'reactstrap';


export default class Example extends React.Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
        
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    SearchTag = () =>{
    
        }
    render() {
        return (
            <div>
            <Navbar color="dark" dark expand="md">


                <NavbarBrand href="/">1512092-Flickr</NavbarBrand>
              
                <NavbarToggler onChange={this.toggle} />
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <Form  inline  action = "/searchTag" >
                        <Input  placeholder="Search" onChange={this.SearchTag} name = "tag" align="right" />
                    </Form>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/">Explore</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/searchTag">Search Tag</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>
        );
    }
  }

