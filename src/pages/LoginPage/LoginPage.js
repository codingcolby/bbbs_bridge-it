import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import {
  Button,
  Container,
  Paper,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    paper: {
      maxWidth: "45%",
      backgroundColor: "green",
      color: "white",
      padding: "4%",
      margin: "4%",
    },
  });

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.roots}>
        {this.props.store.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h2>
        )}

        <center>
          <Paper className={classes.paper}>
            <Container>
              <form onSubmit={this.login}>
                <h1 className={classes.font}>Login</h1>
                <div>
                  <label htmlFor="username" className={classes.font}>
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChangeFor("username")}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="password">
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChangeFor("password")}
                    />
                  </label>
                </div>
                <div>
                  <Button
                    className={classes.btn}
                    type="submit"
                    name="submit"
                    value="Log In"
                  >
                    Log In
                  </Button>
                </div>
              </form>
            </Container>
          </Paper>
        </center>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(LoginPage));
