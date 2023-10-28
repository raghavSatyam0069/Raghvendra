import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authPassportService.js";
import http from "../services/httpService.js";
import authPassportService from "../services/authPassportService.js";
class NavbarCookieAuth extends Component {
  state = {
    data: "",
  };

  handleLogout = () => {
    authPassportService.removeToken();
    window.location = "/login";
  };

  render() {
    const { data } = this.state;
    const key = authPassportService.getToken();
    console.log(key);
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand h1" to="/">
            My Portal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {key && (
                <li className="nav-item">
                  <Link className="nav-link h1" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
              )}
              {key && (
                <li className="nav-item">
                  <Link className="nav-link h1" to="/myDetails">
                    My Details
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              {key ? (
                <li className="nav-item ">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleLogout()}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item ">
                  <Link
                    className="nav-link h1 bg-success rounded-2 text-white border"
                    to="/login"
                  >
                    login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavbarCookieAuth;
