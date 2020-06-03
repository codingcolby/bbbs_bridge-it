import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  Button,
  TextField,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    btn: {},
    input: {},
  });

class SearchPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>Search Page</h2>
        <br />
        <div></div>
        <div>
          <form className={classes.input} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Search by Full Name" />
            <Button className={classes.btn} variant="outlined">
              Search
            </Button>
          </form>
        </div>
        <br />
        <div>
          <li>Big or Little Name</li>
        </div>
        <Button className={classes.btn} variant="outlined">
          Search By Map
        </Button>
      </div>
    );
  }
}
export default withStyles(customStyles)(connect(mapStoreToProps)(SearchPage));
