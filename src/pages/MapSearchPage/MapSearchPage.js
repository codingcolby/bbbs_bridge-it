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
  state = {
    checked: "",
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_PROFILES",
    });
  }

  render() {
    const { classes } = this.props;

    const handleClick = () => {
      this.props.history.push("/search");
    };

    const handleChange = (sex) => (event) => {
      if (sex === "female") {
        this.setState(
          {
            checked: "female",
          },
          () => {
            this.props.dispatch({
              type: "SET_CHECKED",
              payload: this.state.checked,
            });
          }
        );
      }

      if (sex === "male") {
        this.setState(
          {
            checked: "male",
          },
          () => {
            this.props.dispatch({
              type: "SET_CHECKED",
              payload: this.state.checked,
            });
          }
        );
      }

      if (sex === "couple") {
        this.setState(
          {
            checked: "couple",
          },
          () => {
            this.props.dispatch({
              type: "SET_CHECKED",
              payload: this.state.checked,
            });
          }
        );
      }
    };

    return (
      <div className={classes.root}>
        <h1>All Unmatched Bigs and Littles</h1>
        <br />
        <div>
          <Map />
        </div>
        <div className={classes.position}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="checkedFemale" />}
              label="Female"
              onChange={handleChange("female")}
            />
            <FormControlLabel
              control={<Checkbox name="checkedMale" />}
              label="Male"
              onChange={handleChange("male")}
            />
            <FormControlLabel
              control={<Checkbox name="checkedCouple" />}
              label="Couple"
              onChange={handleChange("couple")}
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
