import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'

const Login = ({ login }) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const submitHandler = e => {
        e.preventDefault();

        console.log(user);
        login(user);
    }

    return (
        <div className="container">
            <div className="card">
                <h3 className="center">Login</h3>
                <div className="row">
                    <form onSubmit={submitHandler}>
                        <div className="input-field col s12">
                            <input type="email" onChange={onChange} placeholder="Email" name="email" id="email" />
                        </div>
                        <div className="input-field col s12">
                            <input type="password" onChange={onChange} placeholder="Password" name="password" id="password" />
                        </div>
                        <button style={{ margin: "10px" }} type="submit" className="btn blue lighten-2 wave">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { login })(Login)
