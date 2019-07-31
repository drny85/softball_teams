import React, { useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { register } from "../actions/authActions";

const Signup = ({ register }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // const formDataChange = e => {
  // }

  const submitHandler = e => {
    e.preventDefault();

    if (password !== password2) {
      M.toast({ html: "Passwords do not match", classes: "red" });
      return;
    }
    const userData = { name, lastName, email, password };
    register(userData);
  };
  return (
    <div className="container">
      <div className="card z-depth-3" style={{ marginTop: "2rem" }}>
        <div className="row">
          <form onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                type="text"
                name="name"
                onChange={e => setName(e.target.value)}
                placeholder="First Name"
                className="validate"
                id="name"
              />
              <label className="active" htmlFor="name">
                First Name
              </label>
            </div>
            <div className="input-field col s12">
              <input
                type="text"
                name="last_name"
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
                className="validate"
                id="last_name"
              />
              <label className="active" htmlFor="last_name">
                Last Name
              </label>
            </div>
            <div className="input-field col s12">
              <input
                name="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                id="email"
                className="validate"
                type="email"
              />
              <label className="active" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-field col s12">
              <input
                name="password"
                onChange={e => setPassword(e.target.value)}
                minLength="6"
                placeholder="Password"
                id="password"
                type="password"
              />
              <label className="active" htmlFor="password">
                Password
              </label>
            </div>
            <div className="input-field col s12">
              <input
                name="password"
                onChange={e => setPassword2(e.target.value)}
                minLength="6"
                placeholder="Confirm Password"
                id="password2"
                type="password"
              />
              <label className="active" htmlFor="password2">
                Confirm Password
              </label>
            </div>
            <button
              style={{ margin: "8px" }}
              type="submit"
              className="btn blue lighten-1"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { register }
)(Signup);
