import React from "react";

const Signup = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="row">
          <form>
            <div className="input-field col s12">
              <input
                type="text"
                placeholder="First Name"
                className="validate"
                id="first_name"
              />
              <label className="active" htmlFor="first_name">
                First Name
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
