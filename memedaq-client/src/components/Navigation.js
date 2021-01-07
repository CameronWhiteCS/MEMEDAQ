import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ReactComponent as User } from "../icons/user.svg";
import { ReactComponent as DogeCoin } from "../icons/dogecoin.svg";
import { ReactComponent as Graph } from "../icons/bar-chart-2.svg";
import { ReactComponent as Bell } from "../icons/bell.svg";

const Naivigation = (props) => {
  const iconContainerStyle = {
    display: "block",
    position: "absolute",
    right: "0px",
  };

  const linkStyle = {
    outline: "none",
  };

  const iconLinkStyle = {
    display: "inline",
    outline: "none",
  };

  const iconStyle = {
    width: "24px",
    height: "24px",
  };

  return (
    <Navbar variant="dark" bg="primary" expand="lg">
      <Link to="/" style={linkStyle} className="navbar-brand">
        MEMEDAQ
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {props.signedIn === false && (
            <Link style={linkStyle} className="nav-link" to="/signin">
              Sign In
            </Link>
          )}
          {props.signedIn === true && (
            <Link style={linkStyle} className="nav-link d-lg-none" to="/profile/">
              Profile
            </Link>
          )}
          <Link style={linkStyle} className="nav-link" to="/stonks/">
            Stonks
          </Link>
          {props.signedIn === true &&
            <Link style={linkStyle} className="nav-link" to="/portfolio/">
              Portfolio
            </Link>
          }
          <Link style={linkStyle} className="nav-link" to="/news">
            News
          </Link>
          <Link style={linkStyle} className="nav-link" to="/about">
            About
          </Link>
          {
            props.signedIn && props.userData.admin &&
            <Link style={iconLinkStyle} className="nav-link" to="/admin/" title="ADMIN">
              ADMIN
            </Link>
          }
          <div style={iconContainerStyle} className="d-none d-lg-block nav-link">
            {
              props.signedIn &&
              <Link style={iconLinkStyle} className="nav-link" to="#" title={`Balance: ${props.userData.balance}Ð`}>
                <DogeCoin style={iconStyle} />
              </Link>
            }
            <Link style={iconLinkStyle} className="nav-link" to="/highscores" title="High Scores">
              <Graph style={iconStyle} />
            </Link>
            {
              props.signedIn &&
              <React.Fragment>
                <Link style={{...iconLinkStyle, color: props.userData.notifications > 0 ? 'red' : undefined}} className="nav-link" to="#" title="Notifications">
                  <Bell style={iconStyle} />
                </Link>
                <Link style={iconLinkStyle} className="nav-link " to="/profile/" title="Profile">
                  <User style={iconStyle} />
                </Link>
              </React.Fragment>
            }
          </div>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Naivigation;
