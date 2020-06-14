import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import Map from "../../components/Map/MapList";
import { Element } from "react-scroll";
import * as geolib from "geolib";

import {
  Container,
  Typography,
  Grid,
  Slider,
  withStyles,
  createStyles,
  CardHeader,
} from "@material-ui/core";

// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import Button from "../../material-kit/components/CustomButtons/Button.js";
import Card from "../../material-kit/components/Card/Card.js";
import CardBody from "../../material-kit/components/Card/CardBody.js";
import image from "../../material-kit/assets/img/kc.jpg";

import styles from "../../material-kit/assets/jss/material-kit-react/views/components.js";

// const marks = [
//   {
//     value: 5,
//     label: "5",
//   },
//   {
//     value: 10,
//     label: "10",
//   },
//   {
//     value: 15,
//     label: "15",
//   },
//   {
//     value: 20,
//     label: "20",
//   },
// ];

const customStyles = (theme) =>
  createStyles({
    cardHeader: {
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      borderRadius: "5px",
    },
    cardHeaderLittle: {
      backgroundColor: "#4caf50",
      color: "white",
      textAlign: "center",
    },
    margin: {
      marginTop: "0",
    },
    ...styles,
  });

class MapListPage extends Component {
  state = {
    sliderValue: "",
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_PROFILES",
    });
  }
  // valuetext = (value) => {
  //   return `${value}`;
  // };

  // valueLabelFormat = (value) => {
  //   return marks.findIndex((mark) => mark.value === value) + 1;
  // };

  handleSlider = (event) => {
    this.setState({
      sliderValue: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    const handleClick = () => {
      this.props.history.push(`/table`);
    };

    //gets id of selected profile
    const id = Number(this.props.match.params.id);

    //assigns profile reducer data to profiles
    const profiles = this.props.store.profiles;

    //returns single selected profile
    const profileFilter = profiles.filter((item, index) => {
      return item.id === id;
    });

    //returns selected profile sex
    const profileSex = profileFilter.map((item, index) => {
      return item.sex;
    });

    //returns selected profile coordinates
    const profileCoordinates = profileFilter.map((item, index) => {
      return { latitude: item.latitude, longitude: item.longitude };
    });

    const coordinates = profileCoordinates[0] || { latitude: 0, longitude: 0 };

    //returns little profiles that match selected profile sex
    const profilesLittlesFilter = profiles.filter((item, index) => {
      return item.profile_type === 2 && item.sex === Number(profileSex);
    });

    //renders selected profile information
    const bigProfile = profileFilter.map((item, index) => {
      return (
        <Card key={index} className={classes.margin}>
          <CardHeader
            title={<h1>{item.first_name + " " + item.last_name}</h1>}
            className={classes.cardHeader}
          />

          <CardBody>
            <h3>Age: {item.dob_or_age}</h3>
            <h3>Ethnicity: {item.race}</h3>
            <h3>Address: {item.address}</h3>
          </CardBody>
        </Card>
      );
    });

    profilesLittlesFilter.forEach((element, index) => {
      element.distance = geolib
        .convertDistance(
          geolib.getPreciseDistance(
            {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            },
            { latitude: element.latitude, longitude: element.longitude }
          ),
          "mi"
        )
        .toFixed(2);
    });

    //renders list of filtered littles as cards
    const littlesList = profilesLittlesFilter.map((item, index) => {
      return (
        <Card key={index} style={{ marginTop: "0", marginBottom: "5px" }}>
          <CardHeader
            title={<h3>{item.first_name + " " + item.last_name}</h3>}
            className={classes.cardHeaderLittle}
          />

          <CardBody>
            <h4>Age: {item.dob_or_age}</h4>
            <h4>Ethnicity: {item.race}</h4>
            <h4>Distance: {item.distance} miles</h4>
            <p>{item.summary}</p>
          </CardBody>
        </Card>
      );
    });

    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={8}>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "5px solid white",
                    borderRadius: "5px",
                  }}
                >
                  <Map
                    selectedProfile={profileFilter}
                    radius={this.state.sliderValue}
                    selectedLittles={profilesLittlesFilter}
                  />
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "15px",
                    }}
                  >
                    <Typography gutterBottom> Radius Slider</Typography>
                    <Slider
                      defaultValue={5}
                      aria-labelledby="discrete-slider-restrict"
                      step={2.5}
                      valueLabelDisplay="on"
                      marks={true}
                      min={0}
                      max={20}
                      onChange={this.handleSlider}
                    />
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    round
                    style={{
                      backgroundColor: "black",
                      border: "3px solid white",
                    }}
                    size="lg"
                    onClick={handleClick}
                  >
                    Match Table
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <div>{bigProfile}</div>
                <Element
                  name="littles-list"
                  className="element"
                  style={{
                    position: "relative",
                    height: "50vh",
                    overflow: "scroll",
                    border: "solid 5px white",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <div>{littlesList}</div>
                </Element>
              </Grid>
            </Grid>
          </Container>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(MapListPage));
