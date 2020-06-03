import React, { Component } from "react";
import { connect } from "react-redux";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { withStyles, createStyles } from "@material-ui/core";

// import { Link } from "react-router-dom";
// import LogOutButton from "../LogOutButton/LogOutButton";

const customStyles = (theme) =>
  createStyles({
    nav: {
      overflow: "hidden",
      backgroundColor: "black",
      padding: "20px",
    },
  });

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.nav}>
        <DropdownMenu className="nav-title" />
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(Nav));
