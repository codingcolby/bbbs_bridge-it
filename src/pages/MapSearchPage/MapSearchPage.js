import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";

import {
  FormControlLabel,
  withStyles,
  createStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";

// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import Button from "../../material-kit/components/CustomButtons/Button.js";
import styles from "../../material-kit/assets/jss/material-kit-react/views/components.js";
import image from "../../material-kit/assets/img/kc.jpg";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    position: {
      display: "inline-block",
      padding: "15px",
    },
    ...styles,
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
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <Map />

          <div
            className={classes.position}
            style={{
              backgroundColor: "black",
              border: "2px solid white",
              borderRadius: "20px",
              margin: "10px",
            }}
          >
            <RadioGroup onChange={handleChange} row>
              <FormControlLabel
                control={
                  <Radio name="checkedFemale" style={{ color: "white" }} />
                }
                label="FEMALE"
                value="female"
                style={{ color: "white", marginLeft: "30px" }}
              />
              <FormControlLabel
                control={
                  <Radio name="checkedMale" style={{ color: "white" }} />
                }
                label="MALE"
                value="male"
                style={{ color: "white", marginLeft: "30px" }}
              />
              <FormControlLabel
                control={
                  <Radio name="checkedCouple" style={{ color: "white" }} />
                }
                label="COUPLE"
                value="couple"
                style={{ color: "white", marginLeft: "30px" }}
              />
            </RadioGroup>
          </div>

          <div>
            <Button
              round
              style={{ backgroundColor: "black", border: "1px solid white" }}
              size="lg"
              onClick={handleClick}
            >
              Search By Name
            </Button>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(MapSearchPage)
);
