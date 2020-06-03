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
      backgroundColor: "black",
      color: "white",
      padding: "4%",
      margin: "4%",
    },
    btn: {
      backgroundColor: "green",
      color: "#fff",
      margin: "5.5%",
      fontFamily: "Trebuchet",
      "&:hover": {
        background: "red",
      },
    },
    font: {
      fontFamily: "Trebuchet",
    },
  });

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          email: this.state.email,
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
                  <label htmlFor="email" className={classes.font}>
                    Email:
                    <input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChangeFor("email")}
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
                    Sign In
                  </Button>
                </div>
              </form>
            </Container>
          </Paper>
        </center>
        <center>
          <button
            type="button"
            className={classes.link_btn}
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Add Admin
          </button>
        </center>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(LoginPage));
