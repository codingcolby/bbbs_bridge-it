import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";
import Marker from "../../components/Map/Marker";

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
      display: "inline-block",
      padding: "15px",
    },
  });

class MapSearchPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_PROFILES",
    });
  }
  render() {
    const { classes } = this.props;

    const profiles = this.props.store.profiles;
    console.log("Profiles", profiles);

    const handleClick = () => {
      this.props.history.push("/search");
    };

    return (
      <div className={classes.root}>
        <h1>All Unmatched Bigs and Littles</h1>
        <br />
        <div>
          <Map>
            <Marker lat={39.0756894} lng={-94.5305843} />
          </Map>
        </div>
        <div className={classes.position}>
          <FormGroup row>
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
        </div>
        <div>
          <Button variant="outlined" onClick={handleClick}>
            Search By Name
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(MapSearchPage)
);
