import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

const Navbar = ({ userData: { isAuthenticated, loading, user }, history }) => {
  const handlerLogout = () => {
    logout();
    console.log(history);
  };
  console.log(history);
  return (
    <nav className="blue lighten-1">
      <li style={{ textTransform: "uppercase" }} className="nav-wrapper">
        <NavLink to="/" className="brand-logo">
          {user ? user.name : "Home"}
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {!isAuthenticated && !loading ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="!#" onClick={handlerLogout}>
                Log Out
              </NavLink>
            </li>
          )}
        </ul>
      </li>
    </nav>
  );
};

const mapStateToProps = state => ({
  userData: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
