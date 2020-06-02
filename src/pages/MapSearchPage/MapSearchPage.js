import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    btn: {},
  });

class MapSearchPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Map Search Page</h2>
        <br />
        <div>
          <Map />
        </div>

        <Checkbox></Checkbox>

        <Button className={classes.btn} variant="outlined">
          Search By Name
        </Button>
      </div>
    );
  }
}
export default withStyles(customStyles)(
  connect(mapStoreToProps)(MapSearchPage)
);
