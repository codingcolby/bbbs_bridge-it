import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Email from "@material-ui/icons/Email";
import {
  FormControl,
  Input,
  InputLabel,
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
import Button from "../../material-kit/components/CustomButtons/Button.js";
import image from "../../material-kit/assets/img/kc.jpg";

import styles from "../../material-kit/assets/jss/material-kit-react/views/loginPage.js";
import inputStyles from "../../material-kit/assets/jss/material-kit-react/components/customInputStyle.js";

const customStyles = (theme) =>
  createStyles({
    ...styles,
    ...inputStyles,
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
                      <FormControl
                        fullWidth={true}
                        style={{ marginBottom: "20px" }}
                      >
                        <InputLabel htmlFor="email">Email...</InputLabel>
                        <Input
                          type="text"
                          value={this.state.email}
                          onChange={this.handleInputChangeFor("email")}
                          id="email"
                          name="email"
                          fullWidth={true}
                          endAdornment={
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <br />
                      <FormControl
                        fullWidth={true}
                        style={{ marginBottom: "20px" }}
                      >
                        <InputLabel htmlFor="pass">Password</InputLabel>
                        <Input
                          type="password"
                          value={this.state.password}
                          onChange={this.handleInputChangeFor("password")}
                          labelText="Password"
                          id="pass"
                          name="password"
                          endAdornment={
                            <InputAdornment position="end">
                              <LockIcon className={classes.inputIconsColor}>
                                lock_outline
                              </LockIcon>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        round
                        color="success"
                        type="submit"
                        name="submit"
                        value="Log In"
                        style={{ marginBottom: "20px" }}
                      >
                        Sign In
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(LoginPage));
