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
  CardActions,
} from "@material-ui/core";

// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import Button from "../../material-kit/components/CustomButtons/Button.js";
import Card from "../../material-kit/components/Card/Card.js";
import CardBody from "../../material-kit/components/Card/CardBody.js";
import image from "../../material-kit/assets/img/kc.jpg";
import styles from "../../material-kit/assets/jss/material-kit-react/views/components.js";
import swal from "@sweetalert/with-react";

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
    element: {
      position: "relative",
      height: "30vh",
      overflow: "scroll",
    },
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

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 5,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

// function Comments(props) {
//   return (
//     <TextField
//       value={props.comments}
//       onChange={props.onChange}
//       label="Comments"
//     />
//   );
// }

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

  handleSlider = (event, newValue) => {
    this.setState(
      {
        sliderValue: newValue,
      },
      () => {
        console.log("STATE:", this.state.sliderValue);
      }
    );
  };

  handleAssess = (big_id, little_id) => (event) => {
    swal({
      title: "Assess This Match:",
      // text: `{ currentComment }`,
      // content: {<Comments />},
      buttons: {
        likely: {
          text: "Likely",
          value: 3, // likely
        },
        maybe: {
          text: "Maybe",
          value: 2, // maybe
        },
        unlikely: {
          text: "Unlikely",
          value: 1, // unlikely
        },
        cancel: "Cancel",
      },
    }).then((value) => {
      if (value === null) return swal("Canceled!");
      const payload = {
        comment: null,
        review: value,
        big_id: big_id,
        little_id: little_id,
      };
      this.props.dispatch({
        type: "CREATE_MATCH",
        payload,
      });
      swal("Assessed!");
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
      // unpack preference object
      console.log(Object.entries(item.preference));
      const preferences =
        item.profile_type !== 2
          ? [
              <p key={1}>
                <strong>Age: </strong>
                {item.preference.age}
              </p>,
              <p key={2}>
                <strong>Ethnicity: </strong>
                {item.preference.race}
              </p>,
              <p key={3}>
                <strong>Religion: </strong>
                {item.preference.religion}
              </p>,
              <p key={4}>
                <strong>P doesn't speak english: </strong>
                {item.preference.speak_english}
              </p>,
              <p key={5}>
                <strong>Level of problems: </strong>
                {item.preference.lvl_of_problems}
              </p>,
              <p key={6}>
                <strong>Max distance (miles): </strong>
                {item.preference.max_distance_miles}
              </p>,
            ]
          : [
              <p key={1}>
                <strong>Age: </strong>
                {item.preference.age}
              </p>,
              <p key={2}>
                <strong>Ethnicity: </strong>
                {item.preference.race}
              </p>,
              <p key={3}>
                <strong>Religion: </strong>
                {item.preference.religion}
              </p>,
              <p key={4}>
                <strong>Sexual Orientation: </strong>
                {item.preference.sexuality}
              </p>,
              <p key={5}>
                <strong>Smoking/Drinking: </strong>
                {item.preference.smoking_drinking}
              </p>,
              <p key={6}>
                <strong>Have children of their own at home: </strong>
                {item.preference.children}
              </p>,
              <p key={7}>
                <strong>Pets: </strong>
                {item.preference.pets}
              </p>,
              <p key={8}>
                <strong>Firearms/Weapons in home: </strong>
                {item.preference.weapons}
              </p>,
              <p key={9}>
                <strong>Big Couple: </strong>
                {item.preference.big_couple}
              </p>,
              <p key={10}>
                <strong>Big Sister: </strong>
                {item.preference.big_sister}
              </p>,
            ];
      return (
        <Card key={index} className={classes.margin}>
          <CardHeader
            title={<h1>{item.first_name + " " + item.last_name}</h1>}
            className={classes.cardHeader}
          />
          <Element name="littles-list" className={classes.element}>
            <CardBody>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <h3>Address: {item.address}</h3>
                </Grid>

                <Grid item xs={3}>
                  <h3>Age: {item.dob_or_age}</h3>
                </Grid>
                <Grid item xs={3}>
                  <h3>Sex: {item.sex === 2 ? "Male" : "Female"}</h3>
                </Grid>
                <Grid item xs={6}>
                  <h3>Ethnicity: {item.race}</h3>
                </Grid>
                <Grid item xs={12}>
                  <h3>Preferences: </h3>
                  {preferences}
                </Grid>
                <Grid item xs={12}>
                  <p>{item.summary}</p>
                </Grid>
              </Grid>
            </CardBody>
          </Element>
        </Card>
      );
    });

    // adds distance from selected individual to littles
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
    const littlesList = profilesLittlesFilter
      .sort((a, b) => {
        return a.distance - b.distance;
      })
      .map((item, index) => {
        const preferences =
          item.profile_type !== 2
            ? [
                <p key={1}>
                  <strong>Age: </strong>
                  {item.preference.age}
                </p>,
                <p key={2}>
                  <strong>Ethnicity: </strong>
                  {item.preference.race}
                </p>,
                <p key={3}>
                  <strong>Religion: </strong>
                  {item.preference.religion}
                </p>,
                <p key={4}>
                  <strong>P doesn't speak english: </strong>
                  {item.preference.speak_english}
                </p>,
                <p key={5}>
                  <strong>Level of problems: </strong>
                  {item.preference.lvl_of_problems}
                </p>,
                <p key={6}>
                  <strong>Max distance (miles): </strong>
                  {item.preference.max_distance_miles}
                </p>,
              ]
            : [
                <p key={1}>
                  <strong>Age: </strong>
                  {item.preference.age}
                </p>,
                <p key={2}>
                  <strong>Ethnicity: </strong>
                  {item.preference.race}
                </p>,
                <p key={3}>
                  <strong>Religion: </strong>
                  {item.preference.religion}
                </p>,
                <p key={4}>
                  <strong>Sexual Orientation: </strong>
                  {item.preference.sexuality}
                </p>,
                <p key={5}>
                  <strong>Smoking/Drinking: </strong>
                  {item.preference.smoking_drinking}
                </p>,
                <p key={6}>
                  <strong>Have children of their own at home: </strong>
                  {item.preference.children}
                </p>,
                <p key={7}>
                  <strong>Pets: </strong>
                  {item.preference.pets}
                </p>,
                <p key={8}>
                  <strong>Firearms/Weapons in home: </strong>
                  {item.preference.weapons}
                </p>,
                <p key={9}>
                  <strong>Big Couple: </strong>
                  {item.preference.big_couple}
                </p>,
                <p key={10}>
                  <strong>Big Sister: </strong>
                  {item.preference.big_sister}
                </p>,
              ];

        return (
          <Card key={index} style={{ marginTop: "0", marginBottom: "5px" }}>
            <CardHeader
              title={<h2>{item.first_name + " " + item.last_name}</h2>}
              className={classes.cardHeaderLittle}
            />

            <CardBody>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <h3>Distance: {item.distance} miles</h3>
                </Grid>
                <Grid item xs={12}>
                  <h3>Location: {item.address}</h3>
                </Grid>

                <Grid item xs={3}>
                  <h3>Age: {item.dob_or_age}</h3>
                </Grid>
                <Grid item xs={3}>
                  <h3>Sex: {item.sex === 2 ? "Male" : "Female"}</h3>
                </Grid>
                <Grid item xs={6}>
                  <h3>Ethnicity: {item.race}</h3>
                </Grid>
                <Grid item xs={12}>
                  <h3>Preferences:</h3>
                  {preferences}
                </Grid>
                <Grid item xs={12}>
                  <p>{item.summary}</p>
                </Grid>
              </Grid>
            </CardBody>
            <CardActions>
              {/* TODO: update assess handler to work with littles */}
              <Button
                onClick={this.handleAssess(this.props.match.params.id, item.id)}
              >
                Assess Match
              </Button>
            </CardActions>
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
                    backgroundColor: "black",
                    border: "5px solid black",
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
                      margin: "40px 10px 10px",
                      // border: "5px solid black",
                      // borderRadius: "10px",
                    }}
                  >
                    <PrettoSlider
                      defaultValue={5}
                      aria-labelledby="discrete-slider-restrict"
                      step={2.5}
                      valueLabelDisplay="on"
                      marks={true}
                      min={0}
                      max={20}
                      onChange={this.handleSlider}
                    />
                    <Typography gutterBottom style={{ color: "white" }}>
                      Radius Slider
                    </Typography>
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
