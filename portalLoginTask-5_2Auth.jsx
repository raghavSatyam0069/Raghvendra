import React, { Component } from "react";
import http from "../services/httpService.js";
import auth from "../services/authPassportService.js";
import { Link } from "react-router-dom";
class LoginAuth extends Component {
  state = {
    form: { username: "", password: "" },
    edit: false,
    errors: {},
    errMsg: "",
  };
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.form[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { form } = this.state;
    if (this.validate(form)) this.login("/login", this.state.form);
  };
  async login(url, obj) {
    try {
      let headerKey = "x-auth-token";
      let response = await http.post(url, obj);
      let { data, headers } = response;
      let token = headers[headerKey];
      alert("Login Successful!");
      console.log("Login token", token);
      console.log("Login Data", data);
      auth.storeToken(token);
      window.location = "/home";
    } catch (ex) {
      let s1 = { ...this.state };
      console.log(ex.response);
      let errMsg = `${ex.response.status} ${ex.response.statusText}`;
      s1.errors.server = errMsg;
      this.setState(s1);
    }
  }
  validate = (user) => {
    let s1 = { ...this.state };
    !user.username
      ? (s1.errors.username = "username must be entered")
      : (s1.errors.username = "");
    !user.password
      ? (s1.errors.password = "password must be entered")
      : (s1.errors.password = "");
    this.setState(s1);
    return !s1.errors.username && !s1.errors.password ? true : false;
  };
  render() {
    let { username, password } = this.state.form;
    let { edit, errors, errMsg } = this.state;
    // console.log(errors);
    return (
      <div
        className="container border p-4 my-4 rounded-5"
        style={{ width: "800px" }}
      >
        <h2 className="text-center">Login</h2>
        <div className="row my-4">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="col-12 my-2">
              <div className="form-group">
                <h5>Username</h5>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.handleChange}
                ></input>
                {errors.username ? (
                  <span className="text-danger">{errors.username}</span>
                ) : errors.server ? (
                  <span className="text-danger">{errors.server}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            We will never share your Details with anyone else.
            <div className="col-12 my-2">
              <div className="form-group">
                <h5>Password</h5>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                ></input>
                {errors.password ? (
                  <span className="text-danger">{errors.password}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group text-center">
          <button
            className="btn btn-primary m-2 text-center"
            onClick={this.handleSubmit}
          >
            {"Login"}
          </button>
        </div>
        <div className="register text-center">
          New User ?{" "}
          <span className="text-info" style={{ cursor: "pointer" }}>
            <Link to="/registration/New">Sign Up</Link>
          </span>
        </div>
      </div>
    );
  }
}
export default LoginAuth;
