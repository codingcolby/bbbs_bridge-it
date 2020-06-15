import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import swal from "@sweetalert/with-react";
import UserPage from "../UserPage/UserPage";

import {
  FormControl,
  Input,
  InputLabel,
  withStyles,
  createStyles,
} from "@material-ui/core";

// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Email from "@material-ui/icons/Email";
// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import GridContainer from "../../material-kit/components/Grid/GridContainer.js";
import GridItem from "../../material-kit/components/Grid/GridItem.js";
import Card from "../../material-kit/components/Card/Card.js";
import CardBody from "../../material-kit/components/Card/CardBody.js";
import CardHeader from "../../material-kit/components/Card/CardHeader.js";
import CardFooter from "../../material-kit/components/Card/CardFooter.js";
import image from "../../material-kit/assets/img/kc.jpg";
import Button from "../../material-kit/components/CustomButtons/Button.js";

import styles from "../../material-kit/assets/jss/material-kit-react/views/loginPage.js";
import inputStyles from "../../material-kit/assets/jss/material-kit-react/components/customInputStyle.js";

const customStyles = (theme) =>
  createStyles({
    // paper: {
    //   maxWidth: "45%",
    //   backgroundColor: "black",
    //   color: "white",
    //   padding: "4%",
    //   margin: "4%",
    // },
    // font: {
    //   fontFamily: "Trebuchet",
    // },
    // card: {
    //   width: "60vw",
    //   height: "60vh",
    // },
    // containerz: {
    //   zIndex: "2",
    //   position: "relative",
    //   paddingTop: "10vh",
    //   color: "#FFFFFF",
    //   paddingBottom: "200px",
    //   textAlign: "center",
    // },
    ...styles,
    ...inputStyles,
  });

class AdminPage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  componentDidUpdate() {
    if (this.props.store.resetReducer) {
      this.props.dispatch({ type: "CLEAR_RESET" });
    }
  }
  onClick = () => {
    swal({
      text: "Are you sure?",
      buttons: {
        reset: {
          text: "Yes",
          value: "reset",
        },
        cancel: "No",
      },
    }).then((value) => {
      switch (value) {
        case "reset":
          swal("Ready to Reset?", "Reset User!", "success");
          this.props.dispatch({
            type: "RESET_PASSWORD",
            payload: {
              newEmail: this.state.email,
              newPassword: this.state.password,
              userid: this.props.store.user.id,
            },
          });
          break;
        default:
          swal("Reset cancelled", "No changes made", "info");
      }
    });
  };
  // Need to RESET USER with USERNAME AND PASSWORD RESET!!
  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form onSubmit={this.onClick} className={classes.form}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h1>Admin</h1>
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

                    <label htmlFor="user_logged_in" className={classes.font}>
                      <UserPage />
                    </label>
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    <Button
                      round
                      size="lg"
                      type="submit"
                      name="submit"
                      value="Reset User"
                      style={{ backgroundColor: "black" }}
                    >
                      Reset User
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(AdminPage));
