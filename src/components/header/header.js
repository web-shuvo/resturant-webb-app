import { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggling: false,
    }
  }

  setToggle = () => {
    this.setState({
      toggling: !this.state.toggling
    })
  }

  render() {
    return (
      <>

        <Navbar color="light" expand="sm" light container >

          <NavbarBrand href="/"><img src='logo192.png' alt='Logo' width='40px' /></NavbarBrand>
          <NavbarToggler onClick={this.setToggle} />
          <Collapse isOpen={this.state.toggling} navbar>
            <Nav className="m-auto text-center" navbar>
              <NavItem >
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem >
                <Link to="/about-us">About Us</Link>
              </NavItem>
              <NavItem>
                <Link to="/contact-us">Contact Us</Link>
              </NavItem>
            </Nav>
          </Collapse>

        </Navbar>

      </>
    )
  }

}

export default Header;