import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    position: {
      position: "relative",
      left: "150px",
    },
  });

class MapSearchPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>All Unmatched Bigs and Littles</h1>
        <br />
        <div className={classes.position}>
          <Map />
        </div>
        <FormGroup column className={classes.position}>
          <FormControlLabel
            control={<Checkbox name="checkedFemale" />}
            label="Female"
          />
          <FormControlLabel
            control={<Checkbox name="checkedMale" />}
            label="Male"
          />
          <FormControlLabel
            control={<Checkbox name="checkedCouple" />}
            label="Couple"
          />
        </FormGroup>
        <Button variant="outlined">Search By Name</Button>

      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(MapSearchPage)
);

