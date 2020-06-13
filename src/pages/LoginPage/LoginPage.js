import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Email from "@material-ui/icons/Email";
import {
  Button,
  Container,
  Paper,
  withStyles,
  createStyles,
} from "@material-ui/core";

// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import GridContainer from "../../material-kit/components/Grid/GridContainer.js";
import GridItem from "../../material-kit/components/Grid/GridItem.js";
import Card from "../../material-kit/components/Card/Card.js";
import CardBody from "../../material-kit/components/Card/CardBody.js";
import CardHeader from "../../material-kit/components/Card/CardHeader.js";
import CardFooter from "../../material-kit/components/Card/CardFooter.js";
import CustomInput from "../../material-kit/components/CustomInput/CustomInput.js";
import image from "../../material-kit/assets/img/kc.jpg";

import styles from "../../material-kit/assets/jss/material-kit-react/views/loginPage.js";

const customStyles = (theme) =>
  createStyles({
    ...styles,
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
    console.log(this.state);

    return (
      <div>
        {/* {this.props.store.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h2>
        )}

        <center>
          <Paper>
            <Container>
              <form onSubmit={this.login}>
                <h1 className={classes.font}>Login</h1>
                <div>
                  <label htmlFor="email">
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
                  <Button type="submit" name="submit" value="Log In">
                    Sign In
                  </Button>
                </div>
              </form>
            </Container>
          </Paper>
        </center> */}
        {/* // <div> */}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          {this.props.store.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.store.errors.loginMessage}
            </h2>
          )}
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form} onSubmit={this.login}>
                    <CardHeader color="success" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>

                    <CardBody>
                      <CustomInput
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChangeFor("email")}
                        labelText="Email..."
                        id="email"
                        name="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor("password")}
                        labelText="Password"
                        id="pass"
                        name="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockIcon className={classes.inputIconsColor}>
                                lock_outline
                              </LockIcon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" name="submit" value="Log In">
                        Sign In
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(LoginPage));
