// src/components/App/index.js

import { History } from "history";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { login, logout, renewSession } from "../../store/actions/auth";
import LoginButton from "../LoginButton/LoginButton";

interface IAppProps {
  history: History;
  authActions: {
    login: any;
    logout: any;
    renewSession: any;
  };
  isAuthenticated: boolean;
}

class App extends Component<IAppProps> {
  public handleGoTo = (route: string) => () =>
    this.props.history.replace(`/${route}`);

  public componentDidMount() {
    const { authActions } = this.props;

    if (localStorage.getItem("isLoggedIn") === "true") {
      authActions.renewSession();
    }
  }

  public render() {
    const { isAuthenticated, authActions } = this.props;
    return (
      <Fragment>
        isAuthenticated = {JSON.stringify(isAuthenticated)}
        <button onClick={this.handleGoTo("home")}>Home</button>
        <LoginButton
          login={authActions.login}
          logout={authActions.logout}
          isAuthenticated={isAuthenticated}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: new Date().getTime() < state.auth.expiresAt
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  authActions: {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    renewSession: () => dispatch(renewSession())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
