import React from "react";
import classNames from "classnames";
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import './style.css'

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container
} from "reactstrap";

import isAuthenticated from '../common/auth.js'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      isLogin:true,
      avilable:null,
      name:''
      ,role:""
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    const token= localStorage.getItem('token')
    if(token){
          const decoded=jwtDecode(token)

    if(decoded.role=="admin" || decoded.role=="mentor"){
      this.setState({
        avilable:true,
        name:decoded.name,
        role:decoded.role
      })
    }
    }
    

  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  logoutUser=()=>{
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }
  render() {
    const auth=isAuthenticated();
    const authLinks=(
      <Container fluid>
        <div className="navbar-wrapper">
          <div
            className={classNames("navbar-toggle d-inline", {
              toggled: this.props.sidebarOpened
            })}
          >
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.props.toggleSidebar}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
            Meeting App
          </NavbarBrand>
        </div>
        <button
          aria-expanded={false}
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-target="#navigation"
          data-toggle="collapse"
          id="navigation"
          type="button"
          onClick={this.toggleCollapse}
        >
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <Collapse navbar isOpen={this.state.collapseOpen}>
          <Nav className="ml-auto" navbar>
            <NavLink>
              <Link className="logo font-weight-bold" to={this.state.avilable ? '/admin/meeting': '/'} >Home</Link>
            </NavLink>
            <NavLink>
              <Link className="logo font-weight-bold" to="/about" >About</Link>
            </NavLink>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                nav
                onClick={e => e.preventDefault()}
              >
                <div className="photo">
                  <img alt="..." src={require("../../assets/img/anime3.png")} />
                </div>
                <b className="caret d-none d-lg-block d-xl-block" />

          <span className="user">
            {this.state.name? 
            this.state.name:''
            }
            {this.state.role?
            <span className="text-capitalize"> ({this.state.role}) </span>:''
            }
          </span>


              </DropdownToggle>
              <DropdownMenu className="dropdown-navbar" right tag="ul">
              <NavLink tag="li">
                  <DropdownItem className="nav-item">
                    <Link className="text-muted" to="/profile">  View Profile</Link>
                  </DropdownItem>
                </NavLink>
                <NavLink tag="li">
                  <DropdownItem className="nav-item">
                    <Link className="text-muted" to="/admin/changePassword">  Change Password</Link>
                  </DropdownItem>
                </NavLink>
                <NavLink tag="li">
                  <DropdownItem className="nav-item">
                    <Link className="text-muted" to="" onClick={this.logoutUser}>Log Out</Link>
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <li className="separator d-lg-none" />
          </Nav>
        </Collapse>
      </Container>
    )
    const guestLinks=(
      <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              Meeting App
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <NavLink>
                  <Link className="logo font-weight-bold" to="/" >Home</Link>
                </NavLink>
                <NavLink>
                  <Link className="logo font-weight-bold" to="/about" >About</Link>
                </NavLink>
                <NavLink>
                  <Link className="logo font-weight-bold" to="/blog" >Blog</Link>
                </NavLink>
                <NavLink>
                  <Link className="logo font-weight-bold" to="/register" >Sign Up</Link>
                </NavLink>
                <NavLink>
                  <Link className="logo font-weight-bold" to="/login" >Sign In</Link>
                </NavLink>
              </Nav>
            </Collapse>
          </Container>
    )
    return (
      <Navbar className={classNames("navbar-absolute", this.state.color)} expand="lg">
         {auth ? authLinks : guestLinks}
      </Navbar>
    );
  }
}

export default Header;
