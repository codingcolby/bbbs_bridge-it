import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import LogOutButton from "../../components/LogOutButton/LogOutButton";

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

class AdminPage extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    this.props.dispatch({ type: "" });
  }

  selectResetUser = (item) => (event) => {
    this.setState({});
  };

  // Need to RESET USER with USERNAME AND PASSWORD RESET!!
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.roots}>
        <center>
          <Paper className={classes.paper}>
            <Container>
              <h1 className={classes.font}>Admin</h1>
              <div>
                <label htmlFor="username" className={classes.font}>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    // onChange={("username")}
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
                    // onChange={"password")}
                  />
                </label>
              </div>
              <div>
                <Button
                  className={classes.btn}
                  type="submit"
                  name="submit"
                  value="Reset User"
                >
                  Reset User
                </Button>
              </div>
              <div>
                <LogOutButton className="log-out" />
              </div>
            </Container>
          </Paper>
        </center>
      </div>
    );
  }
}
export default withStyles(customStyles)(connect(mapStoreToProps)(AdminPage));
