import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";

import {
  Button,
  // Checkbox,
  FormControlLabel,
  // FormGroup,
  withStyles,
  createStyles,
  Radio,
  RadioGroup,
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
    value: "",
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

    const handleChange = (event) => {
      this.setState(
        {
          value: event.target.value,
        },
        () => {
          this.props.dispatch({
            type: "SET_CHECKED",
            payload: this.state.value,
          });
        }
      );
    };

    return (
      <div className={classes.root}>
        <h1>All Unmatched Bigs and Littles</h1>
        <br />
        <div>
          <Map />
        </div>
        <div className={classes.position}>
          <RadioGroup onChange={handleChange} row>
            <FormControlLabel
              control={<Radio name="checkedFemale" />}
              label="Female"
              value="female"
            />
            <FormControlLabel
              control={<Radio name="checkedMale" />}
              label="Male"
              value="male"
            />
            <FormControlLabel
              control={<Radio name="checkedCouple" />}
              label="Couple"
              value="couple"
            />
          </RadioGroup>
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
