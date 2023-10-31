import React, { Component } from "react";
import RegistrationPage from "./registrationPage";
import LoginAuth from "./portalLoginTask-5_2Auth";
import NavbarCookieAuth from "./NavEmpCookieTask-5_2Auth";
import HomePage from "./homePage";
import httpService from "../services/httpService";
import MyDetails from "./myDetails";
import { Redirect, Route, Switch } from "react-router-dom";
import authPassportService from "../services/authPassportService";
class MainCompWeb extends Component {
  state = {
    person: {},
  };
  fetchData = async () => {
    let response = await httpService.get("/myDetails");
    let { data } = response;
    console.log(data);
    this.setState({ person: data });
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) this.fetchData();
  }

  render() {
    const { person } = this.state;
    let auth = authPassportService.getToken();
    console.log(auth);
    return (
      <>
        <NavbarCookieAuth />
        <div className="container">
          <Switch>
            <Route
              path="/registration/:mode"
              render={(props) => (
                <RegistrationPage {...props} person={person} />
              )}
            />
            <Route
              path="/login"
              render={(props) => <LoginAuth {...props} person={person} />}
            />
            <Route
              path="/home"
              render={(props) =>
                auth ? <HomePage {...props} person={person} /> : <LoginAuth />
              }
            />
            <Route
              path="/myDetails"
              render={(props) =>
                auth ? <MyDetails {...props} person={person} /> : <LoginAuth />
              }
            />

            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </>
    );
  }
}
export default MainCompWeb;
