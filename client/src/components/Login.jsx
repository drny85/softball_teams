import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import {} from "react-router";

const Login = ({ userData: { isAuthenticated }, login, history }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = e => {
    e.preventDefault();

    login(user);

    if (isAuthenticated) {
      history.push("/");
    }
  };

  return (
    <div className="container">
      <div className="card z-depth-2">
        <h3 className="center">Login</h3>
        <div className="row">
          <form onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                type="email"
                onChange={onChange}
                placeholder="Email"
                name="email"
                id="email"
              />
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                onChange={onChange}
                placeholder="Password"
                name="password"
                id="password"
              />
            </div>
            <button
              style={{ margin: "10px" }}
              type="submit"
              className="btn blue lighten-2 wave"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
